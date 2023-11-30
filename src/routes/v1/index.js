const express = require("express");
const userRoute = require("./users.route");
const config = require("../../config/config");
const alertsRoute = require("./alerts.route");
const transactionRoute = require("./transaction.route");
const currencyRoute = require("./currency.route");


const router = express.Router();

const defaultRoutes = [{
        path: "/users",
        route: userRoute,
    },
    {
        path: "/alerts",
        route: alertsRoute,
    },
    {
        path: "/transactions",
        route: transactionRoute,
    },
    {
        path: "/currencies",
        route: currencyRoute,
    }
 
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;