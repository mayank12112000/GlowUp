import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config({ path: "/.env" });
console.log("PORT from .env:", process.env.PORT);

app.listen(process.env.PORT || 8080, () => {
  console.log("server is running at port:", process.env.PORT || 8080);
});
