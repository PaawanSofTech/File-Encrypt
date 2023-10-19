import numpy as np
from tensorflow.keras.applications import VGG16
from tensorflow.keras.applications.vgg16 import preprocess_input
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import Model
from scipy.spatial import distance

# Load pre-trained VGG16 model (you can use other models as well)
base_model = VGG16(weights='imagenet')
model = Model(inputs=base_model.input, outputs=base_model.get_layer('fc2').output)

# Load and preprocess your images
image_path1 = 'image1.png'
image_path2 = 'image2.jpg'

img1 = image.load_img(image_path1, target_size=(224, 224))
img1 = image.img_to_array(img1)
img1 = preprocess_input(img1)

img2 = image.load_img(image_path2, target_size=(224, 224))
img2 = image.img_to_array(img2)
img2 = preprocess_input(img2)

# Extract features
features1 = model.predict(np.array([img1]))
features2 = model.predict(np.array([img2]))

# Flatten the feature vectors
features1 = features1.flatten()
features2 = features2.flatten()

# Calculate cosine similarity
cosine_similarity = 1 - distance.cosine(features1, features2)

# Set a similarity threshold
threshold = 0.90  # Adjust this threshold as needed

# Compare the similarity to the threshold
if cosine_similarity > threshold:
    print(f"The images are similar (Cosine Similarity: {cosine_similarity})")
else:
    print(f"The images are dissimilar (Cosine Similarity: {cosine_similarity})")
