//X) front end should get list of file names.
//X) remove extension from file name 
//X) add endpoint to backend to get image by name(figure out how to include name of image in route /images/{name})
//4) front end request each image by name from backend(show image on screen)

//make array with name: URL: id:
// front end = client backend = server
//VERB GET give, POST create, PUT update, DELETE delete
// http://loot.tarkovmap.com:3000/api/v1/items

import ImageRepository from "./src/imageRepository.js";
import express from 'express';
import cors from "cors";
import path from 'path';
import {fileURLToPath} from 'url';

const app = express();
const port = 3000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//parse json using express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
global.__basedir = __dirname;

let items = [
  {
    thing: "pizza",
  },
  {
    thing: "hotdog",
  },
];

var repo = new ImageRepository();
var myImages = repo.readImageFileNames();
var workingFilePaths = repo.readImageFileNames();
var images = [];
var imagesWithFilePaths = [];

console.log(myImages);

// myImages.forEach((element, index) => {
//   element = element.replace(/\.[^/.]+$/, "");
//   var thing = {
//     item : element
//   }
//   images.push(thing);
// })

workingFilePaths.forEach((element, index) => {
  // var imageURL = repo.folderPath() + element
  var imageURL = 'http://localhost:3000/images/items/' + element
  var imageName = element.replace(/\.[^/.]+$/, "");
  var thing = {
    image: imageName,
    url : imageURL,
    id: index
  }
  images.push(thing);
})

app.get("/images", (req, res) => {
  res.json(images);
});

app.get("/imagesWithFilePaths", (req, res) => {
  res.json(imagesWithFilePaths);
});

//get api
app.get("/movie", (req, res) => {
  console.log("hello worlds");
  res.json(movies);
});

app.post("/movie", (req, res) => {
  const movie = req.body;

  console.log(movie);
  movies.push(movie);
  res.send("movie is added to list");
});

//search
app.get("/movie/:id", (req, res) => {
  const id = req.params.id;

  for (let movie of movies) {
    if (movie.id === id) {
      res.json(movie);
      console.log(movie);
      return;
    }
  }
  res.status(404).send("movie not found");
});

//remover
app.delete("/movie/:id", (req, res) => {
  const id = req.params.id;

  movies = movies.filter((movie) => {
    if (movie.id !== id) {
      return true;
    }
    return false;
  });

  res.send("movie has been deleted");
});
//listen port
app.listen(port, () => console.log(`sever listening for port ${port}`));
