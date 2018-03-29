 "use strict";

 angular.module("myApp")
     .controller('adminCtrl', function($rootScope, $scope, $location, $firebaseObject) {

     	// Set Page
     	$rootScope.pageTitle = "Admin Page";

     	// Get Sections
        var getGen = firebase.database().ref('sections');
        getGen = $firebaseObject(getGen);
        getGen.$bindTo($scope, "sections");

        // Get Major Sections
         var getMajor = firebase.database().ref('major');
        getMajor = $firebaseObject(getMajor);
        getMajor.$bindTo($scope, "major");


     })