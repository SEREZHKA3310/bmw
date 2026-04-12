from flask import Flask
from flask_cors import CORS
from app.routes import bp

app = Flask(__name__)
app.json.ensure_ascii = False
CORS(app)
app.register_blueprint(bp)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)