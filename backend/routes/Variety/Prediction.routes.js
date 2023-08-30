import express from "express";
import { detectVariety } from "../../controllers/Variety/ObjectDetectionController.js";
const router = express.Router();

router.post("/predict", detectVariety);

export default router;
