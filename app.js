//import express
const express = require("express");
const { db } = require("./utils/database.utils");
const { Usersrouters } = require("./routes/users.routers");
const { Restaurantsrouters } = require("./routes/restaurants.routers");
const { Mealsrouters } = require("./routes/meals.routers");
const { Ordersrouters } = require("./routes/oders.routers");

//initialitate express
const app = express();
app.use(express.json());

app.use("/api/v1/users", Usersrouters);
app.use("/api/v1/restaurants", Restaurantsrouters);
app.use("/api/v1/meals", Mealsrouters);
app.use("/api/v1/orders", Ordersrouters);

db.authenticate()
  .then(() => console.log("conexion exitosa"))
  .catch(() => console.log("conexion bd incorrecta"));

db.sync()
  .then(() => console.log("sync exitosa"))
  .catch(() => console.log("sync bd incorrecta"));

// listen port
app.listen(4000, console.log("express runing.."));
