var app = app || {};

//view for a model
app.viewModel = Backbone.View.extend({
	model : new app.detailsModel(),
	tagName : 'tr',
	events: {
        "click .edit" : "editModel",
        "click .update" : "updateModel",
        "click .delete" : "deleteModel",
        "click .cancel" : "cancelUpdateModel"
	},
	editModel : function(){
		this.$('.edit').hide();
		this.$('.delete').hide();
		this.$('.update').show();
		this.$('.cancel').show();

		var name = this.$('.name').html();
		var role = this.$('.role').html();
		var contact = this.$('.contact').html();
		var addr = this.$('.addr').html();

		this.$('.name').html("<input class = 'update-name' value = '"+name+"'/>");
		this.$('.role').html("<input class = 'update-role' value = '"+role+"'/>");
		this.$('.contact').html("<input class = 'update-contact' value = '"+contact+"'/>");
		this.$('.addr').html("<input class = 'update-addr' value = '"+addr+"'/>");	
		this.name = name;
		this.role = role;
		this.contact = contact;
		this.addr = addr;		
	},
	updateModel : function(){
		this.$('.edit').show();
		this.$('.delete').show();
		this.$('.update').hide();
		this.$('.cancel').hide();

		var updateName = this.$('.update-name').val();
		var updateRole = this.$('.update-role').val();
		var updateContact = this.$('.update-contact').val();
		var updateAddr = this.$('.update-addr').val();

		this.model.set('name',updateName);
		this.model.set('role',updateRole);
		this.model.set('contact',parseInt(updateContact));
		this.model.set('addr',updateAddr);
		
	},
	deleteModel : function(){
		this.model.destroy();
	},
	cancelUpdateModel : function(){
		this.render();
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
		this.model.on('change',this.render,this);
		this.model.on('remove',this.render,this);
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
