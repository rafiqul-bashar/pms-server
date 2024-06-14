import Product from "../models/productModel";
import { verifyToken } from "../utils";

export const createProduct = async (body: any, headers: any) => {
  const { success, message } = await verifyToken(headers);
  if (success) {
    try {
      const newProduct = new Product(body);
      await newProduct.save();
      return newProduct;
    } catch (error) {
      console.error("Error creating Products:", error);
      throw error;
    }
  }
  return message;
};

export const getAllProducts = async () => {
  try {
    const products = await Product.find({});
    return products;
  } catch (error) {
    console.error("Something went wrong!!", error);
    throw error;
  }
};
export const getSingleProduct = async (params: any) => {
  try {
    const product = await Product.findById(params.id).populate(
      "category",
      "name"
    );

    return product;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateProduct = async (params: any, headers: any, body: any) => {
  const { success, message } = await verifyToken(headers);
  if (success) {
    try {
      const updatedProduct = await Product.findOneAndUpdate(
        { _id: params.id },
        body,
        {
          new: true,
        }
      );
      return updatedProduct;
    } catch (error) {
      console.log(error);
    }
  }
  return message;
};

export const deleteProduct = async (headers: any, params: any) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(params?.id);
    if (!deletedProduct) {
      // Handle case where product with given ID was not found
      return "Product not found!!";
    }
    return "Product deleted successfully.";
  } catch (error) {
    console.log(error);
    throw error;
  }
};
