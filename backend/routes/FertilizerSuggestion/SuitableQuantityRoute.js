import express from 'express';
const router = express.Router();
import { saveSuitableQuantity,findRecordByConditions } from '../../controllers/FertilizerSuggestion/SuitableQuantityController.js';



router.post("/add", saveSuitableQuantity);

router.post("/get", findRecordByConditions);

export default router;