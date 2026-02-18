import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        console.log("Connection à MongoDB réussi");
    } catch (error) {
        console.log(error);
    }
}

export default ConnectDB;