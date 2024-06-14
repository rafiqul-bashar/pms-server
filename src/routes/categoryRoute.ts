import { t } from "elysia";
import { ElysiaApp } from "..";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
} from "../controllers/categoryController";

export default (app: ElysiaApp) => {
  app
    .get("/categories", async () => {
      return await getAllCategories();
    })
    .get("/categories/:slug", async ({ params }) => {
      return await getSingleCategory(params);
    })
    .post("/categories", async (body: any, headers: any) => {
      return await createCategory(body, headers);
    })
    .put("/categories/:id", async (body: any, headers: any, params: any) => {
      return await updateCategory(body, headers, params);
    })
    .delete("/categories/:id", async (headers: any, params: any) => {
      return await deleteCategory(headers, params);
    });
};
