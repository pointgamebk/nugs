import mongoose from "mongoose";

const nugSchema = new mongoose.Schema({
  text: { type: String, required: true },
});

const Nug = mongoose.models.Nug || mongoose.model("Nug", nugSchema);

export default Nug;
