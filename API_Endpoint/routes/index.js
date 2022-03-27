'use strict'
/*index.js houses all of the subpages for the entire web application*/
const router = require("express").Router(),
    userRoutes = require("./userRoutes"),
    apiRoutes = require("./apiRoutes"),
    homeRoutes = require("./homeRoutes"),
    errorRoutes = require("./errorRoutes");
    

router.use("/users", userRoutes);
router.use("/api", apiRoutes);
router.use("/", homeRoutes);
router.use("/", errorRoutes);

module.exports = router;