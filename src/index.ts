import { Elysia } from "elysia";

import cors from "@elysiajs/cors";
import logixlysia from "logixlysia";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import categoryRoute from "./routes/categoryRoute";
import { connectDB } from "./utils";

// Connect to MongoDB
connectDB();

const app = new Elysia()
  .use(cors())

  .use(
    logixlysia({
      config: {
        ip: true,
        customLogFormat:
          "🦊 {now} {level} {duration} {method} {pathname} {status} {message} {ip}",
        logFilter: {
          level: ["ERROR", "WARNING"],
          status: [500, 404],
          method: "GET",
        },
      },
    })
  );

//  routes
app.get("/", () => "Server is Up and Running");
categoryRoute(app);
productRoute(app);
userRoute(app);

app.listen(5000);
console.log(`🦊 Server up at ${app.server?.hostname}:${app.server?.port}`);
export type ElysiaApp = typeof app;
