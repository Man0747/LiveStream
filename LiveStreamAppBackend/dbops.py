from pymongo import MongoClient
from bson.objectid import ObjectId

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['livestream_app']

# Create collections
overlays_collection = db['overlays']

# Define schema 
overlay_schema = {
    "content": str,
    "x": int,
    "y": int,
    "width": int,
    "height": int,
    "font_size": int,
    "color": str,
    "background_color": str,
    "opacity": float
}

# CRUD Operations

def create_overlay(overlay_data):
    result = overlays_collection.insert_one(overlay_data)
    return str(result.inserted_id)

def get_all_overlays():
    return list(overlays_collection.find())

def get_overlay_by_id(overlay_id):
    return overlays_collection.find_one({"_id": ObjectId(overlay_id)})

def update_overlay(overlay_id, overlay_data):
    result = overlays_collection.update_one(
        {"_id": ObjectId(overlay_id)},
        {"$set": overlay_data}
    )
    return result.modified_count > 0

def delete_overlay(overlay_id):
    result = overlays_collection.delete_one({"_id": ObjectId(overlay_id)})
    return result.deleted_count > 0

# Example usage
if __name__ == "__main__":
    # Create an overlay
    new_overlay = {
        "content": "Sample Overlay",
        "x": 10,
        "y": 20,
        "width": 100,
        "height": 50,
        "font_size": 14,
        "color": "#FFFFFF",
        "background_color": "#000000",
        "opacity": 0.8
    }
    new_id = create_overlay(new_overlay)
    print(f"Created overlay with ID: {new_id}")

    # Get all overlays
    all_overlays = get_all_overlays()
    print(f"All overlays: {all_overlays}")

    # Get a specific overlay
    overlay = get_overlay_by_id(new_id)
    print(f"Retrieved overlay: {overlay}")

    # Update an overlay
    updated_data = {"content": "Updated Overlay"}
    success = update_overlay(new_id, updated_data)
    print(f"Update successful: {success}")

    # Delete an overlay
    success = delete_overlay(new_id)
    print(f"Delete successful: {success}")