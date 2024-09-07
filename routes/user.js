const { Router } = require("express");
const User = require("../models/user");
const routes = Router();
const { createHmac } = require("crypto");
const { createToken } = require("../services/authentication");

routes.route("/signup")
    .get((req, res) => {
        return res.render("signup");
    })
    .post(async (req, res) => {
        const { fullname, email, password } = req.body;
        await User.create({
            fullname,
            email,
            password,
        });
        return res.redirect("/");
    })

routes.route("/signin")
    .get((req, res) => {
        return res.render("signin");
    })
    .post(async (req, res) => {
        const { email, password } = req.body;

        const user = await User.findOne({email});
        if(!user) return res.status(404).end("No user with this email exists");

        const salt = user.salt;
        const hashPass = createHmac('sha256', salt).update(password).digest("hex");

        if(user.password === hashPass) {
            const token = createToken(user);
            res.cookie("token", token).redirect("/");
        } else {
           return res.render("signin", {
            error : "Invalid credentails"
           })
        }
    })

routes.get('/logout', (req, res) => {
    return res.clearCookie("token").redirect("/");
})


module.exports = routes;