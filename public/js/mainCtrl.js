 "use strict";

 angular.module("myApp")
     .controller('mainCtrl', function($rootScope, $scope, $location, $firebaseObject) {



     	// Get General Data
        var getGen = firebase.database().ref('general');
        getGen = $firebaseObject(getGen);
        getGen.$bindTo($scope, "general");

        // Get Meta Data
        var getGen = firebase.database().ref('meta');
        getGen = $firebaseObject(getGen);
        getGen.$bindTo($scope, "meta");
        

        

     })