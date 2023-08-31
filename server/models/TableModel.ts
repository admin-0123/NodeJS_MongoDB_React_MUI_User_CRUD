import * as mongoose from 'mongoose';

// Mongoose schema for Table
const TableSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Export Schema
export default mongoose.model('table', TableSchema);