from google.cloud import storage
import tensorflow as tf
from PIL import Image
import numpy as np

model = None
interpreter = None
input_index = None
output_index = None

class_names = ['Anthracnose', 'Healthy', 'Powdery_Mildew', 'Sooty_Mould']

BUCKET_NAME = "mango-wise"  # Here you need to put the name of your GCP bucket


def download_blob(bucket_name, source_blob_name, destination_file_name):
    """Downloads a blob from the bucket."""
    storage_client = storage.Client()
    bucket = storage_client.get_bucket(bucket_name)
    blob = bucket.blob(source_blob_name)

    blob.download_to_filename(destination_file_name)

    print(f"Blob {source_blob_name} downloaded to {destination_file_name}.")


def disease_predict(request):
    global model
    if model is None:
        download_blob(
            BUCKET_NAME,
            "models/disease/mango_Xception.h5",
            "/tmp/mango_Xception.h5",
        )
        print("Model downloaded")
        model = tf.keras.models.load_model("/tmp/mango_Xception.h5")
        print("Model loaded")

    image = request.files["file"]

    image_array = np.array(
        Image.open(image).convert("RGB").resize((240, 240))  # image resizing
    )
    print("Image loaded")

    img_batch = np.expand_dims(image_array, 0)
    predictions = model.predict(img_batch)

    print("Predictions: ", predictions)

    predicted_class = class_names[np.argmax(predictions[0])]
    confidence = round(100 * (np.max(predictions[0])), 2)

    return {"class": predicted_class, "confidence": confidence}

import numpy as np
from PIL import Image
import tensorflow as tf


GREEN_THRESHOLD = 0.5
CONFIDENCE_THRESHOLD = 50.0

def is_leaf(rgb_image):
    # Split the RGB image into its color channels
    red_channel, green_channel, blue_channel = rgb_image[:, :, 0], rgb_image[:, :, 1], rgb_image[:, :, 2]

    # Calculate the proportion of green pixels
    total_pixels = rgb_image.shape[0] * rgb_image.shape[1]
    green_proportion = np.sum(green_channel > red_channel) / total_pixels

    # Check if the green proportion is above the threshold
    return green_proportion >= GREEN_THRESHOLD

def disease_predict_filterRGB(request):
    global model
    if model is None:
        download_blob(
            BUCKET_NAME,
            "models/disease/mango_Xception.h5",
            "/tmp/mango_Xception.h5",
        )
        print("Model downloaded")
        model = tf.keras.models.load_model("/tmp/mango_Xception.h5")
        print("Model loaded")
        
    image = request.files["file"]

    image_array = np.array(
        Image.open(image).convert("RGB").resize((240, 240))
    )

    if is_leaf(image_array):
        img_batch = np.expand_dims(image_array, 0)
        predictions = model.predict(img_batch)

        predicted_class = class_names[np.argmax(predictions[0])]
        confidence = round(100 * (np.max(predictions[0])), 2)

        if confidence >= CONFIDENCE_THRESHOLD:
            return {"class": predicted_class, "confidence": confidence}
        else:
            return {"message": "Disease not identified"}
        
    else:
        return {"message": "Not found a leaf"}

# Define your BUCKET_NAME, class_names, and download_blob function as needed
