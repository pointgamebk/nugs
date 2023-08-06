import mongoose from "mongoose";

const nugSchema = new mongoose.Schema({
  id: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: String,
  bio: String,
  nugs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Nug",
    },
  ],
  onboarded: {
    type: Boolean,
    default: false,
  },
  communities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
    },
  ],
});

const Nug = mongoose.models.Nug || mongoose.model("Nug", nugSchema);

export default Nug;
