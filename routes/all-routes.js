const express = require("express");
const router = express.Router();
const serivces = require("../services/all-services");

router.get("/", async function (req, res, next) {
    try {
        res.json(await serivces.getAllTaskList(req.query.page));
    } catch (err) {
        console.error(`Error while getting Task list `, err.message);
        next(err);
    }
});

module.exports = router;
