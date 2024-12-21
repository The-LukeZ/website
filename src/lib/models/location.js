import { model, Schema } from "mongoose";

const locationSchema = new Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  province: { type: String, required: true },
  country: { type: String, required: true },
});

locationSchema.index({ address: 1, city: 1, postalCode: 1, province: 1, country: 1 }, { unique: true });

/**
 * @type {import("mongoose").Model}
 */
let Location;
try {
  Location = model("Location");
} catch {
  Location = model("Location", locationSchema, "locations");
}

export { locationSchema, Location };
