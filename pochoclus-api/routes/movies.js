import express from 'express';
import { getAllMovies } from '../data/movie.js';

const router = express.Router();

router.get('/', async (req, res) => {
	const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
	const page = req.query.page ? parseInt(req.query.page) : 0;

	res.json(await getAllMovies(pageSize, page));
});

export default router;
