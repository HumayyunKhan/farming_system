const express = require("express");
const userrouter = require("./Routers/userRouter");
const vendorRouter = require("./Routers/vendorRouter");
const {db}=require("./Database/DatabaseConnection")
const path=require("path")

const app = express();
const cors = require("cors");
const {
  errorHandler,
  notFound,
} = require("../backend/middlewares/errorMiddleware");
const PORT = process.env.PORT || 1783;

app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);
app.use(express.json());
// app.use(express.static("public"))

// Define routes
app.use("/api", userrouter);
app.use("/api/vendor", vendorRouter);
app.use('/uploads', express.static(path.join(__dirname, './public/Images')));  

 
//Error Handlers
app.use(notFound);
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
