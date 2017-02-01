var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/peopleSchema');

var schema = mongoose.Schema;

var peopleSchema = new schema({
	name : String,
	role : String,
	contact : Number,
	addr : String
});

mongoose.model('peopleinfos',peopleSchema);

var Info = mongoose.model('peopleinfos');

//add an entry to the db
/*var entry = new Info({
	name : 'Arka',
	role : 'full-stack',
	contact : 739543532,
	addr : 'GGN'
});
entry.save();*/

var app = express();

app.use(express.static(__dirname+'/app-root'));

app.use(bodyParser.json());

app.get('/api/infos',function(req,res){
	Info.find(function(err,entries){
		res.send(entries);
		entries.forEach(function(entry){
			console.log('request recived for _id - ',entry._id);
		});
	});
});

app.post('/api/infos',function(req,res){
	console.log('post req - ',req.body);
	var newEntry = new Info(req.body);
	newEntry.save();
});

app.put('/api/infos/:id',function(req,res){
	console.log('received a PUT request for data with _id : ',req.body);
	
	Info.update({_id : req.params.id},req.body,function(err){
		res.send({_id : req.params.id});
	});
});

app.delete('/api/infos/:id',function(req,res){
	console.log('received a DELETE request for data with _id : ',req.params.id);

	Info.remove({ _id : req.params.id },function(err){
		res.send({ _id : req.params.id});
	});
});

var port = 3001;
app.listen(port);
console.log('Server running on ',port);