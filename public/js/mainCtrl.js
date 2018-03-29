 "use strict";

 angular.module("myApp")
     .controller('mainCtrl', function($rootScope, $scope, $location, $firebaseObject) {
        
         // Current User *********************************************************************
         var user = firebase.auth().currentUser;
         $rootScope.user = user;
         console.log("user name:" + user)



         // GET USER
         firebase.auth().onAuthStateChanged(function(user) {
             if (user) {
                 console.log('user signed in');
             } else {
                 console.log('There is no user');
             }
         });


         // LOG OUT
         firebase.auth().signOut().then(function() {
             console.log('Logged out');

         }).catch(function(error) {
             console.log('Couldnt log out!');
         });

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