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

app.directive('material', function() {
    return {
        restrict: 'E',
        templateUrl: 'directives/material.html'
    }
});

app.directive('texteditor', function() {
    return {
        restrict: 'E',
        templateUrl: 'directives/texteditor.html'
    }
});

app.directive('class', function() {
    return {
        restrict: 'E',
        templateUrl: 'directives/class.html'
    }
});




app.config(function($routeProvider) {
    $routeProvider
        .when("/admin", {
            templateUrl: "admin.html",
        })
        .when("/terms", {
            templateUrl: "terms.html",
        })
        .when("/class", {
            templateUrl: "class.html",
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
        .when("/classPage", {
            templateUrl: "classPage.html",
        })
        .when("/signup", {
            templateUrl: "signup.html",
        })
        .when("/editQuiz", {
            templateUrl: "editQuiz.html",
        })
        .otherwise({
            redirectTo: '/home'
        });
});



