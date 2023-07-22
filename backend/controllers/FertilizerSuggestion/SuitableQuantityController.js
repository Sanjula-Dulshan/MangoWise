import SuitableQuantity from "../../models/FertilizerSuggestion/SuitableQuantityModel.js";
import request from 'request-promise';

// Controller function to save data to the database
export const saveSuitableQuantity = async (req, res) => {
  try {
    const newSuitableQuantity = new SuitableQuantity(req.body);
    const savedSuitableQuantity = await newSuitableQuantity.save();
    res.status(201).json(savedSuitableQuantity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to retrieve records based on age and growthStage
export const findRecordByConditions = async (req, res) => {
  const { age, growthStage } = req.params;
  const record = await SuitableQuantity.findOne({
    ageLowerLimit: { $lt: age },
    ageUpperLimit: { $gt: age },
    growthStage: growthStage,
  });

  try {
    let data = {
      "N": parseInt(age),
      "P": 86,
      "K": 160,
      "NAF": parseInt(record.N_lowerLimit),
      "PAF": 86,
      "KAF": 220
    }

    let options = {
      method: 'POST',
      uri: 'http://127.0.0.1:5000/fertilizer',
      body: data,
      json: true
    };
    console.log(record);
    console.log("DATA", data);

    await request(options)
      .then(async function (parsedBody) {
        let result;
        result = parsedBody['Predicted Fertilizer'];

        let data2 = {
          "N":26,
          "P":86,
          "K":160,
          "NAF":26,
          "PAF":86,
          "KAF":220,
          "DN":0,
          "DP":0,
          "DK":60,
          "MOP":1,
          "TSP":0,
          "UREA":0,
          "YM1":0,
          "YM2":0
        }
    
        let options2 = {
          method: 'POST',
          uri: 'http://127.0.0.1:5000/quantity',
          body: data2,
          json: true
        };
        await request(options2) 
        .then(async function (parsedBody) {
          let result2;
          result2 = parsedBody['Predicted Fertilizer Quantity'];
          return res.status(200).json(result + result2);
        }).catch(function (err) {
          console.log(err);
        });
      })
      .catch(function (err) {
        console.log(err);
      });

    if (!record) {
      res.status(404).json({ message: "Record not found" });
      return;
    }
    return;

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const callModel = async (req, res) => {

  let data = {
    "N": 26,
    "P": 86,
    "K": 160,
    "NAF": 26,
    "PAF": 86,
    "KAF": 220
  }

  let options = {
    method: 'POST',
    uri: 'http://127.0.0.1:5000/fertilizer',
    body: data,
    json: true
  };

  const sendrequest = await request(options)
    .then(function (parsedBody) {
      let result;
      result = parsedBody['Predicted Fertilizer'];
      console.log(result);
      return res.status(200).json(result);

    })
    .catch(function (err) {
      console.log(err);
    });
}