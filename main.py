from fastapi import FastAPI, UploadFile, File
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf
import joblib as jolib

app = FastAPI()

BUD_MODEL = tf.keras.models.load_model("./flask/bud/bud_VGG16.h5")
BUD_CLASS_NAMES = ["eairly", "late", "suitable"]

DISEASE_MODEL = tf.keras.models.load_model("./flask/disease/disease_Xception.h5")
DISEASE_CLASS_NAMES = ['Anthracnose', 'Healthy', 'Powdery_Mildew', 'Sooty_Mould']

VERITY_MODEL = tf.keras.models.load_model("./flask/disease/disease_Xception.h5")
VERITY_CLASS_NAMES = ['Dasheri','Neelam','alphonso']

VERITY_CLASSIFY_MODEL = jolib.load("./flask/bud/mango_variety_classifier.h5")


@app.get("/")
async def ping():
    return {"message": "pong"}


def read_file_as_image(file) -> Image.Image:
    image = Image.open(BytesIO(file))
    return image
def read_file_as_image_disease(data) -> Image.Image:
    image = Image.open(BytesIO(data)).convert("RGB")
    return image


# Route to predict suitable mango varieties
@app.post("/predict/")
def predict_mango(harvest_level: str, climate_zone: str, taste: str, purpose: str, size: str):
    
    prediction = climate_zone + " " + taste + " " + purpose + " " + size
    prediction = VERITY_CLASSIFY_MODEL.predict_mango_varieties('high', 'dry', 'good', 'personal', 'big')
    
    return prediction

@app.post("/bud/predict/")
async def predict(file: UploadFile = File(...)):
    image = read_file_as_image(await file.read())
    img_batch = np.expand_dims(image, 0)
    prediction = BUD_MODEL.predict(img_batch)

    predicted_class = BUD_CLASS_NAMES[np.argmax(prediction[0])]
    confidence = np.max(prediction[0])

    return {"class": predicted_class, "confidence": float(confidence)}

@app.post("/disease/predict/")
async def predict(
    file: UploadFile = File(...)
):
    image = read_file_as_image_disease(await file.read())

    # Resize image
    target_size = (320, 240)
    image = image.resize(target_size)

    # Convert image to array
    image_array = np.array(image)

    # Add batch dimension
    img_batch = np.expand_dims(image_array, 0)

    # Perform prediction
    predictions = DISEASE_MODEL.predict(img_batch)

    # Get predicted class and confidence
    predicted_class = DISEASE_CLASS_NAMES[np.argmax(predictions[0])]
    confidence = float(np.max(predictions[0]))

    result = {}

    if confidence > 0.5:
        result['class'] = predicted_class
        result['confidence'] = float(confidence)
    else:
        result['message'] = "Cannot classify. Please upload correct image"

    return result



    

@app.post("/verity/predict")
async def predict(
    file: UploadFile = File(...)
):
    image = read_file_as_image_disease(await file.read())

    # Resize image
    target_size = (256, 256)
    image = image.resize(target_size)

    # Convert image to array
    image_array = np.array(image)

    # Add batch dimension
    img_batch = np.expand_dims(image_array, 0)

    # Perform prediction
    predictions = VERITY_MODEL.predict(img_batch)

    # Get predicted class and confidence
    predicted_class = VERITY_CLASS_NAMES[np.argmax(predictions[0])]
    confidence = float(np.max(predictions[0]))

    result = {}

    if confidence > 0.5:
        result['class'] = predicted_class
        result['confidence'] = float(confidence)
    else:
        result['message'] = "Cannot classify. Please upload correct image"

    return result


if __name__ == "__main__":
    uvicorn.run("main:app", port=8090, host="localhost")
