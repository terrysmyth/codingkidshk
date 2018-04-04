 "use strict";

 angular.module("myApp")
     .controller('editQuizCtrl', function($rootScope, $scope, $location, $firebaseObject) {


         $scope.saveQuiz = function(quiz) {

             var questions = [];
             for (var i = 0; i < quiz.questions.length; i++) {

                 if (quiz.questions[i].type == 'multi') {

                     var newQ = {
                         q: quiz.questions[i].q,
                         type: quiz.questions[i].type,
                         a: quiz.questions[i].a,
                         multi: {
                             a1: quiz.questions[i].multi.a1,
                             a2: quiz.questions[i].multi.a2,
                             a3: quiz.questions[i].multi.a3,
                             a4: quiz.questions[i].multi.a4
                         }
                     }

                 } else {
                     var newQ = {
                         q: quiz.questions[i].q,
                         type: quiz.questions[i].type,
                         a: quiz.questions[i].a,
                     }

                 }
                 questions.push(newQ)
             };

             console.log(questions)


             firebase.database().ref('quizes/' + quiz.id).set({
                 name: quiz.name,
                 type: quiz.type,
                 difficulty: quiz.difficulty,
                 questions: questions,
                 id: quiz.id,
                 link: quiz.link
             });
         }





     })