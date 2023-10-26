//TODO: Change the backend_url to your IP address
const constants = {
  //backend_url: "http://172.20.10.2:8070", //Dilsha
  // backend_url: "http://192.168.8.115:8070", //Sanjula  172.20.10.6  192.168.8.115
  backend_url: "http://192.168.8.125:8070", //Yasantha
  //backend_url: "http://192.168.1.108:8070", //Dulanjana

  disease_cnn_url:
    "https://us-central1-mangowise-395709.cloudfunctions.net/disease_predict",

  PUBLISHABLE_KEY:
    "pk_test_51O3x9tGEIOifpCgCb7gZFsyZcxDLpC7QMSSbR2xACG8A86KxZ6gLGikbU6DE7wwSI7TXJM9t8p32iNRRwnSwcqDs00bVgJdvQT",
  SECRET_KEY:
    "sk_test_51O3x9tGEIOifpCgC0367qfpCcP1wNSCppPT6iekci4NACDG4rsNakoqFKGDvGAXAGPW8i9QQd8zUHfysRwJHkMNs00KJGgCsn6",
};

export default constants;
