from google.cloud import storage
import tensorflow as tf
from PIL import Image
import numpy as np
import joblib as jolib
from pydantic import BaseModel
from typing import List


bud_model = None
v_model = None
interpreter = None
input_index = None
output_index = None

# Define a request body model
class MangoPredictionRequest(BaseModel):
    harvest: str
    climate: str
    taste: str
    purpose: str
    size: str

# Define a response model
class MangoPredictionResponse(BaseModel):
    variety: str
    percentage: float

# Define characteristics and their values
harvest_level = ['high', 'medium', 'low']
climate_zone = ['wet', 'intermediate', 'dry']
taste = ['good', 'average']
purpose = ['export', 'commercial', 'personal']
fruit_size = ['big', 'medium', 'small']

class_names = ["eairly", "late", "suitable"]


BUCKET_NAME = "mango-wise"  # Here you need to put the name of your GCP bucket


# Helper function to convert characteristics to data indices
def convert_to_indices(request: MangoPredictionRequest) -> List[int]:
    print("64 request>>>> ",request)
    return [
        harvest_level.index(request.harvest),
        climate_zone.index(request.climate),
        taste.index(request.taste),
        purpose.index(request.purpose),
        fruit_size.index(request.size)
    ]

def download_blob(bucket_name, source_blob_name, destination_file_name):
    """Downloads a blob from the bucket."""
    storage_client = storage.Client()
    bucket = storage_client.get_bucket(bucket_name)
    blob = bucket.blob(source_blob_name)

    blob.download_to_filename(destination_file_name)

    print(f"Blob {source_blob_name} downloaded to {destination_file_name}.")


def v_select_predict(request):
    print("request>>>> ",request.json)
    global v_model
    if v_model is None:
        download_blob(
            BUCKET_NAME,
            "models/bud/v_select/mango_variety_classifier.h5",
            "/tmp/mango_variety_classifier.h5",
        )
        print("Model downloaded")
        v_model = jolib.load("/tmp/mango_variety_classifier.h5")
        print("v_model loaded")

    data = convert_to_indices(request.json)
    
    prediction = v_model.predict_proba([data])[0]
    predicted_class_index = prediction.argmax()
    predicted_class = v_model.classes_[predicted_class_index]
    confidence = prediction[predicted_class_index] * 100
    
    result = MangoPredictionResponse(variety=predicted_class, percentage=confidence)
    return result

def bud_predict(request):
    print("request",request)
    global bud_model

    print("bud_model",bud_model)

    if bud_model is None:
        download_blob(
            BUCKET_NAME,
            "models/bud/VGG16.h5",
            "/tmp/bud_vgg16.h5",
        )
        print("Model downloaded")
        bud_model = tf.keras.models.load_model("/tmp/bud_vgg16.h5")
        print("bud_model loaded")

    image = request.files["file"]
    

    image_array = np.array(
        Image.open(image).convert("RGB").resize((256, 256))  # image resizing
    )
    print("Image loaded")

    img_batch = np.expand_dims(image_array, 0)
    predictions = bud_model.predict(img_batch)

    print("Predictions: ", predictions)

    predicted_class = class_names[np.argmax(predictions[0])]
    confidence = round(100 * (np.max(predictions[0])), 2)

    return {"class": predicted_class, "confidence": confidence}

