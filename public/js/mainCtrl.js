 "use strict";

 angular.module("myApp")
     .controller('mainCtrl', function($rootScope, $scope, $location, $firebaseObject, $window) {

         // DATE
         $scope.date = new Date();

         // Current User *********************************************************************
         var user = firebase.auth().currentUser;

         // ********** GET USER *******
         firebase.auth().onAuthStateChanged(function(user) {
             if (user) {
                 // User is signed in.
                 $rootScope.user = user;
                 console.log(user)
                 // GET PROFILE
                 var getProfile = firebase.database().ref('users/' + user.uid);
                 getProfile = $firebaseObject(getProfile);
                 getProfile.$bindTo($rootScope, "profile");
                 console.log(getProfile)
                 $window.location.href = '/#!/home'
             } else {
                 // No user is signed in.
                 $rootScope.user = null;
                 console.log("No user...");
             }
         });

         // LOG OUT
         $scope.logout = function() {
             firebase.auth().signOut().then(function() {
                 console.log('Logged out');

             }).catch(function(error) {
                 console.log('Couldnt log out!');
             });
         };



         // GET DATA **************************************************************************

         // Get General Data
         var getGen = firebase.database().ref('general');
         getGen = $firebaseObject(getGen);
         getGen.$bindTo($scope, "general");

         // Get Meta Data
         var getGen = firebase.database().ref('meta');
         getGen = $firebaseObject(getGen);
         getGen.$bindTo($scope, "meta");

         // GET CLASSES
         var getClass = firebase.database().ref('class');
         getClass = $firebaseObject(getClass);
         getClass.$bindTo($scope, "classes");

          // GET CLASSES
         var getTerm = firebase.database().ref('term');
         getTerm = $firebaseObject(getTerm);
         getTerm.$bindTo($scope, "term");

         // Set chosen class
         $scope.pickClass = function(info) {
             $rootScope.chosenClass = info;
         }

         $scope.updateClass = function(info) {

             firebase.database().ref('class/' + info.id).set({
                 name: info.name,
                 subtitle: info.subtitle,
                 type: info.type,
                 img: info.img,
                 id: info.id,
                 age: info.age,
                 price: info.price,
                 body: info.body,
                 outcome: info.outcome,
                 bring: info.bring,
                 day: info.day,
                 time: info.time,
             });
         }


     })