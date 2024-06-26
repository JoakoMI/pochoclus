import express from "express";
import {
  getAllMovies,
  getMovieById,
  getNamesAndTypes,
  getMoviesPersonByName,
  getByName,
} from "../data/movies.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllMovies(pageSize, page));
});

router.get("/person/:name", async (req, res) => {
  const personName = req.params.name;

  res.json(await getByName(personName));
});

router.get("/byNameAndType", async (req, res) => {
  const { query = "", pageSize, page } = req.query;
  const result = await getNamesAndTypes(
    query,
    parseInt(pageSize),
    parseInt(page)
  );
  res.json(result);
});

// solo Actor y Director
router.get("/moviesByPerson/:ByName", async (req, res) => {
  const personName = req.params.ByName;

  res.json(await getMoviesPersonByName(personName));
});

router.get("/:id", async (req, res) => {
  const movieFound = await getMovieById(req.params.id);
  res.json(movieFound);
});

export default router;
