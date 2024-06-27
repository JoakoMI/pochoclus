import express from "express";
import { createCollections, getCollections , getCarrusel} from "../data/movieCollections.js";

const router = express.Router();

router.get('/create', async (req, res) => {
	res.json(await createCollections());
});

router.get("/", async (req, res) => {
  res.json(await getCollections());
});

router.get("/carrusel", async (req, res) => {
  res.json(await getCarrusel());
});

export default router;
