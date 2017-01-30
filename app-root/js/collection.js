var app = app || {};

//new collection
app.detailsCollection = Backbone.Collection.extend({
	url : 'http://localhost:3001/api/infos'
});