const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// We want to create a model, County.
// County should have a name, a state, a list of ruins, and a SVG path.
// Neighbors should be an array list of countyId
// Each county will have an ID
const CountySchema = new Schema({
  countyId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  ruins: [
    {
      type: Schema.Types.ObjectId,
      ref: "Ruin",
    },
  ],
  svgPath: {
    type: String,
    required: true,
  },
  neighbors: [
    {
      type: String,
      ref: "County",
    },
  ],
});

const County = mongoose.model("County", CountySchema);

module.exports = County;
