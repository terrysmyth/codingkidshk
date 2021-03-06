 "use strict";

 angular.module("myApp")
     .controller('homeCtrl', function($rootScope, $scope, $location, $firebaseObject) {

         // Set Page
         $rootScope.pageTitle = "Welcome!";

         // Get Sections
         var getGen = firebase.database().ref('sections');
         getGen = $firebaseObject(getGen);
         getGen.$bindTo($scope, "sections");

         // Get Major Sections
         var getMajor = firebase.database().ref('major');
         getMajor = $firebaseObject(getMajor);
         getMajor.$bindTo($scope, "major");



     })