from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from os import environ
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)

class Locataire(db.Model):
    __tablename__ = 'locataire'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone_number = db.Column(db.String(15), nullable=False)
    password = db.Column(db.String(200), nullable=False)  # Assurez-vous de hacher le mot de passe
    birthday = db.Column(db.Date)
    address = db.Column(db.String(255))
    social_links = db.Column(db.String(255))
    images=db.Column(db.BLOB)

    def json(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone_number': self.phone_number,
            'birthday': self.birthday.strftime("%Y-%m-%d") if self.birthday else None,
            'address': self.address,
            'social_links': self.social_links
            
        }

# Créer un contexte d'application
with app.app_context():
    db.create_all()

def log_success(message):
    print(f"✅ Succès : {message}")

def log_error(message, error):
    print(f"❌ Erreur : {message} - Détails : {error}")
# Create a test route
@app.route('/test', methods=['GET'])
def test():
    return make_response(jsonify({'message': 'test route'}), 200)

# Create a locataire
@app.route('/locataires', methods=['POST'])
def create_locataire():
    try:
        data = request.get_json()
        
        # Conversion de la date en objet date
        birthday = datetime.strptime(data['birthday'], "%Y-%m-%d").date() if data.get('birthday') else None
        
        new_locataire = Locataire(
            name=data['name'],
            email=data['email'],
            phone_number=data['phone_number'],
            password=data['password'],  # N'oubliez pas de hacher le mot de passe
            birthday=birthday,
            address=data.get('address'),
            social_links=data.get('social_links')
            
        )
        
        db.session.add(new_locataire)
        db.session.commit()
        log_success(f"Locataire '{new_locataire.name}' créé avec succès.")
        return make_response(jsonify({'message': 'locataire created'}), 201)
    except Exception as e:
        log_error("Erreur lors de la création du locataire", str(e))
        return make_response(jsonify({'message': 'error creating locataire', 'error': str(e)}), 500)
       
# Get all locataires
@app.route('/locataires', methods=['GET'])
def get_locataires():
    try:
        locataires = Locataire.query.all()
        return make_response(jsonify([locataire.json() for locataire in locataires]), 200)
    except Exception as e:
        return make_response(jsonify({'message': 'error getting locataires', 'error': str(e)}), 500)

# Get a locataire by ID
@app.route('/locataires/<int:id>', methods=['GET'])
def get_locataire(id):
    try:
        locataire = Locataire.query.filter_by(id=id).first()
        if locataire:
            return make_response(jsonify({'locataire': locataire.json()}), 200)
        return make_response(jsonify({'message': 'locataire not found'}), 404)
    except Exception as e:
        return make_response(jsonify({'message': 'error getting locataire', 'error': str(e)}), 500)

# Update a locataire
@app.route('/locataires/<int:id>', methods=['PUT'])
def update_locataire(id):
    try:
        locataire = Locataire.query.filter_by(id=id).first()
        if locataire:
            data = request.get_json()
            locataire.name = data['name']
            locataire.email = data['email']
            locataire.phone_number = data['phone_number']
            locataire.birthday = data.get('birthday')
            locataire.address = data.get('address')
            locataire.social_links = data.get('social_links')
            #locataire.images = data.get('images')
            db.session.commit()
            return make_response(jsonify({'message': 'locataire updated'}), 200)
        return make_response(jsonify({'message': 'locataire not found'}), 404)
    except Exception as e:
        print(error)
        return make_response(jsonify({'message': 'error updating locataire', 'error': str(e)}), 500)

# Delete a locataire
@app.route('/locataires/<int:id>', methods=['DELETE'])
def delete_locataire(id):
    try:
        locataire = Locataire.query.filter_by(id=id).first()
        if locataire:
            db.session.delete(locataire)
            db.session.commit()
            return make_response(jsonify({'message': 'locataire deleted'}), 200)
        return make_response(jsonify({'message': 'locataire not found'}), 404)
    except Exception as e:
        return make_response(jsonify({'message': 'error deleting locataire', 'error': str(e)}), 500)

if __name__ == '__main__':
    app.run(debug=True)