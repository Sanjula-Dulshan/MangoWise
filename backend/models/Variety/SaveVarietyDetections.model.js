// save detection model for variety

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const varietyDetails = new Schema({
  class: {
    type: String,
    required: true,
  },
});

const SaveDetectionsSchema = new Schema(
  {
    variety: {
      type: String,
      required: true,
    },
    varietyInfo: {
      type: [varietyDetails],
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

const SaveVarietyDetections = mongoose.model(
  "SaveVarietyDetections",
  SaveDetectionsSchema
);
export default SaveVarietyDetections;
