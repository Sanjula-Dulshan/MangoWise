import express from 'express';
const router = express.Router();
import { saveSuitableQuantity,findRecordByConditions,callModel } from '../../controllers/FertilizerSuggestion/SuitableQuantityController.js';



router.post("/add", saveSuitableQuantity);

router.post("/get", findRecordByConditions);

router.post("/fer", callModel);

export default router;