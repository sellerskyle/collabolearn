Template.userProfile.rendered = function() {
	$("#userProfile-link").addClass('selected');
	$("#jokes-link").removeClass('selected');
	$("#rankings-link").removeClass('selected');
	$("#search-link").removeClass('selected');
	$("#login-link").removeClass('selected');
	$("#profile-link").removeClass('selected');
    $("#findCollabolearners-link").removeClass('selected');
    $("#connections-link").removeClass('selected');

}

Template.userProfile.helpers({
	email: function() {
		if(!Meteor.user()) {
			Bert.alert("you are not logged in, permission denied", "danger", "growl-top-right");
			return false;
		} else {
			return Meteor.user().emails[0].address;
		}
	},

	username: function() {
		if(!Meteor.user()) {
			Bert.alert("you are not logged in, permission denied", "danger", "growl-top-right");
			return false;
		} else {
			return Meteor.user().username;
		}
	}, 

	UserImages: function() {
		var username = Meteor.user().username;
		var userId = Meteor.userId();
		var URL = UserImages.findOne({username: username}, {userId: userId});
		return URL;
	},

	//begin new helpers

	skillsUserHas: function() {
		return Meteor.user().profile.skillsUserHas;
	},

	skillsUserWants: function() {
		return Meteor.user().profile.skillsUserWants;
	},
});

Template.userProfile.events({
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
	}
});

































