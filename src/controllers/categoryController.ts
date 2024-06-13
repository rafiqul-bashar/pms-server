import Category from "../models/categoryModel";
import { verifyToken } from "../utils";

export const createCategory = async (body: any, headers: any) => {
  const { success, message } = await verifyToken(headers);
  if (success) {
    try {
      const newCategory = new Category(body);
      await newCategory.save();
      return newCategory;
    } catch (error) {
      console.error("Error creating Category:", error);
      throw error;
    }
  }
  return message;
};

export const getAllCategories = async () => {
  try {
    const categories = await Category.find({});
    return categories;
  } catch (error) {
    console.error("Something went wrong!!", error);
    throw error;
  }
};
export const getSingleCategory = async (params: any) => {
  try {
    const catagory = await Category.find({ name: params.slug }).populate(
      "products"
    );
    if (catagory.length === 0) {
      return "No category found in this name!";
    }
    return catagory;
  } catch (error) {
    console.log(error);
  }
};
