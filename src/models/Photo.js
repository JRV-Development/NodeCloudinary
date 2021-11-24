const { Schema, model } = require("mongoose");

const PhotoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      default: "",
    },
    public_id: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Photo", PhotoSchema);
