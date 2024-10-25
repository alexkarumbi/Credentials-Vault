from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import sqlite3
from encryption import DecryptPassword

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
    row = cur.fetchone()
    connection.close()
    
    if row:
        username, encrypted_password = row
        decrypted_password = DecryptPassword(encrypted_password)
        return jsonify({
            'username': username,
            'password': decrypted_password
        })
    else:
        return jsonify({'error': 'Account not found'}), 404

if __name__ == '__main__':
    app.run(port=5000)