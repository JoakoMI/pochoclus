import "dotenv/config";
import express from "express";
import moviesRouter from "./routes/movies.js";
import movieCollectionsRouter from "./routes/movieCollections.js";
import usersRouter from "./routes/users.js";
import cors from "cors";

const PORT = process.env.PORT;
const app = express();

const corsOptions = {
  origin: "http://localhost:3000", // URL del frontend
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/movies", moviesRouter);
app.use("/api/movieCollections", movieCollectionsRouter);
app.use("/api/users", usersRouter);

app.listen(PORT, () => {
  console.log("Servidor Web en el puerto:", PORT);
});
