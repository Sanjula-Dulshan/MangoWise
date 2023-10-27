from google.cloud import storage
import tensorflow as tf
import pickle
import pandas as pd
import statsmodels.api as sm


BUCKET_NAME = "mango-wise" 
market_model = None




def download_blob(bucket_name, source_blob_name, destination_file_name):
    """Downloads a blob from the bucket."""
 
    storage_client = storage.Client()
    bucket = storage_client.get_bucket(bucket_name)
    blob = bucket.blob(source_blob_name)
    blob.download_to_filename(destination_file_name)

    print(f"Blob {source_blob_name} downloaded to {destination_file_name}.")


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

    
    global market_model
    if market_model is None:
        download_blob(
            BUCKET_NAME,
            "models/market/market.pickle",
            "/tmp/market.pickle",
        )


        with open(f"/tmp/market.pickle", "rb") as model_file:
            market_model = pickle.load(model_file)
        print("market_model loaded")



    custom_test_df = pd.DataFrame([custom_test_data])

    prediction = market_model.predict(custom_test_df)

    prediction_list = prediction.values[0].tolist()  
    end_index = month + steps-1

    # Slice the prediction_list to get the values from month to month-1 + steps
    forecasted_values = prediction_list[month-1:end_index]

    return {"forecasted_values": forecasted_values}
     

# gcloud functions deploy market_analysis_predict --runtime python38 --trigger-http --memory 1024 --project mangowise-395709 --allow-unauthenticated  