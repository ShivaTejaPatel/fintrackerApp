const express = require("express");
const userRoute = require("./users.route");
const alertsRoute = require("./alerts.route");
const currencyRoute = require('./currency.route');

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
        path: "/currencies",
        route: currencyRoute,
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;