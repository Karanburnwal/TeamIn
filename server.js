const express=require('express')
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app=express();

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));


mongoose.connect(`mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASS}@cluster0.p32px.mongodb.net/emaildb` ,{useNewUrlParser:true, useUnifiedTopology: true}).catch(err => console.log(err)) ;
const db = mongoose.connection;
db.once('open', () => console.log('Successfully connected to MongoDB'));
db.on('error', (e) => console.log(e));

const emailSchema = new mongoose.Schema({
    emailid:String
})
const Email = mongoose.model('Email',emailSchema)

app.get('/',function(req,res){
    res.sendFile(__dirname+'/Home.html');
})
app.post('/submit',function(req,res){
    console.log(req.body.email);
    const email = new Email({
        emailid:req.body.email
    })
    email.save();
    res.sendFile(__dirname+'/submit.html')
})


let port = process.env.PORT;
if(port ==null || port==""){
    port=3000;
}
app.listen(port,function(){
    console.log('server running at 3000');
})
