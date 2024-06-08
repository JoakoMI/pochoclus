import express from "express";
import { getAllMovies, getMovieById, getMoviesByName } from "../data/movie.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllMovies(pageSize, page));
});

router.get("/byName", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getMoviesByName(pageSize, page));
});

router.get("/:id", async (req, res) => {
  const movieFound = await getMovieById(req.params.id);
  res.json(movieFound);
});

export default router;
