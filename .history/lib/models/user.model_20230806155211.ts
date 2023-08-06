import mongoose from "mongoose";

const userScheme = new mongoose.Schema({
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
});
