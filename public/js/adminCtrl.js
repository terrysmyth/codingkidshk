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

         $scope.getStudent = function(info, key) {

             $rootScope.chosenStudent = info;
             $rootScope.chosenStudent.key = key;
         }


         // QUIZ ************************************************************************

         var questions = [];

         $scope.submitQuestion = function(question, qT) {
             questions.push(question)
             $scope.questions = questions;
         }

         $scope.submitQuiz = function(quiz, questions) {

             alertify.confirm("Submit new quiz?",
                 function() {
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


                     $scope.questions = null;
                     $scope.quiz = null;
                     alertify.success('Quiz submitted');
                 },
                 function() {
                     alertify.error('Cancelled');
                 });

         }

         // GET QUIZES
         var getQuizes = firebase.database().ref('quizes');
         getQuizes = $firebaseObject(getQuizes);
         getQuizes.$bindTo($scope, "quizes");

         // GET CHOSEN QUIZ
         $scope.editQuiz = function(quiz) {
             $rootScope.chosenQuiz = quiz;
         }


         // CREATE USEFUL LINK *************************************************************

         $scope.createLink = function(useful) {

             try {
                 // Get a key for a new Post.
                 var newPostKey = firebase.database().ref().child('useful').push().key;

                 firebase.database().ref('useful/' + newPostKey).set({
                     name: useful.name,
                     type: useful.type,
                     img: useful.img,
                     id: newPostKey,
                     link: useful.link
                 });
                 alertify.success('Link Added');
             } catch (err) {
                 alertify.error('Failed to add link');
                 console.log(err)
             }


         }

         // CREATE CLASS *************************************************************

         $scope.createClass = function(info) {
             // Get a key for a new Post.
             var newPostKey = firebase.database().ref().child('class').push().key;

             firebase.database().ref('class/' + newPostKey).set({
                 name: info.name,
                 subtitle: info.subtitle,
                 type: info.type,
                 img: info.img,
                 id: newPostKey,
                 age: info.age,
                 price: info.price,
                 body: info.body,
                 outcome: info.outcome,
                 bring: info.bring,
                 day: info.day,
                 time: info.time,
             });

         }


         // GET TERM
         var getTerm = firebase.database().ref('term');
         getTerm = $firebaseObject(getTerm);
         getTerm.$bindTo($scope, "term");


         $scope.createCamp = function(info) {

             try {


                 // Get a key for a new Post.
                 var newPostKey = firebase.database().ref().child('camps/camps').push().key;

                 firebase.database().ref('camps/camps/' + newPostKey).set({
                     name: info.name,
                     subtitle: info.subtitle,
                     week: info.week,
                     img: info.img,
                     id: newPostKey,
                     age: info.age,
                     price: info.price,
                     body: info.body,
                     bring: info.bring,
                     time: info.time,
                 });
                 alertify.success('Camp Created');
                 $scope.camp = null;
             } catch (err) {

                 alertify.error('Failed to create camp: check console');
                 console.log(err);

             }

         }

         // GET CAMPS
         var getCamps = firebase.database().ref('camps');
         getCamps = $firebaseObject(getCamps);
         getCamps.$bindTo($scope, "camps");




     })