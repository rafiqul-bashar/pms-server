import Order from "../models/orderModel";
import { verifyToken } from "../utils";

export const createOrder = async (body: any, headers: any) => {
  const { success, message } = await verifyToken(headers);
  if (success) {
    try {
      const newOrder = new Order(body);
      await newOrder.save();
      return newOrder;
    } catch (error) {
      console.error("Error creating Products:", error);
      throw error;
    }
  }
  return message;
};

export const getAllOrders = async (headers: any) => {
  const userId = new URL(headers?.url).searchParams.get("userId");

  const { success, message } = await verifyToken(headers);
  if (success) {
    try {
      const orders = await Order.find({
        $or: [
          { user: userId }, // Orders where the user is the buyer
          { seller: userId }, // Orders where the user is the seller
        ],
      })
        .populate("user", "name")
        .populate("seller", "name")
        .populate("product");
      return orders;
    } catch (error) {
      console.error("Error creating Products:", error);
      throw error;
    }
  }
  return message;
};
