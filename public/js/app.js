angular.module("myApp", [])

var app = angular.module("myApp", ["ngRoute", 'firebase']);

app.directive('navbar', function() {
    return {
        restrict: 'E',
        templateUrl: 'directives/navbar.html'
    }
});

app.config(function($routeProvider) {
    $routeProvider
        .when("/admin", {
            templateUrl: "admin.html",
        })
        .when("/home", {
            templateUrl: "home.html",
        })
        .when("/login", {
            templateUrl: "login.html",
        })
        .otherwise({
            redirectTo: '/home'
        });
});



