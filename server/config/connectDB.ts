import * as mongoose from 'mongoose';

// Connect to MongoDB
export default async () => {
  await mongoose.connect(process.env.MONGO_URI!)
    .then(() => console.log('Connected to MongoDB.'))
    .catch(error => console.log(error));
}