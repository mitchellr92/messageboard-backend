const express = require("express");
const cors = require("cors");
const knex = require("knex");
const dbConfig = require("./knexfile");
const db = knex(dbConfig.development);

const server = express();

server.use(express.json());
server.use(cors());

server.get("/api/posts", (req, res) => {
  db("posts")
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to load posts" });
    });
});

server.post("/api/posts", (req, res) => {
  const newPost = req.body;

  if (newPost.title && newPost.body) {
    db("posts")
      .insert(newPost)
      .then(postId => {
        res.status(200).json(postId);
      })
      .catch(err => {
        res.status(500).json({ message: "Failure to create post" });
      });
  } else {
    res.status(400).json({ message: "Missing title or body" });
  }
});

server.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;

  db("posts")
    .where({ id })
    .del()
    .then(posts => {
      res.status(201).json("Post has been deleted");
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to delete post" });
    });
});

server.put("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const postEdit = req.body;

  if (postEdit.title && postEdit.body) {
    db("posts")
      .where({ id })
      .update(postEdit)
      .then(posts => {
        res.status(200).json("Post has been updated");
      })
      .catch(err => {
        res.status(500).json({ message: "Failed to update post" });
      });
  } else {
    res.status(400).json({ message: "Missing title or body" });
  }
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
