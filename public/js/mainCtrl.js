 "use strict";

 angular.module("myApp")
     .filter('reverse', function() {
         return function(items) {
             return items.slice().reverse();
         };
     })
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
                 // GET PROFILE
                 var getProfile = firebase.database().ref('users/' + user.uid);
                 getProfile = $firebaseObject(getProfile);
                 getProfile.$bindTo($rootScope, "profile").then(() => {

                     if (!$rootScope.profile.points.total) {
                         $rootScope.profile.points = {
                             total: 0,
                             HTML: 0,
                             CSS: 0,
                             JS: 0,
                             JQ: 0,
                             BootStrap: 0
                         }
                     };
                 })
                 $window.location.href = '/#!/home'
             } else {
                 // No user is signed in.
                 $rootScope.user = null;
                 console.log("No user...");
             }
         });

         // LOG OUT
         $scope.logout = function() {


             alertify.confirm("Would you like to log out?",
                 function() {
                     firebase.auth().signOut().then(function() {
                         console.log('Logged out');

                     }).catch(function(error) {
                         alertify.error('Could log out!');
                         console.log(error)
                     });
                 },
                 function() {
                     alertify.error('Cancelled');
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

             try {
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
                 alertify.success('Success: updated');

             } catch (err) {
                 alertify.error('Error: ' + err);
             }

         }

         // GET CAMPS
         var getCamps = firebase.database().ref('camps');
         getCamps = $firebaseObject(getCamps);
         getCamps.$bindTo($scope, "camps");


         // GET CLASSES CHECKBOX
         $scope.getClass = function() {
             var checked = [];
             var chk_arry = document.getElementsByName('class');
             for (var i = 0; i < chk_arry.length; i++) {
                 if (chk_arry[i].checked) {
                     checked.push(chk_arry[i].value)
                 }
             }
             document.getElementById('allClasses').value = checked;
         }

         $scope.newReview = [];

         // NEW FEEDBACK
         $scope.submitReview = function(student, review) {
             // Add Review

             var newPostKey = firebase.database().ref().child('users/' + student.key + "/feedback/").push().key;
             var reviewDate = review.date;
             var finalDate = reviewDate.getDay() + "/";
             finalDate += reviewDate.getMonth() + "/";
             finalDate += reviewDate.getFullYear();
             console.log(finalDate)
             try {
                 firebase.database().ref('users/' + student.key + "/feedback/" + newPostKey).set({
                     date: finalDate,
                     body: review.body,
                     teacher: review.teacher,
                     seen: false,
                     key: newPostKey
                 });

                 alertify.success('Success: updated');
                 $scope.newReview = null;
             } catch (err) {
                 alertify.error('Error: ' + err);
             }
         }

         // SEEN FUNCTION FOR REVIEWS
         $scope.seen = function(student, review) {
             firebase.database().ref('users/' + student.key + "/feedback/" + review.key).set({
                 date: review.date,
                 body: review.body,
                 teacher: review.teacher,
                 seen: true,
                 key: review.key
             });

         }

         // DISPLAY IMAGES
         var ref = firebase.database().ref().child('published/')
         var displayImages = $firebaseObject(ref);
         displayImages.$bindTo($scope, "displayItems")



     })