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
            {name:'MULTIPLE_CHOICE',url:'mc',code:'MULTIPLE_CHOICE',type:'checkbox'},
            {name:'SINGLE_CHOICE',url:'sc',code:'SINGLE_CHOICE',type:'select'},
            {name:'GROUPED',url:'GROUPED',code:'GROUPED',type:''}])
        .constant('MW_FORM_TYPES', [
            {name:'ACAT',code:'ACAT'},
            {name:'LOAN APPLICATION',code:'LOAN_APPLICATION'},
            {name:'SCREENING',code:'SCREENING'},
            {name:'Group Application',code:'GROUP_APPLICATION'}]);
})(window.angular);