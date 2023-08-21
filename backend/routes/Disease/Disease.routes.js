import express from "express";
import { detectDiseases } from "../../controllers/Disease/ObjectDetection.controller.js";
import { saveDetection } from "../../controllers/Disease/SaveDetection.controller.js";
const router = express.Router();

router.post("/", saveDetection);
router.post("/predict", detectDiseases);

export default router;
