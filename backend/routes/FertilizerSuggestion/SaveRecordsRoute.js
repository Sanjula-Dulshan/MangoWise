import express from 'express';
const router = express.Router();
import { saveRecord,getRecordById } from '../../controllers/FertilizerSuggestion/SaveRecordsController.js';


router.post("/add", saveRecord);

router.post("/get/:record_id/", getRecordById);

export default router;