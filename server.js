import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;


// In-memory data store
let posts = [
    
];

let lastId = 0;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Write your code here//

//CHALLENGE 1: GET All posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

//CHALLENGE 2: GET a specific post by id
app.get("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

//CHALLENGE 3: POST a new post
app.post("/posts", (req, res) => {
  const newPost = {
    id: ++lastId,
    title: req.body.title,
    content: req.body.content,
    date: new Date(),
  }
  posts.push(newPost);
  console.log(posts.slice(-1));
  res.status(201).json(newPost);
});

//CHALLENGE 4: PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const idIndex = posts.findIndex((post) => post.id === id); //post to edit
  const updatePost = {
    id: id,
    title: req.body.title || posts[idIndex].title,
    content: req.body.content || posts[idIndex].content,
    date: posts[idIndex].date
  }

  posts[idIndex] = updatePost;
  res.json(updatePost);
});

//CHALLENGE 5: DELETE a specific post by providing the post id.
app.delete("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const idIndex = posts.findIndex((post) => post.id === id);
  if(idIndex > -1){
    posts.splice(idIndex, 1);
    res.json({message: "Post deleted"});
  } else {
    res
      .status(404)
      .json({error: `Post with id ${id} not found.`});
  }
  lastId--;
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
