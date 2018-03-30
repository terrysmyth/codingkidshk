angular.module("myApp", [])

var app = angular.module("myApp", ["ngRoute", 'firebase']);

app.directive('navbar', function() {
    return {
        restrict: 'E',
        templateUrl: 'directives/navbar.html'
    }
});

app.directive('quiz', function() {
    return {
        restrict: 'E',
        templateUrl: 'directives/quiz.html'
    }
});

app.directive('showquiz', function() {
    return {
        restrict: 'E',
        templateUrl: 'directives/showquiz.html'
    }
});




app.config(function($routeProvider) {
    $routeProvider
        .when("/admin", {
            templateUrl: "admin.html",
        })
        .when("/profile", {
            templateUrl: "profile.html",
        })
        .when("/thank-you", {
            templateUrl: "thank-you.html",
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



