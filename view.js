var app = app || {};

//view for a model
app.viewModel = Backbone.View.extend({
	model : new app.detailsModel(),
	tagName : 'tr',
	events: {
        "click .edit": "editModel"
	},
	editModel : function(){
		
		var nodes  = event.target.parentElement.parentElement.children;
		_.each(nodes,function(index){
			console.log('this ',nodes);
			nodes[index].innerHTML = "<input />";
		});
	},
	initialize : function(){
		this.template = _.template($('#people-details-template').html());
	},
	render : function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});


//view for a collection
app.viewCollection = Backbone.View.extend({
	model : collection1,
	el : $('.people-details'),
	initialize : function(){
		this.model.on('add',this.render,this);
	},
	render : function(){
		this.$el.html('');
		var _this = this;
		_.each(this.model.toArray(),function(detailsModel){
			_this.$el.append((new app.viewModel({model : detailsModel})).render().$el);
		});
		return this;							
	}

}); 

var viewCollection = new app.viewCollection();
