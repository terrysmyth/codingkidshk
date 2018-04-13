 "use strict";

 angular.module("myApp")
     .controller('saveWorkCtrl', function($rootScope, $scope, $location, $firebaseObject, $window) {
         // Current User *********************************************************************
         var user = firebase.auth().currentUser;

         // INSET CHOSEN WORK
         var chosenWork = $rootScope.chosenWork;
         var innerIframe;
         var iframe = document.getElementById("iframeWindow");
         iframe.onload = function() {
             innerIframe = iframe.contentDocument;

             innerIframe.getElementById("textHTML").innerHTML = chosenWork.html;
             innerIframe.getElementById("textCSS").innerHTML = chosenWork.css;

         }


         // SAVE TEXT EDITOR 
         $scope.saveWork = function() {
             var workHTML = innerIframe.getElementById("textHTML").value;
             var workCSS = innerIframe.getElementById("textCSS").value;

             if (workHTML == "" || workCSS == "") {
                 alertify.error('Both HTML and CSS need code!');
             } else {
                 alertify.prompt("Do you want to save your work?", chosenWork.name,
                     function(evt, value) {
                         $rootScope.chosenWork.name = value;
                         firebase.database().ref('users/' + user.uid + "/work/" + chosenWork.id).set({
                             name: value,
                             html: workHTML,
                             css: workCSS,
                             id: chosenWork.id
                         });
                         alertify.success('Saved: ' + value);
                     },
                     function() {
                         alertify.error('Cancelled');
                     });

             };


         }

         // SAVE TEXT EDITOR 
         $scope.deleteWork = function() {

             alertify.confirm("Are you sure you want to delete this work?",
                 function() {
                    var work = firebase.database().ref('users/' + user.uid + "/work/" + chosenWork.id);
                    work.remove();
                    document.getElementById("iframeWindow").style.display = "none";
                    document.getElementById("showInfo").style.display = "none";
                    document.getElementById("deleteNotice").style.display = "block";
                     alertify.success('Work Deleted!');
                 },
                 function() {
                     alertify.error('Cancelled');
                 });


         }





     })