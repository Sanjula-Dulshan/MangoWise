import Detection from "../../models/Disease/SaveDetections.model.js";

export const saveDetection = async (req, res) => {
  try {
    const newDetection = new Detection(req.body);
    const savedDetection = await newDetection.save();
    res.status(201).json(savedDetection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
