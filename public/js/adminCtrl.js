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


         // UPLOAD

         $scope.upload = function(aboutImage) {
             var getImage = document.getElementById("fileUpload");
             var file;

             // Create a storage reference from our storage service
             var newPostKey = firebase.database().ref().child('websites/').push().key;
             var storageRef = firebase.storage().ref();

             if (getImage.files[0].size < 800000) {
                 try {
                     // ANOTHER

                     var uploadTask = storageRef.child('websites/'+ newPostKey).put(getImage.files[0]);

                     // Register three observers:
                     // 1. 'state_changed' observer, called any time the state changes
                     // 2. Error observer, called on failure
                     // 3. Completion observer, called on successful completion
                     uploadTask.on('state_changed', function(snapshot) {
                         // Observe state change events such as progress, pause, and resume
                         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                         var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                         console.log('Upload is ' + progress + '% done');
                         switch (snapshot.state) {
                             case firebase.storage.TaskState.PAUSED: // or 'paused'
                                 console.log('Upload is paused');
                                 break;
                             case firebase.storage.TaskState.RUNNING: // or 'running'
                                 console.log('Upload is running');
                                 break;
                         }
                     }, function(error) {
                         // Handle unsuccessful uploads
                     }, function() {
                         // Handle successful uploads on complete
                         // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                         uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                             console.log('File available at', downloadURL);

                             firebase.database().ref('websites/' + newPostKey).set({
                                 name: getImage.files[0].name,
                                 title: aboutImage.title,
                                 subtitle: aboutImage.subtitle,
                                 author: aboutImage.author,
                                 url: downloadURL,
                                 key: newPostKey,
                                 link: aboutImage.link
                             });
                         });


                     });
                     $scope.websitie = null;
                     alertify.success('Saved: ' + aboutImage.title);

                 } catch (err) {

                     console.log(err)
                     alertify.error('Failed to upload: change name or too large!');

                 }
             } else {
                 alertify.error('File to large: ' + (getImage.files[0].size/1000) + "kb. Must be less then 800kb");
             }
         }

         $scope.deleteWebsite = function(website) {
            var storageRef = firebase.storage().ref().child("websites/" + website.key)
             alertify.confirm("Are you sure you want to delete this image?.", function() {
                 // Delete the file
                 storageRef.delete().then(function() {
                     firebase.database().ref("websites/" + website.key).remove();
                     alertify.success('Image Deleted Successfully');
                 }).catch(function(error) {
                     alertify.error('Failed to delete image!');
                     console.log(error)
                 });

             }, function() {});


         }






     }) //END