import { ElysiaApp } from "..";
import { createOrder, getAllOrders } from "../controllers/orderControllers";

export default (app: ElysiaApp) => {
  app
    .get("/orders", async (headers: any) => {
      return await getAllOrders(headers);
    })

    .post("/orders", async (body: any, headers: any) => {
      return await createOrder(body, headers);
    });
};
