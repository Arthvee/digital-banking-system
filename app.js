const express = require("express");
// implementing environmental variables
require("dotenv").config();
const app = express();

app.use(express.json());// middleware

const bvnRoute = require("./Routes/bvn-route");
const accountRoute = require("./Routes/account-route");
const transferRoute = require("./Routes/transfer-route");
const transactionRoute = require("./Routes/transaction-route");
const ninRoute = require("./Routes/nin-route");
const authRoute = require("./Routes/auth-route");



app.use("/api/account", accountRoute);

app.use("/api/bvn", bvnRoute);
app.use("/api/transfer", transferRoute);
app.use("/api/transaction", transactionRoute);
app.use("/api/nin", ninRoute);
app.use("/api/auth", authRoute);

const connectDB = require("./Config/databaseConfig");
connectDB(); //connect to mongodb


app.listen(process.env.PORT, () => {
    console.log(`Server running on port:${process.env.PORT}`);
});