import express from 'express';
import { createCollections, getCollections } from "../data/movieCollections.js";

const router = express.Router();

/*router.get('/createCollections', async (req, res) => {
	res.json(await createCollections());
});*/

router.get('/Collections', async (req, res) => {
	res.json(await getCollections());
});

export default router;