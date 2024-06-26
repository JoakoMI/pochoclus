import express from "express";
import { createCollections, getCollections , getCollectionByTitle} from "../data/movieCollections.js";

const router = express.Router();
/*
router.get('/create', async (req, res) => {
	res.json(await createCollections());
});*/

router.get("/", async (req, res) => {
  res.json(await getCollections());
});

router.get("/:title", async (req, res) => {
  const carrusel = req.params.title
  res.json(await getCollectionByTitle(carrusel));
});

export default router;
