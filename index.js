const express = require("express");
const path = require("path");
const connectToDb = require("./db_conn");
const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middlewares/authentication");
const Blog = require("./models/blog");

const app = express();
const port = 8000;

connectToDb();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({extended:false}))
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

app.use("/user", userRouter);
app.use("/blog", blogRouter);

app.get("/", async (req, res) => {
    const allBlogs = await Blog.find();
    return res.render("home", {
        user: req.user,
        blogs: allBlogs
    });
})

app.listen(port, () => {
    console.log(`server started at ${port}`);
})