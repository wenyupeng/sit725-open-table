const express = require("express");
const router = express.Router();

router.get("/login", (_, res) => res.render());
router.get("/", async (_, res) => res.render("./home/home"));
