import express from "express";
import {
  getAllMovies,
  getMovieById,
  getNamesAndTypes,
  getDirectorByName,
  getActorByName,
  getMoviesByActorName,
  getMoviesByDirectorName,
  getMoviesPersonByName,
} from "../data/movie.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllMovies(pageSize, page));
});

router.get("/actor/:name", async (req, res) => {
  const actorName = req.params.name;

  res.json(await getActorByName(actorName));
});

router.get("/director/:name", async (req, res) => {
  const directorName = req.params.name;

  res.json(await getDirectorByName(directorName));
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
// solo Actor
router.get("/actorMovie/:actorName", async (req, res) => {
  const actorName = req.params.actorName;

  res.json(await getMoviesByActorName(actorName));
});

// solo Director
router.get("/directorMovie/:directorName", async (req, res) => {
  const directorName = req.params.directorName;

  res.json(await getMoviesByDirectorName(directorName));
});

// solo Actor y Director
router.get("/personByName/:ByName", async (req, res) => {
  const personName = req.params.ByName;

  res.json(await getMoviesPersonByName(personName));
});

router.get("/:id", async (req, res) => {
  const movieFound = await getMovieById(req.params.id);
  res.json(movieFound);
});

export default router;
