var express = require("express");
var cors = require("cors");
var morgan = require("morgan");
var dotenv = require("dotenv");
const connectDb = require("./config/db");

//dotenv config
dotenv.config();

//DB connection
connectDb();

//rest object
var app = express();

//cors
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
//route
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/resturant", require("./routes/resturantRoutes"));
app.use("/api/v1/category", require("./routes/categoryRoutes"));
app.use("/api/v1/food", require("./routes/foodRoutes"));

app.get("/", (req, res) => {
  return res.status(200).send("<h1>Welcome to food server App</>");
});
//PORT
const PORT = process.env.PORT || 5000;
//listen
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
