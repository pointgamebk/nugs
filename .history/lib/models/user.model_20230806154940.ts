import mongoose from "mongoose";

const userScheme = new mongoose.Schema({
  id: { type: String, required: true },
});
