const PhotoCtrls = {};
const PhotoModels = require("../models/Photo");
const cloudinary = require("cloudinary");
const fs = require("fs-extra");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

PhotoCtrls.renderImage = async (req, res) => {
  const photos = await PhotoModels.find().lean();
  res.render("photo/image", { photos });
};

PhotoCtrls.renderFormImage = async (req, res) => {
  const photos = await PhotoModels.find().lean();
  res.render("photo/image_form", { photos });
};
PhotoCtrls.addImage = async (req, res) => {
  const { title, content } = req.body;
  const result = await cloudinary.v2.uploader.upload(req.file.path);
  const newPhoto = new PhotoModels({
    title,
    content,
    imageURL: result.url,
    public_id: result.public_id,
  });
  await newPhoto.save();
  req.flash("success_msg", "Image Saved");
  res.redirect("/addImage");
  await fs.unlink(req.file.path);
};

PhotoCtrls.deletedImage = async (req, res) => {
  const { photo_id } = req.params;
  const photo = await PhotoModels.findByIdAndDelete(photo_id);
  const result = await cloudinary.v2.uploader.destroy(photo.public_id);
  req.flash("success_msg", "Image Deleted");
  res.redirect("/addImage");
};

module.exports = PhotoCtrls;
