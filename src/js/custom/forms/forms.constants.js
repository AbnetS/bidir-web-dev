/**
 * Created by Yoni on 2/9/2018.
 */
(function(angular) {
    "use strict";

    angular
        .module('app.forms')
        .constant('MW_QUESTION_TYPES', [{label:'Fill in the blank - text',code:'fib',type:'text'}, {label:'Fill in the blank - number',code:'fib',type:'number'}, {label:'Yes/No ',code:'yn',type:'radio'}, {label:'Multiple Choice',code:'mc',type:'checkbox'}, {label:'Single Choice',code:'sc',type:'select'}])
})(window.angular);