import SaveRecords from "./../../models/FertilizerSuggestion/SaveRecordsModel.js"

// Controller function to save data to the database
export const saveRecord = async (req, res) => {
  try {
    const newRecord = new SaveRecords(req.body);
    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to retrieve data from the database based on record_id
export const getRecordById = async (req, res) => {
  const recordId = req.params.recordId;
  try {
    const record = await SaveRecords.findOne({ record_id: recordId });
    if (!record) {
      res.status(404).json({ message: "Record not found" });
      return;
    }
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
