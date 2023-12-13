import express from "express";
import morgan from "morgan";
import nunjucks from "nunjucks";
import session from "express-session";

const app = express();

//MIDDLE WARE
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }))
app.use(session({
    secret: "somerandomstring",
    saveUninitialized: true,
    resave: false,
}));

nunjucks.configure("views",{
    autoescape: true,
    express: app
});

//routes--------------
app.get("/", (req, res) => {
    if (req.session.email){
        res.render("dashboard.html", {email : req.session.email});
    } else {
        res.render("home.html")
    }
});

app.post("/login", (req, res) => {
    const {email, password} = req.body;
    req.session.email = email;
    req.session.password = password;

    console.log(req.session);

    res.render("dashboard.html", { email, password });
});

app.get("/logout", (req, res) => {
    req.session.destroy((err) =>{
       if(err){
        console.log(err)
       } else {
        res.redirect("/");
       }
    })
});




app.listen(8080, () =>{
    console.log('Server is up on port 8080!')
})

