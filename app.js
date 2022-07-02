const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require("path");
const fileUpload = require("express-fileupload"); // modülü kullanıma alıyoruz.

const Post = require("./models/Post");

const app = express();

//veri tabanı bağlanma kodu buraya
mongoose.connect("mongodb://127.0.0.1:27017/cleanblog-test-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// TEMPLATE ENGINE
app.set("view engine", "ejs");

//static dosyaların klasörünü belirtir. MIDDLEWARES
app.use(express.static("public"));
//iki önemli middleware:
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//file upload
app.use(fileUpload());

//statik html sayfası göndermek için, klasörden dosyayı buluyoruz!
//   res.sendFile(path.resolve(__dirname, "temp/index.html"));
app.get("/", async (req, res) => {
  const posts = await Post.find({});
  res.render("index", {
    posts,
  });
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/add", (req, res) => {
  res.render("add");
});
app.post("/add", async (req, res) => {
  await console.log(req.body);
  await Post.create(req.body);
  res.redirect("/");
});

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı`);
});
