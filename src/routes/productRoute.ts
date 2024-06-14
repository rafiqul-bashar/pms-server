import { ElysiaApp } from "..";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "../controllers/productController";

export default (app: ElysiaApp) => {
  app
    .get("/products", async () => {
      return await getAllProducts();
    })
    .get("/products/:id", async ({ params }) => {
      return await getSingleProduct(params);
    })
    .post("/products", async (body: any, headers: any) => {
      return await createProduct(body, headers);
    })
    .put("/products/:id", async (body: any, headers: any, params: any) => {
      return await updateProduct(body, headers, params);
    })
    .delete("/products/:id", async (headers: any, params: any) => {
      return await deleteProduct(headers, params);
    });
};
