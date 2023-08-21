import mongoose from "mongoose";
const Schema = mongoose.Schema;

const DiseaseDetails = new Schema({
  disease: {
    type: String,
    required: true,
  },
  percentage: {
    type: Number,
    required: true,
  },
});

const SaveDetectionsSchema = new Schema(
  {
    mainDisease: {
      type: String,
      required: true,
    },
    diseasesInfo: {
      type: [DiseaseDetails],
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SaveDetections = mongoose.model("SaveDetections", SaveDetectionsSchema);
export default SaveDetections;

//give me a sample json
// {
//     "mainDisease": "PowderyMildew",
//     "diseasesInfo": [
//         {
//             "disease": "PowderyMildew",
//             "percentage": 0.999
//         },
//         {
//             "disease": "Anthracnose",
//             "percentage": 0.001
//         },
//         {
//             "disease": "SootyMould",
//             "percentage": 0.001
//         }
//     ],

//     "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMWFhUXGBgYGBgYGBgYGBgYGBgYGBgYGBgYHSggGBolHRgXITEhJSkrLi4uGB8zODM
//     sNygtLisBCgoKDg0OGxAQGy0lICUtL"
// }
