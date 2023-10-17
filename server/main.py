import numpy as np
from tensorflow.keras.applications import VGG16
from tensorflow.keras.applications.vgg16 import preprocess_input
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import Model
from scipy.spatial import distance
from fastapi import FastAPI, UploadFile, Form
from fastapi.responses import JSONResponse
import io
from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad
from base64 import b64decode

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
    encrypted_aes_key: str = Form(...),
    iv: str = Form(...),
):
    try:
        iv_bytes = b64decode(iv)
        aes_key_bytes = b64decode(encrypted_aes_key)

        img1_data = b64decode(image1.file.read())
        img2_data = b64decode(image2.file.read())

        decrypted_img1 = decrypt_aes(aes_key_bytes, img1_data, iv_bytes)
        decrypted_img2 = decrypt_aes(aes_key_bytes, img2_data, iv_bytes)

        img1 = image.array_to_img(decrypted_img1, target_size=(224, 224))
        img1 = image.img_to_array(img1)
        img1 = preprocess_input(img1)

        img2 = image.array_to_img(decrypted_img2, target_size=(224, 224))
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
