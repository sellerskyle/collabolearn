if (Meteor.isClient) {
	Meteor.subscribe('Jokes');
	Meteor.subscribe('Users');
	Meteor.subscribe('ProfileImages');
	Meteor.subscribe('UserImages');

	//begin new subscriptions

	Meteor.subscribe('Connections');
}