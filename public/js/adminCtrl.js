 "use strict";

 angular.module("myApp")
     .controller('adminCtrl', function($rootScope, $scope, $location, $firebaseObject) {

         // Set Page
         $rootScope.pageTitle = "Admin Page";

         // Current User *********************************************************************
         var user = firebase.auth().currentUser;

         // ********** GET USER *******
         firebase.auth().onAuthStateChanged(function(user) {
             if (user) {
                 // User is signed in.
                 $rootScope.user = user;

             } else {
                 // No user is signed in.
                 $rootScope.user = null;
                 $window.location.href = '/#!/home'
             }
         });

         // Get Sections
         var getGen = firebase.database().ref('sections');
         getGen = $firebaseObject(getGen);
         getGen.$bindTo($scope, "sections");

         // Get Major Sections
         var getMajor = firebase.database().ref('major');
         getMajor = $firebaseObject(getMajor);
         getMajor.$bindTo($scope, "major");

         // GET STUDENTS
         var getStudents = firebase.database().ref('users');
         getStudents = $firebaseObject(getStudents);
         getStudents.$bindTo($scope, "students");


         // QUIZ ************************************************************************

         var questions = [];

         $scope.submitQuestion = function(question, qT) {
             questions.push(question)
             $scope.questions = questions;
         }

         $scope.submitQuiz = function(quiz, questions) {
             // Get a key for a new Post.
             var newPostKey = firebase.database().ref().child('quizes').push().key;

             firebase.database().ref('quizes/' + newPostKey).set({
                 name: quiz.name,
                 type: quiz.type,
                 difficulty: quiz.difficulty,
                 questions: questions,
                 id: newPostKey,
                 link: quiz.link
             });

             console.log(quiz)
             console.log(questions)

             $scope.questions = null;
             $scope.quiz = null;
         }

         // CREATE USEFUL LINK *************************************************************

         $scope.createLink = function(useful) {
            // Get a key for a new Post.
             var newPostKey = firebase.database().ref().child('useful').push().key;

             firebase.database().ref('useful/' + newPostKey).set({
                 name: useful.name,
                 type: useful.type,
                 img: useful.img,
                 id: newPostKey,
                 link: useful.link
             });

         }



     })