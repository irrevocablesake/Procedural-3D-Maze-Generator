from flask import Flask, send_file, request, jsonify
import subprocess
from flask_cors import CORS, cross_origin
import json

# /generate?width=5000&height=5000&cellSize=10
executable = "main.exe"

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/generate")
@cross_origin()
def generate_maze():   
    result = subprocess.run([executable])
    
    try:
        # Specify the path to the JSON file
        file_path = 'text_maze_data.json'
        
        # Print the content of the JSON file for debugging purposes
        with open(file_path, 'r') as json_file:
            json_content = json_file.read()
                    
        # Load the JSON content
        data = json.loads(json_content)
        
        # Use jsonify to convert the content to a JSON response
        return jsonify(data)
    
    except FileNotFoundError:
        return jsonify(error="File not found"), 404

if __name__ == '__main__':
    app.run( debug = True, host = '192.168.0.104')