from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from os import environ
from datetime import datetime
from werkzeug.security import generate_password_hash


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)

class Locataire(db.Model):
    __tablename__ = 'locataire'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    phoneNumber = db.Column(db.String(15), nullable=False)
    password = db.Column(db.String(200), nullable=False)  # Stocke un mot de passe haché
    birthday = db.Column(db.Date)
    sexe = db.Column(db.String(10))  # Exemple : 'Homme', 'Femme', 'Autre'
    address = db.Column(db.String(255))
    email = db.Column(db.String(120), unique=True, nullable=False)
    socialLinks = db.Column(db.String(255))  # Peut contenir des URLs de profils sociaux
    identityDocument = db.Column(db.BLOB)  # Fichiers d'identité (images ou PDF)
    photo = db.Column(db.BLOB)  # Photo du locataire

    def json(self):
        """Convertit les données en format JSON."""
        return {
            'id': self.id,
            'name': self.name,
            'phoneNumber': self.phoneNumber,
            'birthday': self.birthday.strftime("%Y-%m-%d") if self.birthday else None,
            'sexe': self.sexe,
            'address': self.address,
            'email': self.email,
            'socialLinks': self.socialLinks
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

@app.route('/locataires', methods=['POST'])
def create_locataire():
    try:
       

        # Vérification des champs obligatoires
        required_fields = ['name', 'phoneNumber', 'password', 'email']
        for field in required_fields:
            if not request.form.get(field):
                print(f"Champs manquants: {field}")
                return make_response(jsonify({'message': f'Missing field: {field}'}), 400)

        # Récupération des données et fichiers
        data = request.form
        file_identity = request.files.get('identityDocument')
        file_photo = request.files.get('photo')
        
        identity_document_data = file_identity.read() if file_identity else None
        photo_data = file_photo.read() if file_photo else None

        # Hachage du mot de passe
        hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')

        # Conversion de la date d'anniversaire
        birthday = datetime.strptime(data.get('birthday'), "%Y-%m-%d").date() if data.get('birthday') else None

        # Création de l'objet Locataire
        new_locataire = Locataire(
            name=data['name'],
            phoneNumber=data['phoneNumber'],
            password=hashed_password,
            birthday=birthday,
            sexe=data.get('sexe'),
            address=data.get('address'),
            email=data['email'],
            socialLinks=data.get('socialLinks'),
            identityDocument=identity_document_data,
            photo=photo_data
        )

        # Ajout à la base de données
        db.session.add(new_locataire)
        db.session.commit()
        print("Locataire creer avec sucess")
        # Succès
        return make_response(jsonify({'message': 'Locataire created successfully'}), 201)

    except Exception as e:
        log_error("Erreur lors de la création du locataire", str(e))
        return make_response(jsonify({'message': 'Error creating locataire', 'error': str(e)}), 500)
        print("erreur lors de la creation")

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
            locataire.phoneNumber = data['phoneNumber']
            locataire.birthday = data.get('birthday')
            locataire.address = data.get('address')
            locataire.socialLinks = data.get('socialLinks')
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