/**
 * Created by Yoni on 2/9/2018.
 */
(function(angular) {
    "use strict";

    angular
        .module('app.forms')
        .constant('MW_QUESTION_TYPES', [{name:'Fill In Blank',code:'fib',type:'text'}, {name:'Yes/No',code:'yn',type:'yn',options:['Yes','No']}, {name:'MULTIPLE_CHOICE',code:'mc',type:'checkbox'},{name:'SINGLE_CHOICE',code:'sc',type:'select'},{name:'GROUPED',code:'GROUPED',type:''}])
})(window.angular);