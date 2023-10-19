import numpy as np
from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad, pad
from Crypto.Random import get_random_bytes
from PIL import Image
import base64

def encrypt_aes(key, plaintext):
    iv = get_random_bytes(AES.block_size)
    cipher = AES.new(key, AES.MODE_CBC, iv)
    ciphertext = cipher.encrypt(pad(plaintext, AES.block_size))
    return ciphertext, iv

# Encrypt and save the first image
image_path1 = 'image8.jpg'  # Replace with the path to your first image
with open(image_path1, 'rb') as image_file:
    image_data1 = image_file.read()
key1 = b'A)8F\xbc\xe9\xcc/\x1d@0\xe5h?\xd4\xabP"4`!\x14`\x1f\x9a\x05\xf0\xcf\xd1c\xdf\xfc'  # Replace with your AES key
encrypted_data1, iv1 = encrypt_aes(key1, image_data1)

# Encode the encrypted data to base64
#base64_encrypted_data1 = base64.b64encode(encrypted_data1+"==").decode('utf-8')

# Save the base64-encoded data and IV to files
with open('encrypted_image1.enc', 'wb') as encrypted_file:
    encrypted_file.write(encrypted_data1)
with open('iv1.enc', 'wb') as iv_file:
    iv_file.write(iv1)

# Encrypt and save the second image
image_path2 = 'image9.jpg'  # Replace with the path to your second image
with open(image_path2, 'rb') as image_file:
    image_data2 = image_file.read()
key2 = b'A)8F\xbc\xe9\xcc/\x1d@0\xe5h?\xd4\xabP"4`!\x14`\x1f\x9a\x05\xf0\xcf\xd1c\xdf\xfc'  # Replace with your AES key
encrypted_data2, iv2 = encrypt_aes(key2, image_data2)

# Encode the encrypted data to base64
#base64_encrypted_data2 = base64.b64encode(encrypted_data2+"==").decode('utf-8')

# Save the base64-encoded data and IV to files
with open('encrypted_image2.enc', 'wb') as encrypted_file:
    encrypted_file.write(encrypted_data2)
with open('iv2.enc', 'wb') as iv_file:
    iv_file.write(iv2)
