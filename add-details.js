var app = app || {};

$(document).ready(function(){
	var inputs = $("input");
	var add = $(".add");
	add.on('click',addModel);
	function addModel(){

		newModel = new app.detailsModel({
			name : inputs[0].value,
			role : inputs[1].value,
			contact : parseInt(inputs[2].value),
			addr : inputs[3].value
		});
		inputs.val('');
		//console.log('model added ',newModel.toJSON());
		collection1.add(newModel);
		//console.log('collection ',collection1.toJSON());
	}

});