!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";e.defineMode("apl",function(){var e={".":"innerProduct","\\":"scan","/":"reduce","⌿":"reduce1Axis","⍀":"scan1Axis","¨":"each","⍣":"power"},n={"+":["conjugate","add"],"−":["negate","subtract"],"×":["signOf","multiply"],"÷":["reciprocal","divide"],"⌈":["ceiling","greaterOf"],"⌊":["floor","lesserOf"],"∣":["absolute","residue"],"⍳":["indexGenerate","indexOf"],"?":["roll","deal"],"⋆":["exponentiate","toThePowerOf"],"⍟":["naturalLog","logToTheBase"],"○":["piTimes","circularFuncs"],"!":["factorial","binomial"],"⌹":["matrixInverse","matrixDivide"],"<":[null,"lessThan"],"≤":[null,"lessThanOrEqual"],"=":[null,"equals"],">":[null,"greaterThan"],"≥":[null,"greaterThanOrEqual"],"≠":[null,"notEqual"],"≡":["depth","match"],"≢":[null,"notMatch"],"∈":["enlist","membership"],"⍷":[null,"find"],"∪":["unique","union"],"∩":[null,"intersection"],"∼":["not","without"],"∨":[null,"or"],"∧":[null,"and"],"⍱":[null,"nor"],"⍲":[null,"nand"],"⍴":["shapeOf","reshape"],",":["ravel","catenate"],"⍪":[null,"firstAxisCatenate"],"⌽":["reverse","rotate"],"⊖":["axis1Reverse","axis1Rotate"],"⍉":["transpose",null],"↑":["first","take"],"↓":[null,"drop"],"⊂":["enclose","partitionWithAxis"],"⊃":["diclose","pick"],"⌷":[null,"index"],"⍋":["gradeUp",null],"⍒":["gradeDown",null],"⊤":["encode",null],"⊥":["decode",null],"⍕":["format","formatByExample"],"⍎":["execute",null],"⊣":["stop","left"],"⊢":["pass","right"]},t=/[\.\/⌿⍀¨⍣]/,r=/⍬/,l=/[\+−×÷⌈⌊∣⍳\?⋆⍟○!⌹<≤=>≥≠≡≢∈⍷∪∩∼∨∧⍱⍲⍴,⍪⌽⊖⍉↑↓⊂⊃⌷⍋⍒⊤⊥⍕⍎⊣⊢]/,a=/←/,i=/[⍝#].*$/,o=function(e){var n;return n=!1,function(t){return n=t,t!==e||"\\"===n}};return{startState:function(){return{prev:!1,func:!1,op:!1,string:!1,escape:!1}},token:function(u,s){var c,p;return u.eatSpace()?null:'"'===(c=u.next())||"'"===c?(u.eatWhile(o(c)),u.next(),s.prev=!0,"string"):/[\[{\(]/.test(c)?(s.prev=!1,null):/[\]}\)]/.test(c)?(s.prev=!0,null):r.test(c)?(s.prev=!1,"niladic"):/[¯\d]/.test(c)?(s.func?(s.func=!1,s.prev=!1):s.prev=!0,u.eatWhile(/[\w\.]/),"number"):t.test(c)?"operator apl-"+e[c]:a.test(c)?"apl-arrow":l.test(c)?(p="apl-",null!=n[c]&&(s.prev?p+=n[c][1]:p+=n[c][0]),s.func=!0,s.prev=!1,"function "+p):i.test(c)?(u.skipToEnd(),"comment"):"∘"===c&&"."===u.peek()?(u.next(),"function jot-dot"):(u.eatWhile(/[\w\$_]/),s.prev=!0,"keyword")}}}),e.defineMIME("text/apl","apl")});