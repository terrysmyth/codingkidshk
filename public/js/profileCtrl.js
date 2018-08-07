 "use strict";

 angular.module("myApp")
     .controller('profileCtrl', function($rootScope, $scope, $location, $firebaseObject, $firebaseArray, $window, $sce) {


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

                 },
                 points: {
                     total: 0,
                     HTML: 0,
                     CSS: 0,
                     JS: 0,
                     JQ: 0,
                     Bootstrap: 0
                 }
             }).then(() => {
                 // GET PROFILE
                 var getProfile = firebase.database().ref('users/' + user.uid);
                 getProfile = $firebaseObject(getProfile);
                 getProfile.$bindTo($rootScope, "profile");
                 alertify.success('Success: Profile Created');
             }).catch((error) => {
                 alertify.error('Error in making profile.');
                 console.log(error)
             })

         };

         // RESET QUIZ ANSWERS 
         $scope.reset = function() {
             $scope.result = { percent: 0, a: [] };
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

                 // GET POINTS 
                 var getPoints = firebase.database().ref('users/' + user.uid + '/points/total').once('value').then(function(snapshot) {
                     var userPoints = snapshot.val();
                     firebase.database().ref('users/' + user.uid + '/points/total').set(userPoints + 20);
                 });

                 // GET SPECIFIC POINTS 
                 var getSPoints = firebase.database().ref('users/' + user.uid + '/points/' + quizID.type).once('value').then(function(snapshot) {
                     var userSPoints = snapshot.val();
                     firebase.database().ref('users/' + user.uid + '/points/' + quizID.type).set(userSPoints + 20);
                 });
                 alertify.success('Well done! Points added!');

             } else {
                 alertify.error('Better luck next time!');
             }

         }


         // GET USEFUL LINKS
         var getLinks = firebase.database().ref('useful/');
         getLinks = $firebaseObject(getLinks);
         getLinks.$bindTo($scope, "links")

         // GET SAVED WORKS
         var getWork = firebase.database().ref('users/' + user.uid + '/work/');
         var getWorkArray = $firebaseArray(getWork);
         getWork = $firebaseObject(getWork);

         getWork.$bindTo($scope, "works").then(() => {

             if (getWorkArray.length >= 5) {
                 console.log('limit reached')
                 $scope.workLimit = true;
             } else {
                 $scope.workLimit = false;
             }

         })



         $scope.chosenWork = function(info) {
             $rootScope.chosenWork = info;
         }


         // SAVE TEXT EDITOR 
         $scope.saveWork = function() {
             var workHTML = document.getElementById('iframeWindow').contentWindow.getHTML();
             var workCSS = document.getElementById('iframeWindow').contentWindow.getCSS();
             var workName;


             if (workHTML == "" || workCSS == "") {
                 alertify.error('Both HTML and CSS need code!');
             } else {
                 alertify.prompt("Do you want to save your work?", "Super Cool Work #1",
                     function(evt, value) {
                         // Get a key for a new Post.
                         var newPostKey = firebase.database().ref().child('users/' + user.uid + "/work/").push().key;

                         firebase.database().ref('users/' + user.uid + "/work/" + newPostKey).set({
                             name: value,
                             html: workHTML,
                             css: workCSS,
                             id: newPostKey
                         });
                         alertify.success('Saved: ' + value);


                         $rootScope.chosenWork = {
                             name: value,
                             html: workHTML,
                             css: workCSS,
                             id: newPostKey
                         };
                         $location.path('savedWork');
                     },
                     function() {
                         alertify.error('Cancelled');
                     });

             };
         }

         // UPLOAD

         $scope.upload = function(aboutImage) {
             var getImage = document.getElementById("fileUpload");
             var file;

             // Create a storage reference from our storage service
             var newPostKey = firebase.database().ref().child('users/' + user.uid + "/gallery/").push().key;
             var storageRef = firebase.storage().ref();

             if (getImage.files[0].size < 800000) {
                 try {
                     // ANOTHER

                     var uploadTask = storageRef.child('gallery/' + user.uid + '/' + newPostKey + "/" + getImage.files[0].name).put(getImage.files[0]);

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

                             firebase.database().ref('users/' + user.uid + "/gallery/" + newPostKey).set({
                                 name: getImage.files[0].name,
                                 body: aboutImage.body,
                                 title: aboutImage.title,
                                 url: downloadURL,
                                 publish: false,
                                 key: newPostKey
                             });
                         });


                     });
                     $scope.aboutImage = null;
                     alertify.success('Saved: ' + aboutImage.title);

                 } catch (err) {

                     console.log(err)
                     alertify.error('Failed to upload: change name or too large!');

                 }
             } else {
                 alertify.error('File to large: ' + (getImage.files[0].size/1000) + "kb. Must be less then 800kb");
             }


         }

         $scope.publishItem = function(item) {
             try {
                 firebase.database().ref().child('users/' + user.uid + "/gallery/" + item.key).set({
                     name: item.name,
                     body: item.body,
                     title: item.title,
                     url: item.url,
                     publish: true,
                     key: item.key
                 })
                 firebase.database().ref().child('published/' + user.uid + item.key).set({
                     name: item.name,
                     body: item.body,
                     title: item.title,
                     url: item.url,
                     publish: true,
                     key: item.key
                 })
                 alertify.success('Image published to website');
             } catch (err) {
                 alertify.error('Failed to publish!');
             }
         }


         $scope.unpublishItem = function(item) {
             try {
                 firebase.database().ref().child('users/' + user.uid + "/gallery/" + item.key).set({
                     name: item.name,
                     body: item.body,
                     title: item.title,
                     url: item.url,
                     publish: false,
                     key: item.key
                 })
                 firebase.database().ref().child('published/' + user.uid + item.key).remove();
                 alertify.success('Image unpublished');
             } catch (err) {
                 alertify.error('Failed to unpublish!');
             }
         }


         $scope.deleteItem = function(item) {
             // Delete from Storage
             // Create a reference to the file to delete
             var storageRef = firebase.storage().ref().child("gallery/" + user.uid + "/" + item.key + "/" + item.name)
             alertify.confirm("Are you sure you want to delete this image?.", function() {
                 // Delete the file
                 storageRef.delete().then(function() {
                     firebase.database().ref('users/' + user.uid + "/gallery/" + item.key).remove();
                     alertify.success('Image Deleted Successfully');
                 }).catch(function(error) {
                     alertify.error('Failed to delete image!');
                     console.log(error)
                 });

             }, function() {});

         }






         // END
     })