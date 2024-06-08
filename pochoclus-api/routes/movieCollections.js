import express from "express";
import { createCollections, getCollections } from "../data/movieCollections.js";

const router = express.Router();

/*router.get('/create', async (req, res) => {
	res.json(await createCollections());
});*/

router.get("/", async (req, res) => {
  res.json(await getCollections());
});

export default router;
