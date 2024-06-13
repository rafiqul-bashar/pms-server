import { t } from "elysia";
import { ElysiaApp } from "..";
import {
  createProduct,
  getAllProducts,
} from "../controllers/productController";

export default (app: ElysiaApp) => {
  app
    .get("/products", async () => {
      return await getAllProducts();
    })
    .get(
      "/products/:id",
      async ({ params: { id }, set }: any) => `product no ${id}`
    )
    .post("/products", async (body: any) => {
      try {
        return await createProduct(body);
      } catch (error) {
        throw error;
      }
    });
};
