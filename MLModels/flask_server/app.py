from flask import Flask, request, jsonify
import pickle
import numpy as np

# Set up Flask app
app = Flask(__name__)

# Load the models


# Load Fertilizer_Predictor Model
with open('../model building/FertilizerPrediction/Fertilizer_Predictor.pickle', 'rb') as file:
    fertilizer = pickle.load(file)

# Load Fertilizer_Quantity_Predictor Model
with open('../model building/FertilizerQuantityPrediction/Fertilizer_Quantity_Predictor.pickle', 'rb') as file:
    fertilizerQuantity = pickle.load(file)

# Define Route for Fertilizer_Predictor Model


@app.route('/fertilizer', methods=['POST'])
def fertilizers():
    data = request.get_json()

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
    predictions = fertilizer.predict(features)

    # Return the predicted fertilizer name
    predicted_fertilizer = predictions[0]
    return jsonify({'Predicted Fertilizer': predicted_fertilizer})

# Define Route Fertilizer_Quantity_Predictor Model


@app.route('/quantity', methods=['POST'])
def fQuantity():
    data = request.get_json()

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
    predictions = fertilizerQuantity.predict(features)

    # Return the predicted fertilizer quantity
    predicted_fertilizer_quantity = predictions[0]
    return jsonify({'Predicted Fertilizer Quantity': predicted_fertilizer_quantity})


if __name__ == '__main__':
    app.run(debug=True)
