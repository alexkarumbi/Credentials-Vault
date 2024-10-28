from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
from encryption import EncryptPassword, DecryptPassword

app = Flask(__name__)
CORS(app)  # Enable CORS

@app.route('/')
def index():
    return "Welcome to the Credentials Vault API"

@app.route('/get_credentials', methods=['POST'])
def get_credentials():
    data = request.json
    service = data.get('service')
    if not service:
        return jsonify({'error': 'Service is required'}), 400
    
    # Fetch the account details from the database
    connection = sqlite3.connect('database.db')
    cur = connection.cursor()
    cur.execute("SELECT username, password FROM ACCOUNT WHERE service=?", (service,))
    rows = cur.fetchall()
    connection.close()
    
    if rows:
        credentials = []
        for row in rows:
            username, encrypted_password = row
            decrypted_password = DecryptPassword(encrypted_password)
            credentials.append({
                'username': username,
                'password': decrypted_password
            })
        return jsonify({'credentials': credentials})
    else:
        return jsonify({'error': 'No accounts found for the service'}), 404

@app.route('/save_credentials', methods=['POST'])
def save_credentials():
    data = request.json
    service = data.get('service')
    username = data.get('username')
    password = data.get('password')
    if not service or not username or not password:
        return jsonify({'error': 'Service, username, and password are required'}), 400
    
    encrypted_password = EncryptPassword(password)
    
    # Save the account details to the database
    connection = sqlite3.connect('database.db')
    cur = connection.cursor()
    cur.execute("INSERT INTO ACCOUNT (service, username, password) VALUES (?, ?, ?)",
                (service, username, encrypted_password))
    connection.commit()
    connection.close()
    
    return jsonify({'success': True})

if __name__ == '__main__':
    app.run(port=5000)