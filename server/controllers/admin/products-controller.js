const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ message: "Error uploading image" });
  }
};

// add a new product
const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;
    const newlyCreatedProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });
    await newlyCreatedProduct.save();
    res
      .status(201)
      .json({ message: "Product added successfully", success: true, data: newlyCreatedProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Error adding product", success: false });
  }
};

// fetch all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({data: products, success: true });
  } catch (error) {
    console.error("Error fetching products:", error);
    res
      .status(500)
      .json({ message: "Error fetching products", success: false });
  }
};

// edit a product
const editProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found", success: false });
    }
    res.json({data: product, success: true });
  } catch (error) {
    console.error("Error editing product:", error);
    res.status(500).json({ message: "Error editing product", success: false });
  }
};
// video at 4:07:30
// delete a product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found", success: false });
    }
    res.json({ message: "Product deleted successfully", success: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Error deleting product", success: false });
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  getAllProducts,
  editProduct,
  deleteProduct,
};
