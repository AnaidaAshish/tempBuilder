import { Schema, model } from "mongoose";

const templateSchema = new Schema({
  name: { type: String, required: true },
  content: { type: String, required: true },
  createdDate: { type: String, default: Date.now },
  type: { type: String, enum: ["library", "user"], default: "user" },
});

const Template = model("Template", templateSchema);

export default Template;
