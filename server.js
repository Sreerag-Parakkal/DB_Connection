const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 4000;


    app.use(express.urlencoded({extended:true}));

    mongoose.connect('mongodb://127.0.0.1:27017/notes_DB_Connection',{useNewUrlParser:true},{useUnifiedTopology:true})
    .then((data)=>console.log(`Database connected with ${data.connection.host}`))
    .catch((err)=>console.log(err.message));

    const postSchema = new mongoose.Schema({
        name : String,
        password : String
    })

    let Post = mongoose.model('Post',postSchema);


    app.get('/',(req,res)=>{
        res.sendFile(__dirname + '/index.html');

    })

    app.post('/',(req,res)=>{

        console.log(req.body);

        let newPost = new Post({
            name:req.body.name,
            password:req.body.password
        });
        newPost.save();
        
        res.send("Form Submitted!!")
    })

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});
