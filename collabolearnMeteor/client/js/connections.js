Template.connections.rendered = function() {
	$("#connections-link").addClass('selected');
	$("#jokes-link").removeClass('selected');
	$("#rankings-link").removeClass('selected');
	$("#search-link").removeClass('selected');
	$("#login-link").removeClass('selected');
	$("#userProfile-link").removeClass('selected');
    $("#findCollabolearners-link").removeClass('selected');
    $("#profile-link").removeClass('selected');

}


Template.connections.helpers({
	jokes: function() {
		var jokes = Jokes.find({}, {sort: {createdAt: -1}});
		return jokes;
	},

	userConnections: function() {
		var username = Meteor.user().username;
		var userId = Meteor.userId();
		var userConnections = Connections.find({ $or :[{userOne: userId}, {userTwo: userId}]}, {sort: {createdAt: 1}});

		return userConnections;
	},

	username: function(userId) {
		return Meteor.users.findOne({_id: userId}, {}).username
	},

	skillsUserHas: function(userId) {
		debugger;
		return Meteor.users.find({_id: userId}, {}).skillsUserHas
	},

	skillsUserWants: function(userId) {
		return Meteor.users.findOne({_id: userId}, {}).skillsUserWants
	},

});

Template.connections.events({
	"click #laugh": function() {
		var thisUser = Meteor.userId();
		var thisJoke = Jokes.findOne({_id: this._id})._id;
		var jokeAuthor = Jokes.findOne({_id: this._id}).userId;
		var Name = Meteor.user().username;
		var thisJokesVotes = Jokes.findOne({_id: this._id}, {voted: {$in: Name}}).voted;

		if (thisJokesVotes.indexOf(Name) > -1) {
			Bert.alert("You cannot vote twice", "danger", "growl-top-right");
			// In the array!, meaning user has voted
		} else {
			// Not in the Array, Do stuff.
			Meteor.call("countVote", thisJoke, Name);
			Meteor.call("userPointLaugh", jokeAuthor);
			Meteor.call("laughVote", thisUser, thisJoke);
			Bert.alert("Your Vote Was Placed", "success", "growl-top-right");

		}

		if (Name == thisJokesVotes) {
			Bert.alert("You cannot vote for your own joke", "danger", "growl-top-right");
		}
	},

	"click #frown": function() {
		var thisUser = Meteor.userId();
		var thisJoke = Jokes.findOne({_id: this._id})._id;
		var jokeAuthor = Jokes.findOne({_id: this._id}).userId;
		var Name = Meteor.user().username;
		var thisJokesVotes = Jokes.findOne({_id: this._id}, {voted: {$in: Name}}).voted;

		if (thisJokesVotes.indexOf(Name) > -1) {
			Bert.alert("You cannot vote twice", "danger", "growl-top-right");
			// In the array!, meaning user has voted
		} else {
			// Not in the Array, Do stuff.
			Meteor.call("countVote", thisJoke, Name);
			Meteor.call("userPointFrown", jokeAuthor);
			Meteor.call("frownVote", thisUser, thisJoke);
			Bert.alert("Your Vote Was Placed", "success", "growl-top-right");

		}

		if (Name == thisJokesVotes) {
			Bert.alert("You cannot vote for your own joke", "danger", "growl-top-right");
		}
	},

	"click #puke": function() {
		var thisUser = Meteor.userId();
		var thisJoke = Jokes.findOne({_id: this._id})._id;
		var jokeAuthor = Jokes.findOne({_id: this._id}).userId;
		var Name = Meteor.user().username;
		var thisJokesVotes = Jokes.findOne({_id: this._id}, {voted: {$in: Name}}).voted;

		if (thisJokesVotes.indexOf(Name) > -1) {
			Bert.alert("You cannot vote twice", "danger", "growl-top-right");
			// In the array!, meaning user has voted
		} else {
			// Not in the Array, Do stuff.
			Meteor.call("countVote", thisJoke, Name);
			Meteor.call("userPointPuke", jokeAuthor);
			Meteor.call("pukeVote", thisUser, thisJoke);
			Bert.alert("Your Vote Was Placed", "success", "growl-top-right");

		}

		if (Name == thisJokesVotes) {
			Bert.alert("You cannot vote for your own joke", "danger", "growl-top-right");
		}	
	},

});































