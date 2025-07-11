var express = require('express');
var router = express.Router();
const userModel = require("./users");
const postmodel = require("./posts");
const localStrategy = require("passport-local");
const passport = require('passport');
passport.use(new localStrategy(userModel.authenticate()));
const upload = require("./multer")

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', function (req, res, next) {
  res.render('login', { error: req.flash('error') }); 
});

router.get('/profile', isLoggedIn ,async function (req, res, next) {
  const user = await userModel.findOne({
    username : req.session.passport.user
  })
  .populate("posts")
  console.log(user);
  res.render("profile" ,{user})
});

router.post('/register', async function (req, res) {
  const { username, email, fullname, password } = req.body;

  try {
    const user = new userModel({
      username,
      email,
      fullName: fullname
    });

    await userModel.register(user, password); // This throws if username exists

    passport.authenticate("local")(req, res, function () {
      res.redirect("/profile");
    });
  } catch (err) {
    console.log("Registration Error:", err.message);
    req.flash("error", "Registration failed: " + err.message);
    res.redirect("/register");
  }
});
router.get('/register', function (req, res, next) {
  res.render('index', { error: req.flash('error') }); 
});


router.post('/login',passport.authenticate("local",{
  successRedirect: "/profile",
  failureRedirect: "/login",
  failureFlash:true,
}), function (req, res) {

});



router.get("/logout",function(req,res){
  req.logOut(function(err){
    if(err){ return next(err);}
    res.redirect("/");
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

router.get("/feed", function(req,res){
  res.render("feed", {title: "Feed"});
})
router.get("/posts", function(req,res){
  res.render("post", {title: "Post"});
})

router.post("/upload",isLoggedIn, upload.single("file"),async function(req,res){
  if(!req.file){
    res.status(404).send("no files were given");

  }


  const user = await userModel.findOne({username : req.session.passport.user})
  const post =  await postmodel.create({
    image: req.file.filename,
    imageText: req.body.filecaption,
    user: user._id
  })
  user.posts.push(post._id);
  await user.save();
  res.redirect("/profile");

  // jo file upload hui hai use save kro as a post and uska post id user ko do and post ko user ko do 
})



module.exports = router;
