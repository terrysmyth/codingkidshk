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


     })