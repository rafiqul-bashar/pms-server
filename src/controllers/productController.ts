import Product from "../models/productModel";

export const getAllProducts = async () => {
  try {
    return await Product.find()
      .sort({ createdAt: "desc" })
      .populate("categories", "name");
  } catch (error) {
    console.error("Something went wrong!!", error);
    return [];
  }
};

export const createProduct = async ({ body }) => {
  try {
    const newUser = new Product({ ...body });
    await newUser.save();
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
