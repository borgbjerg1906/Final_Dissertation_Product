var DissertationApp = angular.module('DissertationApp', 
	['ngRoute',
	 'btford.socket-io'
	 ]).



config(['$routeProvider', function($routeProvider){
		$routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'homeCtrl'});
		$routeProvider.when('/about', {templateUrl: 'partials/about.html', controller: 'aboutCtrl'});
		$routeProvider.when('/chat', {templateUrl: 'partials/chat.html', controller: 'chatCtrl'});
		$routeProvider.otherwise({redirectTo: '/home'});
}])