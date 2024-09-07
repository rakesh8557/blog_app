const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const Blog = require("../models/blog");
const Comment = require("../models/comment");

const routes = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads/`));
    },
    filename: function (req, file, cb) {
      const filename = `${Date.now()}-${file.originalname}`;
      cb(null, filename);
    }
  })

  const upload = multer({ storage: storage })

routes.get("/addblog", (req,res) => {
    return res.render("addblog", {
        user : req.user
    });
})

routes.post("/", upload.single('coverimage'), async (req,res) => {
    const { title, body} = req.body;
    const blog = await Blog.create({
        body : body,
        title : title,
        coverImage : `/uploads/${req.file.filename}`,
        createdBy : req.user.id
    })
    return res.redirect(`blog/${blog._id}`);
})

routes.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const comments = await Comment.find({blogId : req.params.id}).populate("createdBy");
  
  return res.render("blog", {
    user : req.user,
    blog,
    comments
  })
})

routes.post("/comment/:blogId", async (req, res) => {
   await Comment.create({
    content : req.body.content,
    blogId : req.params.blogId,
    createdBy : req.user.id
  })

  return res.redirect(`/blog/${req.params.blogId}`)

})
module.exports = routes;