const express = require("express");
const URL = require("../models/url.js");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const allUrls = await URL.find({});
        res.render("home", { urls: allUrls });
    } catch (error) {
        console.error("Error fetching URLs:", error);
        res.status(500).send("Internal Server Error");d
    }
});

router.get("/signup", (req,res)=>{

})



module.exports = router;
