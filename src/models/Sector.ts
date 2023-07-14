import mongoose from "mongoose";

interface ISector {
    name: string;
}


const sectorSchema = new mongoose.Schema<ISector>({

    name: {
        type: String,
        required: true,
    }

});

const Sector = mongoose.model<ISector>("Sector", sectorSchema);

export default Sector;