// console.log("hello world")
const express = require("express");
const { mongoose } = require("../config/db");
const { RegistrationRouter } = require("./Route/registrationRoute");
const { LoginRouter } = require("./Route/LoginRoute");
const { verifyTokenrouter } = require("./Route/jwtRoute");
const { addCourse } = require("./addCourse");
const { searchRouter } = require("./Route/searchRoute");
const app = express();
require("dotenv/config");

app.use(express.json());
app.use('/api', RegistrationRouter);
app.use('/api', LoginRouter);
app.use("/api", verifyTokenrouter);
app.use("/api", addCourse)
app.use('/api', searchRouter);

const port = process.env.PORT || 4500;
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})


