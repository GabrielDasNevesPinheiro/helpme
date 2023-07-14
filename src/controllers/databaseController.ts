import mongoose from 'mongoose';

const connectDatabase = async () => mongoose.connect(process.env.MONGO_URL as string);

export default connectDatabase;