import getConnection from "../data/connection.js";
import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
    await getConnection();
    res.json("");
});

export default router;