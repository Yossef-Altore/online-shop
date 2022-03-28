const express = require("express");
require("./connectToDb/connectToDB");
const cors = require("cors");
const port = 8181;
const app = express();
const adminRouter = require("./routes/admin/adminRouter");
const productsRouter = require("./routes/products/products");
const registerRouter = require("./routes/users/registerRouter");
const loginRouter = require("./routes/users/loginRouter");
const basketRouter = require("./routes/basketList/basketListRouter");
const isTokenCorrect = require("./routes/users/isTokenCorrect");
app.use(cors());
app.use(express.json());
app.use(isTokenCorrect);
app.use(adminRouter);
app.use(productsRouter);
app.use(registerRouter);
app.use(loginRouter);
app.use(basketRouter);

app.listen(port, () => {
  console.log("listening on port " + port);
});
