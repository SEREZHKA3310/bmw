from flask import Blueprint, jsonify, request
from app.parser import parse_xlsx

bp = Blueprint("api", __name__, url_prefix="/api/v1")


@bp.get("/health")
def health():
    return jsonify({"status": "ok"})


@bp.post("/xlsx/parse")
def parse_endpoint():
    file = request.files.get("file")

    if not file:
        return jsonify({"error": "file is required"}), 400

    if not file.filename.lower().endswith(".xlsx"):
        return jsonify({"error": "supported format: .xlsx"}), 400

    try:
        result = parse_xlsx(file)
        return jsonify(result)
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500