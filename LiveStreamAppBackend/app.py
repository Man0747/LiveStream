from flask import Flask, request, jsonify
from flask_cors import CORS
from dbops import create_overlay, get_all_overlays, get_overlay_by_id, update_overlay, delete_overlay
from bson.errors import InvalidId

app = Flask(__name__)
CORS(app)

# Route to handle creating and retrieving overlays
@app.route('/api/overlays', methods=['GET', 'POST'])
def handle_overlays():
    if request.method == 'POST':
        try:
            overlay_data = request.json
            new_id = create_overlay(overlay_data)
            return jsonify({"id": new_id}), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    else:
        try:
            overlays = get_all_overlays()
            return jsonify([{**overlay, "_id": str(overlay["_id"])} for overlay in overlays])
        except Exception as e:
            return jsonify({"error": str(e)}), 500

# Route to handle specific overlay operations: GET, PUT, DELETE
@app.route('/api/overlays/<id>', methods=['GET', 'PUT', 'DELETE'])
def handle_overlay(id):
    try:
        if request.method == 'GET':
            overlay = get_overlay_by_id(id)
            if overlay:
                overlay["_id"] = str(overlay["_id"])
                return jsonify(overlay)
            return jsonify({"error": "Overlay not found"}), 404

        elif request.method == 'PUT':
            overlay_data = request.json
            success = update_overlay(id, overlay_data)
            if success:
                return jsonify({"message": "Overlay updated successfully"})
            return jsonify({"error": "Overlay not found"}), 404

        elif request.method == 'DELETE':
            success = delete_overlay(id)
            if success:
                return jsonify({"message": "Overlay deleted successfully"})
            return jsonify({"error": "Overlay not found"}), 404

    except InvalidId:
        return jsonify({"error": "Invalid overlay ID"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

