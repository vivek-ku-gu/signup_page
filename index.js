const express = require("express");
const request = require("request");
const bodyparser =require("body-parser");
const { json } = require("body-parser");
const app = express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));

app.get("/",function(req,res){
res.sendFile(__dirname +"/index.html");
});
app.post("/",function(req ,res){
var fname=req.body.fname;
var lname=req.body.lname;
var email=req.body.email;
var data ={
    members:[{email_address: email ,status:"subscribed",merge_fields:{FNAME:fname,LNAME:lname}}]
};
var jsondata=JSON.stringify(data);
var option ={
    url:"https://us10.api.mailchimp.com/3.0/lists/6a1d432c84",
method:"POST",
headers:{"Authorization":"vivek 926b3c89991e791b5398c0d23fbd4f89"},
   body:jsondata
}
request(option,function(error,response,body){
    if(error){
        console.log(error);}
        else{
    console.log(response.statusCode);
        }
    });
});
app.listen(process.env.PORT||3000,function(){
    console.log("server is running on port no 3000");
});
//926b3c89991e791b5398c0d23fbd4f89-us10
//6a1d432c84