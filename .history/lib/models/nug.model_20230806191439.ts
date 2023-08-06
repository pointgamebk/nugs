import mongoose from "mongoose";

const nugSchema = new mongoose.Schema({});

const Nug = mongoose.models.Nug || mongoose.model("Nug", nugSchema);

export default Nug;
