from flask import Flask, request, jsonify
import os
import requests
from PIL import Image
import pytesseract

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

api_key = open('API_KEY').read()
cx = open('SE_ID').read()

def find_related_images(query):
    search_url = f"https://www.googleapis.com/customsearch/v1?q={query}&cx={cx}&key={api_key}&searchType=image&num=5"
    response = requests.get(search_url)
    response.raise_for_status()
    results = response.json()
    return results.get("items", [])

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return "No image part", 400
    file = request.files['image']
    if file.filename == '':
        return "No selected file", 400
    if file:
        filename = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(filename)
        query = "extract_query_from_image(filename)"
        if not query:
            return "No text found in image", 400
        related_images = find_related_images(query)
        return jsonify(related_images)

def extract_query_from_image(image_path):
    try:
        image = Image.open(image_path)
        query = pytesseract.image_to_string(image)
        return query.strip()  # Remove any leading/trailing whitespace
    except Exception as e:
        print(f"Error extracting text from image: {e}")
        return None

if __name__ == '__main__':
    app.run(debug=True)
