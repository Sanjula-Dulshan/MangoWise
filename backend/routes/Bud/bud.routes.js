import express from "express";
import { detectSuitability } from "../../controllers/Bud/BudDetection.controller.js";

const router = express.Router();

router.post("/predict", detectSuitability);

export default router;