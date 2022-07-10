const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require("path");
const methodOverride = require('method-override');
const fileUpload = require("express-fileupload"); // modülü kullanıma alıyoruz.

const Post = require("./models/Post");
const postController = require("./controller/postController");
const pageController = require('./controller/pageController');

//init express
const app = express();

//veri tabanı bağlanma kodu buraya
mongoose.connect("mongodb://127.0.0.1:27017/cleanblog-test-db");
// , {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }
// );

// TEMPLATE ENGINE
app.set("view engine", "ejs");

//static dosyaların klasörünü belirtir. MIDDLEWARES
app.use(express.static("public"));
//üç önemli middleware:
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

//file upload
app.use(fileUpload());

//statik html sayfası göndermek için, klasörden dosyayı buluyoruz!
//   res.sendFile(path.resolve(__dirname, "temp/index.html"));
app.get("/", postController.getAllPost);
app.get("/about", pageController.getAboutPage);
//add pages
app.get("/add", pageController.getAddPage);
app.post("/add",postController.addPost);
app.get('/posts/edit/:id', postController.editPost);
app.get("/posts/:id", postController.getPost);
app.put('/posts/:id',postController.updatePost);
app.delete('/posts/:id', postController.deletePost);

app.get("*",pageController.notFoundPage);

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı`);
});
