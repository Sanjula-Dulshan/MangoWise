import express from "express";
import { detectVariety } from "../../controllers/Variety/ObjectDetectionController.js";
import {
  saveVarietyDetection,
  getDetections,
} from "../../controllers/Variety/Variety.controller.js";
const router = express.Router();

router.post("/predict", detectVariety);
router.post("/", saveVarietyDetection);
router.get("/", getDetections);

export default router;
