const Post = require("../models/Post");

exports.getAllPost = async (req, res) => {
  const posts = await Post.find({});
  res.render("index", {
    posts,
  });
};

exports.getPost = async (req, res) => {
  try {
    //fixme: single posta tıklayınca buraya iki kere giriyor.
    // let _id =
    //   req.params.id !== "null" ? req.params.id : "62c04ef37571a0dee1cf9758";
    const post = await Post.findById(req.params.id);
    // console.log(post);
    res.render("post", {
      post,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.addPost = async (req, res) => {
  await Post.create(req.body);
  res.redirect("/");
};
exports.editPost = async (req, res) => {
  try {
    let editId = req.params.id;
    const post = await Post.findOne({ _id: editId });
    res.render("edit", {
      post,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updatePost = async (req, res) => {
  try {
    let updateId = req.params.id;
    const post = await Post.findOne({ _id: updateId });
    post.title = req.body.title;
    post.description = req.body.description;
    await post.save();

    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post= await Post.findById(req.params.id);
    await post.delete();
    res.redirect("/");
    
  } catch (error) {
    console.log(error);
  }
};
