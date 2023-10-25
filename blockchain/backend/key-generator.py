import secrets
import base64

# Encode AES key and IV to base64 strings
# Generate a 256-bit (32-byte) random AES key
aes_key = secrets.token_bytes(32)
base64_aes_key = base64.b64encode(aes_key).decode('utf-8')
print(aes_key)
print(base64_aes_key)