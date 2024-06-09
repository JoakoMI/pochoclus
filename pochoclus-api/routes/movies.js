import express from "express";
import {
  getAllMovies,
  getMovieById,
  getMoviesByName,
  getNamesAndTypes,
} from "../data/movie.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllMovies(pageSize, page));
});

router.get("/byName/:name", async (req, res) => {
  const movieName = req.params.name;

  res.json(await getMoviesByName(movieName));
});

router.get("/byNameAndType", async (req, res) => {
  const { query, pageSize, page } = req.query;
  const result = await getNamesAndTypes(
    query,
    parseInt(pageSize),
    parseInt(page)
  );
  res.json(result);
});

router.get("/:id", async (req, res) => {
  const movieFound = await getMovieById(req.params.id);
  res.json(movieFound);
});

export default router;
