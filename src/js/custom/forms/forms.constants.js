/**
 * Created by Yoni on 2/9/2018.
 */
(function(angular) {
    "use strict";

    angular
        .module('app.forms')
        .constant('MW_QUESTION_TYPES', [
            {name:'Fill In Blank',url:'fib',code:'FILL_IN_BLANK',type:'text'},
            {name:'Yes/No',code:'yn',url:'yn',type:'YES_NO',options:['Yes','No']},
            {name:'Multiple Choice',url:'mc',code:'MULTIPLE_CHOICE',options:[],type:'checkbox'},
            {name:'Single Choice',url:'sc',code:'SINGLE_CHOICE',options:[],type:'select'},
            {name:'Grouped',url:'GROUPED',code:'GROUPED',type:''}])
        .constant('MW_FORM_TYPES', [
            {name:'ACAT',code:'ACAT'},
            {name:'LOAN APPLICATION',code:'LOAN_APPLICATION'},
            {name:'SCREENING',code:'SCREENING'},
            {name:'Group Application',code:'GROUP_APPLICATION'}]);
})(window.angular);