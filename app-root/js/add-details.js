var app = app || {};

$(document).ready(function(){
	var inputs = $("input");
	var add = $(".add");
	add.on('click',addModel);
	function addModel(){

		var newModel = new app.detailsModel({
			name : inputs[0].value,
			role : inputs[1].value,
			contact : parseInt(inputs[2].value),
			addr : inputs[3].value
		});
		inputs.val('');
		//console.log('model added ',newModel.toJSON());
		//newCollection = new app.detailsCollection([]);
		app.newCollection.add(newModel);
		console.log('collection is ',app.newCollection);
		newModel.save(null,{
			success : function(res){
				console.log('Successfully saved blog with _id - ',res.toJSON()._id);
			},
			error : function(){
				console.log('Failed to save data!!');
			}
		});

		
	}

});