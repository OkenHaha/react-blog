// ...existing code...
import { app } from "../app.js";
import { connectDB } from "../db.js";
const port = 3000;

connectDB()
  .then(() => {
    console.log("mongodb initialized");
    app.listen(port, () => console.log(`server running at ${port}`));
  })
  .catch((error) => {
    console.error("cannot connect to db", error);
  });
// ...existing code...