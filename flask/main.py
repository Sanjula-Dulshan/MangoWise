from fastapi import FastAPI, UploadFile, File
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf
import joblib as jolib
import pickle
import pandas as pd



app = FastAPI()

BUD_MODEL = tf.keras.models.load_model("./bud/bud_VGG16.h5")
BUD_CLASS_NAMES = ["eairly", "late", "suitable"]
VERITY_CLASSIFY_MODEL = tf.keras.models.load_model("./bud/mango_variety_classifier.h5")

DISEASE_MODEL = tf.keras.models.load_model("./disease/disease_Xception.h5")
DISEASE_CLASS_NAMES = ['Anthracnose', 'Healthy', 'Powdery_Mildew', 'Sooty_Mould']

with open('./fertilizer/Fertilizer_Predictor.pickle', 'rb') as file:
    FERTILIZER_MODEL = pickle.load(file)

with open('./fertilizer/Fertilizer_Quantity_Predictor.pickle', 'rb') as file:
    FERTILIZER_QUANTITY_MODEL = pickle.load(file)


with open(f"./market/market.pickle", "rb") as model_file:
    MARKET_MODEL = pickle.load(model_file)



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
@app.post("/variety/")
def predict_mango(harvest_level: str, climate_zone: str, taste: str, purpose: str, size: str):
    
    prediction = climate_zone + " " + taste + " " + purpose + " " + size
    prediction = VERITY_CLASSIFY_MODEL.predict_mango_varieties('high', 'dry', 'good', 'personal', 'big')
    
    return prediction

@app.post("/bud/")
async def predict(file: UploadFile = File(...)):
    image = read_file_as_image(await file.read())
    img_batch = np.expand_dims(image, 0)
    prediction = BUD_MODEL.predict(img_batch)

    predicted_class = BUD_CLASS_NAMES[np.argmax(prediction[0])]
    confidence = round(100 * (np.max(predictions[0])), 2)

    return {"class": predicted_class, "confidence": float(confidence)}

@app.post("/disease/")
async def predict(
    file: UploadFile = File(...)
):
    image = read_file_as_image_disease(await file.read())

    # Resize image
    target_size = (240, 240)
    image = image.resize(target_size)

    # Convert image to array
    image_array = np.array(image)

    # Add batch dimension
    img_batch = np.expand_dims(image_array, 0)

    # Perform prediction
    predictions = DISEASE_MODEL.predict(img_batch)

    # Get predicted class and confidence
    predicted_class = DISEASE_CLASS_NAMES[np.argmax(predictions[0])]
    confidence = round(100 * (np.max(predictions[0])), 2)

    return {"class": predicted_class, "confidence": confidence}

@app.post("/fertilizer/")
def fertilizers(request):
    data = request.json

    # Extract N, P, K values from the request data
    N = data['N']
    P = data['P']
    K = data['K']
    NAF = data['NAF']
    PAF = data['PAF']
    KAF = data['KAF']

    # Create a feature vector from the extracted values
    features = [[N, P, K, NAF, PAF, KAF]]

    # Make predictions using the fertilizer model
    predictions = FERTILIZER_MODEL.predict(features)

    # Return the predicted fertilizer name
    predicted_fertilizer = predictions[0]
    return {'Predicted Fertilizer': predicted_fertilizer}

@app.post("/quantity/")
def fQuantity(request):
    data = request.json

    # Extract values from the request data
    N = data['N']
    P = data['P']
    K = data['K']
    NAF = data['NAF']
    PAF = data['PAF']
    KAF = data['KAF']
    DN = data['DN']
    DP = data['DP']
    DK = data['DK']
    MOP = data['MOP']
    TSP = data['TSP']
    UREA = data['UREA']
    YM1 = data['YM1']
    YM2 = data['YM2']

    # Create a feature vector from the extracted values
    features = [[N, P, K, NAF, PAF, KAF, DN, DP, DK, MOP, TSP, UREA, YM1, YM2]]

    # Make predictions using the fertilizer model
    predictions = FERTILIZER_QUANTITY_MODEL.predict(features)

    # Return the predicted fertilizer quantity
    predicted_fertilizer_quantity = predictions[0]
    return {'Predicted Fertilizer Quantity': predicted_fertilizer_quantity}

@app.post("/market/")
def market_analysis_predict(request):

    print("request>>>> ",request.json)

    data = request.json
    location = data['Location']
    variety = data['Variety']
    month = data['Month']
    steps = data['Steps']
    
    custom_test_data = {
    'Location_Ampara': 1 if location == 'Location_Ampara' else 0,
    'Location_Anuradapura': 1 if location == 'Location_Anuradapura' else 0,
    'Location_Badulla': 1 if location == 'Location_Badulla' else 0,
    'Location_Bandarawela': 1 if location == 'Location_Bandarawela' else 0,
    'Location_Batticaloa': 1 if location == 'Location_Batticaloa' else 0,
    'Location_Colombo': 1 if location == 'Location_Colombo' else 0,
    'Location_Dambulla': 1 if location == 'Location_Dambulla' else 0,
    'Location_Dehiattakandiya': 1 if location == 'Location_Dehiattakandiya' else 0,
    'Location_Embilipitiya': 1 if location == 'Location_Embilipitiya' else 0,
    'Location_Galenbidunuwewa': 1 if location == 'Location_Galenbidunuwewa' else 0,
    'Location_Galle': 1 if location == 'Location_Galle' else 0,
    'Location_Gampaha': 1 if location == 'Location_Gampaha' else 0,
    'Location_Hambanthota': 1 if location == 'Location_Hambanthota' else 0,
    'Location_Hanguranketha': 1 if location == 'Location_Hanguranketha' else 0,
    'Location_Jaffna': 1 if location == 'Location_Jaffna' else 0,
    'Location_Kaluthara': 1 if location == 'Location_Kaluthara' else 0,
    'Location_Kandy': 1 if location == 'Location_Kandy' else 0,
    'Location_Kegalle': 1 if location == 'Location_Kegalle' else 0,
    'Location_Keppetipola': 1 if location == 'Location_Keppetipola' else 0,
    'Location_Kilinochchi': 1 if location == 'Location_Kilinochchi' else 0,
    'Location_Kurunegala': 1 if location == 'Location_Kurunegala' else 0,
    'Location_Mannar': 1 if location == 'Location_Mannar' else 0,
    'Location_Matale': 1 if location == 'Location_Matale' else 0,
    'Location_Matara': 1 if location == 'Location_Matara' else 0,
    'Location_Meegoda(DEC)': 1 if location == 'Location_Meegoda(DEC)' else 0,
    'Location_Monaragala': 1 if location == 'Location_Monaragala' else 0,
    'Location_Mullathivu': 1 if location == 'Location_Mullathivu' else 0,
    'Location_Nikaweratiya': 1 if location == 'Location_Nikaweratiya' else 0,
    'Location_Nuwara Eliya': 1 if location == 'Location_Nuwara Eliya' else 0,
    'Location_Polonnaruwa': 1 if location == 'Location_Polonnaruwa' else 0,
    'Location_Puttalam': 1 if location == 'Location_Puttalam' else 0,
    'Location_Rathnapura': 1 if location == 'Location_Rathnapura' else 0,
    'Location_Thabuththegama': 1 if location == 'Location_Thabuththegama' else 0,
    'Location_Thissamaharama': 1 if location == 'Location_Thissamaharama' else 0,
    'Location_Trinco': 1 if location == 'Location_Trinco' else 0,
    'Location_Vavuniya': 1 if location == 'Location_Vavuniya' else 0,
    'Location_Veyangoda': 1 if location == 'Location_Veyangoda' else 0,
    'Item_KARTHAKOLOMBAN': 1 if variety == 'Item_KARTHAKOLOMBAN' else 0,
    'Item_PETTI': 1 if variety == 'Item_PETTI' else 0,
    'Item_TJC': 1 if variety == 'Item_TJC' else 0
}

    custom_test_df = pd.DataFrame([custom_test_data])

    prediction = MARKET_MODEL.predict(custom_test_df)

    prediction_list = prediction.values[0].tolist()  
    end_index = month + steps-1

    # Slice the prediction_list to get the values from month to month-1 + steps
    forecasted_values = prediction_list[month-1:end_index]

    return {"forecasted_values": forecasted_values}

if __name__ == "__main__":
    uvicorn.run("main:app", port=8090, host="localhost")

#uvicorn main:app --reload
