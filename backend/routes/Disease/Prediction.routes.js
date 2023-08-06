import express from "express";
import { detectDiseases } from "../../controllers/Disease/ObjectDetectionController.js";
const router = express.Router();

router.post("/predict", detectDiseases);

export default router;
