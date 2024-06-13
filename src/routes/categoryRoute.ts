import { t } from "elysia";
import { ElysiaApp } from "..";
import {
  createCategory,
  getAllCategories,
  getSingleCategory,
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
    });
};
