const mongoose=require ("mongoose");mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://anurag:Hesoyam.123@cluster0.9jqmkrm.mongodb.net/?retryWrites=true&w=majority");

const blogschema = new mongoose.Schema({//mongo
  title : String,
  vlog: String
});

const blog=mongoose.model("blog",blogschema);

//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ =require("lodash");







const vlogs=[];

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";




const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/",function(req,res){
  blog.find({},function(err,x){
    if(err)
    console.log(err);
    else
    {
      if(x.lenth==0)
      {

        const startcontent=new blog({
          title: "home starting content",
          vlog:homeStartingContent
          });
          startcontent.save();
          res.redirect("/");
      }
      else
      {
    console.log(x);
    res.render("home",{firstcontent:homeStartingContent, content:x});
      }
    }
  });

});

app.get("/about",function(req,res){
res.render("about",{  abouts:aboutContent});
});

app.get("/contact",function(req,res){
  res.render("contact",{ contacts: contactContent});
  });


app.get("/compose",function(req,res){
res.render("compose");
});


app.post("/compose",function(req,res){
const obj=new blog({
  title: req.body.title,
  vlog: req.body.blog
});
obj.save();



// db.movies.insertOne({title: req.body.title});
res.redirect("/");
});




app.get("/posts/:postname",function(req,res)
{
  var requested=_.lowerCase(req.params.postname);

  // var fit=[];
blog.find({title:requested},function(err,x){
if(err)
console.log(err);
else
{
  console.log(x);
  res.render("post",{firstcontent:"iag",content:x});
}
});
// vlogs.forEach(function(post){


  // if(requested==check)
// {
  // var obj={
  //   titles:post.titles,
  //   blog:post.blog
  // }
  // fit.push(obj);
  // console.log(fit);
  // res.render("post",{firstcontent:"iag",content:fit})
});

const port=process.env.PORT || 3000;

app.listen(port, function() {
  console.log("Server started on port 3000");
});
