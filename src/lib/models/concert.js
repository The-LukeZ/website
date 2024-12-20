import { model, Schema } from "mongoose";

const concertSchema = new Schema({
  name: { type: String, required: true },
  link: { type: String, required: true },
  date: { type: Date, required: true, unique: true },
  location: { type: Schema.Types.ObjectId, required: true },
});

const Concert = model("Concert", concertSchema, "concerts");

export { concertSchema, Concert };
