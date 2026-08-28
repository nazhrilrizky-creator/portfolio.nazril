from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)  # Memungkinkan request cross-origin dari browser

DATA_FILE = 'pendaftaran.json'

def save_data(data):
    registrations = []
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r') as file:
            try:
                registrations = json.load(file)
            except json.JSONDecodeError:
                registrations = []
                
    registrations.append(data)
    
    with open(DATA_FILE, 'w') as file:
        json.dump(registrations, file, indent=4)

@app.route('/api/daftar', methods=['POST'])
def register_ekskul():
    data = request.get_json()
    
    nama = data.get('nama')
    kelas = data.get('kelas')
    ekskul = data.get('ekskul')
    alasan = data.get('alasan')
    
    if not all([nama, kelas, ekskul, alasan]):
        return jsonify({'error': 'Semua field harus diisi'}), 400
        
    save_data(data)
    
    return jsonify({
        'status': 'success',
        'message': f'Pendaftaran {nama} untuk ekskul {ekskul} berhasil disimpan!'
    }), 201

if __name__ == '__main__':
    print("Server berjalan di http://127.0.0.1:5000")
    app.run(debug=True, port=5000)