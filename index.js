import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
var titleArray = [];
var contentArray = [];
var createCount = 0;
const formData = new FormData();
const API_URL = "http://localhost:4000";

//function deleteListener (){
    //for(var i = 0; i < titleArray.length; i++){
    //console.log("I am in here.");
    //$(".delete-btn")[i].addEventListener("click", function(){
    //var buttonInnerHtml = this.innerHTML;
    //titleArray.remove(buttonInnerHtml);
    //contentArray.remove(buttonInnerHtml);
  //});
//}
//}

/* app.get("/", (req, res) => {
    res.render("index.ejs", {
        titles: titleArray,
        numberOfTitles: titleArray.length
    });
}); */ //old get

app.get("/", async (req, res) => { //new get with API
    try {
        const response = await axios.get(`${API_URL}/posts`);
        console.log(response);
        res.render("index.ejs", {
            posts: response.data
        });
      } catch (error) {
        res.status(500).json({ message: "Error fetching posts" });
      }
});

app.get("/read", async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}/posts`);
        console.log(response);
        res.render("read.ejs", {
            posts: response.data
        });
      } catch (error) {
        res.status(500).json({ message: "Error fetching posts" });
      }
});

/* app.get("/edit", (req, res) => {    
    res.render("edit.ejs", {
        titles: titleArray,
        numberOfTitles: titleArray.length,
        contents: contentArray
    });
}); */

app.get("/edit", async (req, res) => {    
    try {
        const response = await axios.get(`${API_URL}/posts`);
        console.log(response);
        res.render("edit.ejs", {
            posts: response.data
        });
      } catch (error) {
        res.status(500).json({ message: "Error fetching posts" });
      }
});

app.get("/edit2/:id", async (req, res) => {

    try {
      const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
      const response2 = await axios.get(`${API_URL}/posts`);
      console.log(response.data);
      res.render("edit2.ejs", {
        post: response.data,
        posts: response2.data
      });
    } catch (error) {
      res.status(500).json({ message: "Error fetching post" });
    }
  });

/* app.patch("/update", (req,res) => {
    titleArray[createCount] = req.body["blogTitle"];
    contentArray[createCount] = req.body["blogText"];
    createCount++;
    res.render("index.ejs", {
        titles: titleArray,
        numberOfTitles: titleArray.length
      });
}); */

// Partially update a post
app.post("/update/:id", async (req, res) => {
    console.log("called");
    try {
      const response = await axios.patch(
        `${API_URL}/posts/${req.params.id}`,
        req.body
      );
      console.log(response.data);
      res.redirect("/edit");
    } catch (error) {
      res.status(500).json({ message: "Error updating post" });
    }
  });

app.get("/create", (req, res) => {
    res.render("create.ejs");
});

/* app.get("/edit2", (req,res) => {
    console.log("I am trying to edit");
    res.render("edit2.ejs", {
        titles: titleArray,
        numberOfTitles: titleArray.length,
        contents: contentArray
      });
}); */

app.get("/edit2", async (req,res) => {
    try {
        const response = await axios.get(`${API_URL}/posts`);
        console.log(response);
        res.render("edit2.ejs", {
            posts: response.data
        });
      } catch (error) {
        res.status(500).json({ message: "Error fetching posts" });
      }
});

/* app.post("/submit", (req,res) => {
    titleArray[createCount] = req.body["blogTitle"];
    contentArray[createCount] = req.body["blogText"];
    createCount++;
    res.render("index.ejs", {
        titles: titleArray,
        numberOfTitles: titleArray.length
      });
      
}); */

app.post("/create", async (req,res) => {
    try{
        const response = await axios.post(`${API_URL}/posts`, req.body);
        console.log(response.data);
        res.redirect("/");
    } catch (error) {        
        res.status(500).json({ message: "Error creating post" });
    }
});

/* app.post("/delete", (req,res) => {
    titleArray.splice(0,titleArray.length);
    contentArray.splice(0,contentArray.length);
    createCount = 0;
    console.log(req.body);
    res.render("edit.ejs", {
        titles: titleArray,
        numberOfTitles: titleArray.length,
        contents: contentArray
    }); 
}); */

// Delete a post
app.get("/delete/:id", async (req, res) => {
    try {
      await axios.delete(`${API_URL}/posts/${req.params.id}`);
      res.redirect("/");
    } catch (error) {
      res.status(500).json({ message: "Error deleting post" });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    
});


