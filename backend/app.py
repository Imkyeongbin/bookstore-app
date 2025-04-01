from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__, static_folder="static", static_url_path="/")
CORS(app)

@app.route("/api/hello")
def hello():
    return jsonify({"message": "Hello from Flask!"})

@app.route("/")
def index():
    return app.send_static_file("index.html")

if __name__ == "__main__":
    app.run(debug=True)
