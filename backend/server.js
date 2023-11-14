const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieparser = require("cookie-parser");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const errorHandler = require("./middleware/errorMiddleware");
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://Shopito.vercel.app",
      "http://localhost:3001",
    ],
    credentials: true,
  })
);

// ROUTES
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);

app.get("/", (req, res) => {
  res.send("Home Page ...");
});

// error middleware
app.use(errorHandler);
const PORT = process.env.PORT || 8000;

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
