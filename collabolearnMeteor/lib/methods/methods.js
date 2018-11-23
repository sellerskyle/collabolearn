if (Meteor.isServer) {
	Meteor.methods({
		// Method for adding jokes
		addJokes: function(jokeName, jokePost) {
			if(!Meteor.userId()) {
				throw new Meteor.Error('not authorized');
				return false;
			} else {
				var username = Meteor.user().username;
				var year = new Date().getFullYear();
				var month = new Date().getMonth() + 1;
				var day = new Date().getDate();
				var date = (month + "/" + day + "/" + year).toString();

				Jokes.insert({
					jokeName: jokeName,
					jokePost: jokePost,
					author: username,
					date: date,
					createdAt: new Date(),
					laughScore: 0,
					frownScore: 0,
					pukeScore: 0,
					voted: [username],
					userId: Meteor.userId(), 
				});

			}
		},

		removeJoke: function(jokesId) {
			if(!Meteor.userId()) {
				throw new Meteor.Error('not authorized');
				this.stop();
				return false;
			} else {
				Jokes.remove(jokesId);
			}
		},

		countVote: function(thisJoke, Name) {
			if(!Meteor.userId()) {
				throw new Meteor.Error('not authorized');
				this.stop();
				return false;
			} else {
				Jokes.update(thisJoke, { $addToSet: { voted: Name}});
			}
		},

		userPointLaugh: function(jokeAuthor) {
			if(!Meteor.userId()) {
				throw new Meteor.Error('not authorized');
				this.stop();
				return false;
			} else {
				Meteor.users.update(jokeAuthor, { $inc: {'profile.laughScore': +1}});
			}
		},

		laughVote: function(thisUser, thisJoke) {
			if (!thisUser) {
				throw new Meteor.Error('not authorized');
				return false;
			} else {
				Jokes.update(thisJoke, {$inc: {laughScore: +1}});
			}
		},

		userPointFrown: function(jokeAuthor) {
			if(!Meteor.userId()) {
				throw new Meteor.Error('not authorized');
				this.stop();
				return false;
			} else {
				Meteor.users.update(jokeAuthor, { $inc: {'profile.frownScore': +1}});
			}
		},

		frownVote: function(thisUser, thisJoke) {
			if (!thisUser) {
				throw new Meteor.Error('not authorized');
				return false;
			} else {
				Jokes.update(thisJoke, {$inc: {frownScore: +1}});
			}
		},

		userPointPuke: function(jokeAuthor) {
			if(!Meteor.userId()) {
				throw new Meteor.Error('not authorized');
				this.stop();
				return false;
			} else {
				Meteor.users.update(jokeAuthor, { $inc: {'profile.pukeScore': +1}});
			}
		},

		pukeVote: function(thisUser, thisJoke) {
			if (!thisUser) {
				throw new Meteor.Error('not authorized');
				return false;
			} else {
				Jokes.update(thisJoke, {$inc: {pukeScore: +1}});
			}
		},

		//begin new methods

		addSkillUserHas(thisUser, skill) {
			if(!Meteor.userId()) {
				throw new Meteor.Error('not authorized');
				this.stop();
				return false;
			} else {
				Meteor.users.update(thisUser, { $addToSet: { skillsUserHas: skill}});
			}
		},

		addSkillUserWants(thisUser, skill) {
			if(!Meteor.userId()) {
				throw new Meteor.Error('not authorized');
				this.stop();
				return false;
			} else {
				Meteor.users.update(thisUser, { $addToSet: { skillsUserWants: skill}});
			}
		},

		addUserConnection(thisUser, connectionId) {
			if(!Meteor.userId()) {
				throw new Meteor.Error('not authorized');
				this.stop();
				return false;
			} else {
				Meteor.users.update(thisUser, { $addToSet: { connections: connectionId}});
			}
		},

		// Possible variation on addUserConnection

		addUserConnection(userOne, userTwo, connectionId) {
			if(!Meteor.userId()) {
				throw new Meteor.Error('not authorized');
				this.stop();
				return false;
			} else {
				Meteor.users.update(userOne, { $addToSet: { connections: connectionId}});
				Meteor.users.update(userTwo, { $addToSet: { connections: connectionId}});
			}
		},

		addConnection(userOne, userTwo) {
			if(!Meteor.userId()) {
				throw new Meteor.Error('not authorized');
				return false;
			} else {
				var username = Meteor.user().username;

				Connections.insert({
					userOne: userOne,
					userTwo: userTwo,
					author: username,
					createdAt: new Date(),
					messages: [],
					meetUpLocations: [],
					meetUpTimes: [], 
				});

			}
		},

		addMessage(thisConnection, message) {
			if(!Meteor.userId()) {
				throw new Meteor.Error('not authorized');
				this.stop();
				return false;
			} else {
				Connections.update(thisConnection, { $addToSet: { messages: message}});
			}
		},

		addMeetUpLocation(thisConnection, location) {
			if(!Meteor.userId()) {
				throw new Meteor.Error('not authorized');
				this.stop();
				return false;
			} else {
				Connections.update(thisConnection, { $addToSet: { meetUpLocations: location}});
			}
		},

		addMeetUpTime(thisConnection, time) {
			if(!Meteor.userId()) {
				throw new Meteor.Error('not authorized');
				this.stop();
				return false;
			} else {
				Connections.update(thisConnection, { $addToSet: { meetUpTimes: time}});
			}
		},

		removeJoke: function(connectionId) {
			if(!Meteor.userId()) {
				throw new Meteor.Error('not authorized');
				this.stop();
				return false;
			} else {
				Connections.remove(connectionId);
			}
		},

	});
	
}














