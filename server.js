var express = require("express");
var app = express();
app.set('views', __dirname + '/views'); 

app.set('view engine', 'ejs');
//require body-parser
var bodyParser = require('body-parser');
// use it!

app.use(bodyParser.urlencoded({extended: true}));
var FormDataGlobal = {};
app.get('/',function(request,response){
	
	
	response.render('index');
})

// app.get('/second', function (req, res){
//      console.log("POST DATA \n\n", req.body)
//     FormDataGlobal = req.body;

//     res.render('chatpage');
// });

// app.get('/Submitted',function(req, res){
	
// 	res.render('chatpage');
// });
app.post('/goback', function (req, res){
    

    res.redirect('/')
});

var server = app.listen(8000,function(){
	console.log("listening on port 8000");
	
})
var chathistory = {name:[],chatcontent:[]};
var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
	
  console.log("Client/socket is connected!");
  console.log("Client/socket id is: ", socket.id);
 // all the server socket code goes in here
	  socket.on( "a_new_user_login", function (data){
	    //console.log("can i get FormDataGlobal here? "+data.name);
	    console.log(data.name);
	    chathistory.name.push(data.name);
	     io.emit( 'username_fromserver',{username:chathistory.name,usermessage:chathistory.chatcontent});
	     //socket.emit('random_number',{passrandom: Math.floor(Math.random()*100)});
	})
	  socket.on("user_send_message",function(data){
	  	 chathistory.name.push(data.name);
	  	chathistory.chatcontent.push(data.usermessage);
	  	io.emit('messageTwo_fromserver',{username:chathistory.name[chathistory.name.length-1],usermessage:chathistory.chatcontent[chathistory.chatcontent.length-1]});
	  })

})