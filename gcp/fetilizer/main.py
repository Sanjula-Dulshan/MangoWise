from google.cloud import storage
import tensorflow as tf
import pickle

BUCKET_NAME = "mango-wise" 
fertilizer_model = None
fertilizerQuantity_model = None


def download_blob(bucket_name, source_blob_name, destination_file_name):
    """Downloads a blob from the bucket."""
 
    storage_client = storage.Client()
    bucket = storage_client.get_bucket(bucket_name)
    blob = bucket.blob(source_blob_name)
    blob.download_to_filename(destination_file_name)

    print(f"Blob {source_blob_name} downloaded to {destination_file_name}.")

def fertilizers(request):

    print("request>>>> ",request.json)

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

    print("features>>>> ",features)

    global fertilizer_model
    if fertilizer_model is None:
        download_blob(
            BUCKET_NAME,
            "models/fertilizer/Fertilizer_Predictor.pickle",
            "/tmp/Fertilizer_Predictor.pickle",
        )


        with open(f"/tmp/Fertilizer_Predictor.pickle", "rb") as model_file:
            fertilizer_model = pickle.load(model_file)
        print("fertilizer_model loaded")


    # Make predictions using the fertilizer model
    predictions = fertilizer_model.predict(features)

    print("predictions>>>> ",predictions)

    # Return the predicted fertilizer name
    predicted_fertilizer = predictions[0]
    return {'Predicted Fertilizer': predicted_fertilizer}

def fQuantity(request):

    print("request>>>> ",request.json)

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


    print("features>>>> ",features)

    global fertilizerQuantity_model
    if fertilizerQuantity_model is None:
        download_blob(
            BUCKET_NAME,
            "models/fertilizer/Fertilizer_Quantity_Predictor.pickle",
            "/tmp/Fertilizer_Quantity_Predictor.pickle",
        )


        with open(f"/tmp/Fertilizer_Quantity_Predictor.pickle", "rb") as model_file:
            fertilizerQuantity_model = pickle.load(model_file)
        print("fertilizerQuantity_model loaded")


    # Make predictions using the fertilizer model
    predictions = fertilizerQuantity_model.predict(features)

    print("predictions>>>> ",predictions)

    # Return the predicted fertilizer name
    predicted_fertilizer_quantity = predictions[0]
    return {'Predicted Fertilizer Quantity': predicted_fertilizer_quantity}


# gcloud functions deploy fertilizers --runtime python38 --trigger-http --memory 1024 --project mangowise-395709 --allow-unauthenticated  