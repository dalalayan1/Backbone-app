var app = app || {};

//new model
app.detailsModel = Backbone.Model.extend({
	defaults: {
		name : '-----',
		role : '-----',
		contact : '-----',
		addr : '-----'
	}
});