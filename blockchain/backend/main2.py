import numpy as np
from tensorflow.keras.applications import VGG16
from tensorflow.keras.applications.vgg16 import preprocess_input
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import Model
from scipy.spatial import distance
from fastapi import FastAPI, UploadFile, Form
from fastapi.responses import JSONResponse
from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad
from base64 import b64decode
from PIL import Image
import io
from pymongo import MongoClient

app = FastAPI()

base_model = VGG16(weights='imagenet')
model = Model(inputs=base_model.input, outputs=base_model.get_layer('fc2').output)

def decrypt_aes(key, ciphertext, iv):
    cipher = AES.new(key, AES.MODE_CBC, iv)
    decrypted_data = unpad(cipher.decrypt(ciphertext), AES.block_size)
    return decrypted_data

# Initialize the MongoDB connection
mongo_client = MongoClient("mongodb://your_mongodb_uri_here")
db = mongo_client["your_db_name"]
collection = db["your_collection_name"]

@app.post("/calculate_cosine_similarity/")
async def calculate_cosine_similarity(
    image: UploadFile,
    encrypted_aes_key: str,
    iv_file: UploadFile,  # IV file
):
    try:
        iv_bytes = iv_file.file.read()
        aes_key_bytes = b64decode(encrypted_aes_key)

        img_data = image.file.read()
        decrypted_img = decrypt_aes(aes_key_bytes, img_data, iv_bytes)
        decrypted_img = Image.open(io.BytesIO(decrypted_img))

        target_size = (224, 224)
        img = decrypted_img.resize(target_size)
        img = image.img_to_array(img)
        img = preprocess_input(img)

        features = model.predict(np.array([img]))
        features = features.flatten()

        cosine_threshold = 0.9  # Set your threshold here

        for document in collection.find():
            stored_img_data = document["encrypted_image"]  # Assuming this key exists in your documents
            stored_iv_data = document["iv_file"]  # Assuming this key exists in your documents
        #stored_features = document["features"]  # Assuming this key exists in your documents

            # Decrypt the stored image using the provided key and IV
            stored_img = decrypt_aes(aes_key_bytes, stored_img_data, stored_iv_data)

            # Process the stored image similarly to the input image
            stored_img = Image.open(io.BytesIO(stored_img))
            stored_img = stored_img.resize(target_size)
            stored_img = image.img_to_array(stored_img)
            stored_img = preprocess_input(stored_img)

            stored_features = model.predict(np.array([stored_img]))
            stored_features = stored_features.flatten()

            cosine_similarity = 1 - distance.cosine(features, stored_features)

            if cosine_similarity > cosine_threshold:
                return JSONResponse(content={"result": document["image_hash"]})

        # If no match found
        return JSONResponse(content={"result": 1})

    except Exception as e:
        return JSONResponse(content={"error": str(e)})
