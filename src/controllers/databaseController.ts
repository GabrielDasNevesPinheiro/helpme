import mongoose from 'mongoose';

const connectDatabase = async () => {

    
    if(mongoose.STATES[mongoose.connection.readyState] !== "connected")  // if already connected dont make another connection
        mongoose.connect(process.env.MONGO_URL as string);
};

export default connectDatabase;