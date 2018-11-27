Template.findCollabolearners.rendered = function() {
	$("#findCollabolearners-link").addClass('selected');
	$("#jokes-link").removeClass('selected');
	$("#rankings-link").removeClass('selected');
	$("#search-link").removeClass('selected');
	$("#login-link").removeClass('selected');
	$("#userProfile-link").removeClass('selected');
    $("#profile-link").removeClass('selected');
    $("#connections-link").removeClass('selected');

}

Template.findCollabolearners.helpers({
	email: function() {
		if(!Meteor.user()) {
			Bert.alert("you are not logged in, permission denied", "danger", "growl-top-right");
			return false;
		} else {
			return Meteor.user().emails[0].address;
		}
	},

	userConnections: function() {
		var username = Meteor.user().username;
		var userId = Meteor.userId();
		var userConnections = Connections.find({ $or :[{userOne: userId}, {userTwo: userId}]}, {sort: {createdAt: 1}});

		return userConnections;
	},

	username: function(userId) {
		debugger;
		return Meteor.users.findOne({_id: userId}, {}).username;
	},

	skillsUserHas: function(userId) {
		debugger;
		return Meteor.users.findOne({_id: userId}, {}).profile.skillsUserHas;
	},

	skillsUserWants: function(userId) {
		return Meteor.users.findOne({_id: userId}, {}).profile.skillsUserWants;
	},

	UserImages: function() {
		var username = Meteor.user().username;
		var userId = Meteor.userId();
		var URL = UserImages.findOne({username: username}, {userId: userId});
		return URL;
	},

	//begin new helpers
	matchedCollabolearners: function() {
		console.log("matchedCollabolearners entered");
		debugger;
		var skillsUserHas = Meteor.user().profile.skillsUserHas;
		var skillsUserWants = Meteor.user().profile.skillsUserWants;

		var wantToConnectUsers = Meteor.user().profile.wantToConnectUsers;
		var maybeLaterUsers = Meteor.user().profile.maybeLaterUsers;
		var passedUsers = Meteor.user().profile.passedUsers;


		var allUsers = Meteor.users.find();

		var currentUser;
		var currentUserId;
		var currentSkill;
		var matchedSkillsUserWants;
		var matchedSkillsUserHas;

		var matchedUsers;
		var currentMatchedUser;

		var isConnect;
		var isMaybe;
		var isPass;


		for(var i = 0; i < allUsers.count(); i++)
		{
			currentUser = allUsers[i];
			for (var j = 0; j < skillsUserWants.length; j++)
			{
				currentSkill = skillsUserWants[j];

				matchedSkillsUserWants.push(currentUser.profile.skillsUserHas.filter(skill => skill === currentSkill));
			}

			for (var k = 0; k < skillsUserHas.length; j++)
			{
				currentSkill = skillsUserHas[k];

				matchedSkillsUserHas.push(currentUser.profile.skillsUserWants.filter(skill => skill === currentSkill));
			}

			if(matchedSkillsUserWants.length > 0 && matchedSkillsUserHas.length > 0) {
				currentUserId = currentUser._id;
				isConnect = wantToConnectUsers.filter(user => user === currentUserId);
				isMaybe = maybeLaterUsers.filter(user => user === currentUserId);
				isPass = passedUsers.filter(user => user === currentUserId);

				if(isConnect < 1 && isMaybe < 1 && isPass < 1) {
					currentMatchedUser = new MatchedUser(currentUserId, matchedSkillsUserWants, matchedSkillsUserHas);
					matchedUsers.add(currentMatchedUser);
				}
			}
		}

		return matchedUsers;

	},

});

Template.findCollabolearners.events({
	"click #delete-joke": function() {
		Meteor.call("removeJoke", this._id);
		Bert.alert("Your Joke Was Deleted", "success", "growl-top-right");
	},

	"submit .edit-profile": function(event) {
		var file = $('#profileImage').get(0).files[0];

		if (file) {

			fsFile = new FS.File(file);

			ProfileImages.insert(fsFile, function(err, result){
				if (err) {
					throw new Meteor.Error(err);
				} else {

					var imageLoc = '/cfs/files/ProfileImages/'+result._id;

					UserImages.insert({
						userId: Meteor.userId(),
						username: Meteor.user().username,
						image: imageLoc,
					});

					Bert.alert("Profile Update Successful!", "success", "growl-top-right");
				}
			});

		}

		return false // prevent submit
	},

	"click .edit-profile" : function(event) {
		var userId = this.userTwo
		var toHide = document.getElementsByClassName(userId);

		toHide.style.display = "none";
	}
});

































