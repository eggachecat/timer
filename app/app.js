var app = angular.module('app', ['ngAnimate', "ui.router", 'ngMaterial', 'ngMessages']);

app.config(['$stateProvider', '$urlRouterProvider' , '$mdThemingProvider', '$locationProvider', '$httpProvider',
	function($stateProvider, $urlRouterProvider, $mdThemingProvider, $locationProvider, $httpProvider) {

		$mdThemingProvider.theme('docs-dark', 'default')
	      .primaryPalette('yellow')
	      .backgroundPalette('light-blue')
	      .dark();

		$urlRouterProvider.otherwise("/welcome");
		$stateProvider
			.state('welcome', {
				url: "/welcome",
				controller: "welcomeCtrl",
				templateUrl: "./app/welcome/welcome.html"
		    })
	    	.state('calculator', {
				url: "/calculator",
				controller: "calculatorCtrl",
				params: {index: null},	
				templateUrl: "./app/calculator/calculator.html",
				resolve: {
					srcUrl: ["$stateParams", function($stateParams){
						return "video" + $stateParams.index;
					}]
				}
		    });
	}
])


app.directive('autofocus', ['$timeout', function($timeout) {
  return {
    restrict: 'A',
    link : function(scope, iElm, iAttrs) {
    	scope.$watch(iAttrs.autofocus, function(v){
    		if(v){
    			$timeout(function() { iElm[0].focus(); }, 200);
    		}
    	});
    }
  }
}]);

app.directive('keyboard', ['$timeout', function($timeout) {
  return {
    restrict: 'AE',
    controller: function($scope){
    	$scope.keyDown = function(e){
    		console.log("key", e.keyCode)
    		key = e.keyCode == 57 ? "enter" : e.keyCode - 48;
    		console.log(key);
    		$scope.$broadcast("key-down", key);
    	}
    }
  }
}]);

app.directive('key', ['$timeout', '$animate',function($timeout, $animate) {
	return {
		restrict: 'A',
		link : function(scope, iElm, iAttrs) {
			scope.$on("key-down", function(e, v){
				if(v == iAttrs.key){
					c = "md-focused active"
					
					$animate.addClass(iElm,c).then(function() {
			            $timeout(function() {$animate.removeClass(iElm,c)});
			        });
				}
			})
		}
	}
}]);

