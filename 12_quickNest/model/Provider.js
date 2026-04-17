
import { boolean, ref, required } from "joi";
import mongoose from "mongoose";




const ProviderSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId(),
        ref: "User",
        required: true,
    },
    services: [
        {
            type: mongoose.Schema.Types.ObjectId(),
            ref: "Services",
        }
    ],
    experience: {

        type: Number,
        default: 0

    },
    documents: [
        {
            type: String,
            required: true,
        }
    ],

    isVerified: {
        type: boolean,
        default: false,
    }



})






const Provider = mongoose.model("Provider", ProviderSchema)


export default Provider;

