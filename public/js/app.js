angular.module("myApp", [])

var app = angular.module("myApp", ["ngRoute", 'firebase']);

app.directive('navbar', function() {
    return {
        restrict: 'E',
        templateUrl: 'directives/navbar.html'
    }
});

app.directive('camp', function() {
    return {
        restrict: 'E',
        templateUrl: 'directives/camp.html'
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

app.directive('campsignup', function() {
    return {
        restrict: 'E',
        templateUrl: 'directives/campsignup.html'
    }
});



app.config(function($routeProvider) {
    $routeProvider
        .when("/admin", {
            templateUrl: "admin.html",
        })
        .when("/videopage", {
            templateUrl: "videopage.html",
        })
        .when("/studentPage", {
            templateUrl: "studentPage.html",
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
        .when("/schedule", {
            templateUrl: "schedule.html",
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
        .when("/online", {
            templateUrl: "online.html",
        })
         .when("/savedWork", {
            templateUrl: "savedWork.html",
        })
        .when("/editQuiz", {
            templateUrl: "editQuiz.html",
        })
        .when("/camps", {
            templateUrl: "camps.html",
        })
        .when("/teachers", {
            templateUrl: "teachers.html",
        })
        .when("/gallery", {
            templateUrl: "gallery.html",
        })
        .when("/websites", {
            templateUrl: "websites.html",
        })
        .when("/announcement", {
            templateUrl: "announcement.html",
        })
        .otherwise({
            redirectTo: '/home'
        });
});



