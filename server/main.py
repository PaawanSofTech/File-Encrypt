import numpy as np
from tensorflow.keras.applications import VGG16
from tensorflow.keras.applications.vgg16 import preprocess_input
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import Model
from scipy.spatial import distance
from fastapi import FastAPI, UploadFile, Form, File
from fastapi.responses import JSONResponse
from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad
from base64 import b64decode
from PIL import Image
import io

app = FastAPI()

base_model = VGG16(weights='imagenet')
model = Model(inputs=base_model.input, outputs=base_model.get_layer('fc2').output)

def decrypt_aes(key, ciphertext, iv):
    cipher = AES.new(key, AES.MODE_CBC, iv)
    decrypted_data = unpad(cipher.decrypt(ciphertext), AES.block_size)
    return decrypted_data

@app.post("/calculate_cosine_similarity/")
async def calculate_cosine_similarity(
    image1: UploadFile,
    image2: UploadFile,
    encrypted_aes_key: str,
    iv1_file: UploadFile,  # IV for the first image as a file
    iv2_file: UploadFile,  # IV for the second image as a file
):
    try:
        # iv1_base64 = iv1_file.file.read()
        # iv2_base64 = iv2_file.file.read()
        iv1_bytes = iv1_file.file.read()
        iv2_bytes = iv2_file.file.read()
        
        aes_key_bytes = b64decode(encrypted_aes_key)
        
        img1_data = image1.file.read()
        img2_data = image2.file.read()
        # img1_data = b64decode(img1_base64)
        # img2_data = b64decode(img2_base64)
        
        decrypted_img1 = decrypt_aes(aes_key_bytes, img1_data, iv1_bytes)
        decrypted_img2 = decrypt_aes(aes_key_bytes, img2_data, iv2_bytes)

        decrypted_img1 = Image.open(io.BytesIO(decrypted_img1))
        decrypted_img2 = Image.open(io.BytesIO(decrypted_img2))

        target_size = (224, 224)
        img1 = decrypted_img1.resize(target_size)
        img2 = decrypted_img2.resize(target_size)

        #img1 = image.array_to_img(decrypted_img1, target_size=(224, 224))
        img1 = image.img_to_array(img1)
        img1 = preprocess_input(img1)

        #img2 = image.array_to_img(decrypted_img2, target_size=(224, 224))
        img2 = image.img_to_array(img2)
        img2 = preprocess_input(img2)

        features1 = model.predict(np.array([img1]))
        features2 = model.predict(np.array([img2]))

        features1 = features1.flatten()
        features2 = features2.flatten()

        cosine_similarity = 1 - distance.cosine(features1, features2)
        result = cosine_similarity

        return JSONResponse(content={"result": result})

    except Exception as e:
        return JSONResponse(content={"error": str(e)})
