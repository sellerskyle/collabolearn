Router.configure({
	layoutTemplate: 'main_layout'
});

Router.map(function(){
	// Jokes
	this.route('jokes', {
		path: '/jokes',
		template: 'jokes'
	});

	// Login
	this.route('login', {
		path: '/',
		template: 'login'
	});

	// Signup
	this.route('signup', {
		path: '/signup',
		template: 'signup'
	});

	// Profile
	this.route('profile', {
		path: '/profile',
		template: 'profile'
	});

	// Rankings
	this.route('rankings', {
		path: '/rankings',
		template: 'rankings'
	});

	// Search
	this.route('search', {
		path: '/search',
		template: 'search'
	});

	//User Profile
	this.route('userProfile', {
		path: '/userProfile',
		template: 'user-profile'
	});

	// Find Collabolearners
	this.route('findCollabolearners', {
		path: '/findCollabolearners',
		template: 'find-collabolearners'
	});

	// Connections
	this.route('connections', {
		path: '/connections',
		template: 'connections'
	});
});