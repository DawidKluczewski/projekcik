const express = require("express");
const app = express();
const port = 8002;
const bodyParser = require("body-parser");
const router = require("./router");
const router1 = require("./router1");
const router2 = require("./router2");
const router3 = require("./router3");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.json({message: "O dziwo nasz serwer działa"});
});

app.use("/klienci", router);
app.use("/samochody", router1);
app.use("/wypozyczenia", router2);
app.use("/specyfikacje_samochodu", router3);

app.use((err, req, res, next) =>{
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({message: err.message});
    return;
})

app.listen(port, () => {
    console.log('Serwer działa na http://localhost:8002/');
});