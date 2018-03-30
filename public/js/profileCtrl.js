 "use strict";

 angular.module("myApp")
     .controller('profileCtrl', function($rootScope, $scope, $location, $firebaseObject, $window) {


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

         // NEW STUDENT REGISTER
         var database = firebase.database();
         $scope.createStudent = function(studentInfo, userId) {

             firebase.database().ref('users/' + userId).set({
                 username: studentInfo.name,
                 email: studentInfo.email,
                 dob: studentInfo.date.toString(),
                 student: false,
                 parent: {
                     name: studentInfo.parent.name,
                     email: studentInfo.parent.email,
                     phone: studentInfo.parent.phone,
                     points: 0
                 }
             }).then(() => {
                 // GET PROFILE
                 var getProfile = firebase.database().ref('users/' + user.uid);
                 getProfile = $firebaseObject(getProfile);
                 getProfile.$bindTo($rootScope, "profile");
                 console.log(getProfile)

             }).catch(() => {

             })

         };

         // RESET QUIZ ANSWERS 
         $scope.reset = function() {
             $scope.result = { percent: 0,a: []};
         }

         $scope.answers = [];
         $scope.result = {
             percent: 0,
             a: []
         }

         // GET QUIZES 
         var getQuizes = firebase.database().ref('quizes');
         getQuizes = $firebaseObject(getQuizes);
         getQuizes.$bindTo($scope, "quizes");

         // GET FINISHED QUIZES 
         var getFinished = firebase.database().ref('users/' + user.uid + 'quizes');
         getFinished = $firebaseObject(getFinished);
         getFinished.$bindTo($scope, "finished");


         $scope.getAnswers = function(questions, answers, quizID) {

             var a;
             var totalCorrect = 0;
             var totalQuestions = 0;
             for (var i = 0; i < questions.length; i++) {

                 if (questions[i].a == answers[i].toLowerCase()) {

                     a = true;
                     totalCorrect += 1;
                 } else {
                     a = false;
                 }
                 totalQuestions += 1;
                 $scope.result.a.push({ q: questions[i].q, a: a });
             }

             var precentCorrect = Math.round((totalCorrect / totalQuestions) * 100);
             $scope.result.percent = precentCorrect;

             $scope.postAnswers(quizID, $scope.result);

         }

         $scope.postAnswers = function(quizID, result) {

             firebase.database().ref('users/' + user.uid + '/quizes/' + quizID.id).set({
                 name: quizID.name,
                 type: quizID.type,
                 difficulty: quizID.difficulty,
                 percent: result,
                 id: quizID.id
             });

             if (result.percent > 85) {

                 // GET QUIZES 
                 var getPoints = firebase.database().ref('users/' + user.uid + '/points').once('value').then(function(snapshot) {
                     var userPoints = snapshot.val();
                     firebase.database().ref('users/' + user.uid + '/points/').set(userPoints + 20);
                 });

             }

         }








         // END
     })