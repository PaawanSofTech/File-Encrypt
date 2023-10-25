from PIL import Image
import imagehash

# Load images (without accessing their content)
image1_hash = imagehash.average_hash(Image.open('image1.png'))
image2_hash = imagehash.average_hash(Image.open('image2.jpg'))

# Compare the hashes
similarity = 1 - (image1_hash - image2_hash) / len(image1_hash.hash)  # Calculate similarity

print(f"Similarity between the images: {similarity * 100:.2f}%")
