!function(t){"object"==typeof exports&&"object"==typeof module?t(require("../../lib/codemirror"),require("../xml/xml"),require("../meta")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","../xml/xml","../meta"],t):t(CodeMirror)}(function(t){"use strict";t.defineMode("markdown",function(e,i){function n(i){if(t.findModeByName){var n=t.findModeByName(i);n&&(i=n.mime||n.mimes[0])}var r=t.getMode(e,i);return"null"==r.name?null:r}function r(t,e,i){return e.f=e.inline=i,i(t,e)}function a(t,e,i){return e.f=e.block=i,i(t,e)}function o(t){return!t||!/\S/.test(t.string)}function l(t){return t.linkTitle=!1,t.em=!1,t.strong=!1,t.strikethrough=!1,t.quote=0,t.indentedCode=!1,t.f==g&&(t.f=u,t.block=h),t.trailingSpace=0,t.trailingSpaceNewLine=!1,t.prevLine=t.thisLine,t.thisLine=null,null}function h(e,a){var l=e.sol(),h=!1!==a.list,g=a.indentedCode;a.indentedCode=!1,h&&(a.indentationDiff>=0?(a.indentationDiff<4&&(a.indentation-=a.indentationDiff),a.list=null):a.indentation>0?a.list=null:a.list=!1);var f=null;if(a.indentationDiff>=4)return e.skipToEnd(),g||o(a.prevLine)?(a.indentation-=4,a.indentedCode=!0,T.code):null;if(e.eatSpace())return null;if((f=e.match(w))&&f[1].length<=6)return a.header=f[1].length,i.highlightFormatting&&(a.formatting="header"),a.f=a.inline,m(a);if(!(o(a.prevLine)||a.quote||h||g)&&(f=e.match(C)))return a.header="="==f[0].charAt(0)?1:2,i.highlightFormatting&&(a.formatting="header"),a.f=a.inline,m(a);if(e.eat(">"))return a.quote=l?1:a.quote+1,i.highlightFormatting&&(a.formatting="quote"),e.eatSpace(),m(a);if("["===e.peek())return r(e,a,p);if(e.match(q,!0))return a.hr=!0,T.hr;if(f=e.match(M)){var u=f[1]?"ol":"ul";for(a.indentation=e.column()+e.current().length,a.list=!0;a.listStack&&e.column()<a.listStack[a.listStack.length-1];)a.listStack.pop();return a.listStack.push(a.indentation),i.taskLists&&e.match(b,!1)&&(a.taskList=!0),a.f=a.inline,i.highlightFormatting&&(a.formatting=["list","list-"+u]),m(a)}return i.fencedCodeBlocks&&(f=e.match(B,!0))?(a.fencedChars=f[1],a.localMode=n(f[2]),a.localMode&&(a.localState=t.startState(a.localMode)),a.f=a.block=s,i.highlightFormatting&&(a.formatting="code-block"),a.code=-1,m(a)):r(e,a,a.inline)}function g(e,i){var n=x.token(e,i.htmlState);if(!L){var r=t.innerMode(x,i.htmlState);("xml"==r.mode.name&&null===r.state.tagStart&&!r.state.context&&r.state.tokenize.isInText||i.md_inside&&e.current().indexOf(">")>-1)&&(i.f=u,i.block=h,i.htmlState=null)}return n}function s(t,e){if(e.fencedChars&&t.match(e.fencedChars)){i.highlightFormatting&&(e.formatting="code-block");var n=m(e);return e.localMode=e.localState=null,e.block=h,e.f=u,e.fencedChars=null,e.code=0,n}return e.fencedChars&&t.skipTo(e.fencedChars)?"comment":e.localMode?e.localMode.token(t,e.localState):(t.skipToEnd(),T.code)}function m(t){var e=[];if(t.formatting){e.push(T.formatting),"string"==typeof t.formatting&&(t.formatting=[t.formatting]);for(var n=0;n<t.formatting.length;n++)e.push(T.formatting+"-"+t.formatting[n]),"header"===t.formatting[n]&&e.push(T.formatting+"-"+t.formatting[n]+"-"+t.header),"quote"===t.formatting[n]&&(!i.maxBlockquoteDepth||i.maxBlockquoteDepth>=t.quote?e.push(T.formatting+"-"+t.formatting[n]+"-"+t.quote):e.push("error"))}if(t.taskOpen)return e.push("meta"),e.length?e.join(" "):null;if(t.taskClosed)return e.push("property"),e.length?e.join(" "):null;if(t.linkHref?e.push(T.linkHref,"url"):(t.strong&&e.push(T.strong),t.em&&e.push(T.em),t.strikethrough&&e.push(T.strikethrough),t.linkText&&e.push(T.linkText),t.code&&e.push(T.code),t.image&&e.push(T.image),t.imageAltText&&e.push(T.imageAltText,"link"),t.imageMarker&&e.push(T.imageMarker)),t.header&&e.push(T.header,T.header+"-"+t.header),t.quote&&(e.push(T.quote),!i.maxBlockquoteDepth||i.maxBlockquoteDepth>=t.quote?e.push(T.quote+"-"+t.quote):e.push(T.quote+"-"+i.maxBlockquoteDepth)),!1!==t.list){var r=(t.listStack.length-1)%3;r?1===r?e.push(T.list2):e.push(T.list3):e.push(T.list1)}return t.trailingSpaceNewLine?e.push("trailing-space-new-line"):t.trailingSpace&&e.push("trailing-space-"+(t.trailingSpace%2?"a":"b")),e.length?e.join(" "):null}function f(t,e){if(t.match(y,!0))return m(e)}function u(e,n){var r=n.text(e,n);if(void 0!==r)return r;if(n.list)return n.list=null,m(n);if(n.taskList){return"x"!==e.match(b,!0)[1]?n.taskOpen=!0:n.taskClosed=!0,i.highlightFormatting&&(n.formatting="task"),n.taskList=!1,m(n)}if(n.taskOpen=!1,n.taskClosed=!1,n.header&&e.match(/^#+$/,!0))return i.highlightFormatting&&(n.formatting="header"),m(n);var o=e.sol(),l=e.next();if(n.linkTitle){n.linkTitle=!1;var h=l;"("===l&&(h=")"),h=(h+"").replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1");var s="^\\s*(?:[^"+h+"\\\\]+|\\\\\\\\|\\\\.)"+h;if(e.match(new RegExp(s),!0))return T.linkHref}if("`"===l){var f=n.formatting;i.highlightFormatting&&(n.formatting="code"),e.eatWhile("`");var u=e.current().length;if(0==n.code)return n.code=u,m(n);if(u==n.code){var k=m(n);return n.code=0,k}return n.formatting=f,m(n)}if(n.code)return m(n);if("\\"===l&&(e.next(),i.highlightFormatting)){var p=m(n),v=T.formatting+"-escape";return p?p+" "+v:v}if("!"===l&&e.match(/\[[^\]]*\] ?(?:\(|\[)/,!1))return n.imageMarker=!0,n.image=!0,i.highlightFormatting&&(n.formatting="image"),m(n);if("["===l&&n.imageMarker&&e.match(/[^\]]*\](\(.*?\)| ?\[.*?\])/,!1))return n.imageMarker=!1,n.imageAltText=!0,i.highlightFormatting&&(n.formatting="image"),m(n);if("]"===l&&n.imageAltText){i.highlightFormatting&&(n.formatting="image");var p=m(n);return n.imageAltText=!1,n.image=!1,n.inline=n.f=d,p}if("["===l&&e.match(/[^\]]*\](\(.*\)| ?\[.*?\])/,!1)&&!n.image)return n.linkText=!0,i.highlightFormatting&&(n.formatting="link"),m(n);if("]"===l&&n.linkText&&e.match(/\(.*?\)| ?\[.*?\]/,!1)){i.highlightFormatting&&(n.formatting="link");var p=m(n);return n.linkText=!1,n.inline=n.f=d,p}if("<"===l&&e.match(/^(https?|ftps?):\/\/(?:[^\\>]|\\.)+>/,!1)){n.f=n.inline=c,i.highlightFormatting&&(n.formatting="link");var p=m(n);return p?p+=" ":p="",p+T.linkInline}if("<"===l&&e.match(/^[^> \\]+@(?:[^\\>]|\\.)+>/,!1)){n.f=n.inline=c,i.highlightFormatting&&(n.formatting="link");var p=m(n);return p?p+=" ":p="",p+T.linkEmail}if("<"===l&&e.match(/^(!--|[a-z]+(?:\s+[a-z_:.\-]+(?:\s*=\s*[^ >]+)?)*\s*>)/i,!1)){var S=e.string.indexOf(">",e.pos);if(-1!=S){/markdown\s*=\s*('|"){0,1}1('|"){0,1}/.test(e.string.substring(e.start,S))&&(n.md_inside=!0)}return e.backUp(1),n.htmlState=t.startState(x),a(e,n,g)}if("<"===l&&e.match(/^\/\w*?>/))return n.md_inside=!1,"tag";var L=!1;if(!i.underscoresBreakWords&&"_"===l&&"_"!==e.peek()&&e.match(/(\w)/,!1)){var F=e.pos-2;if(F>=0){var q=e.string.charAt(F);"_"!==q&&q.match(/(\w)/,!1)&&(L=!0)}}if("*"===l||"_"===l&&!L)if(o&&" "===e.peek());else{if(n.strong===l&&e.eat(l)){i.highlightFormatting&&(n.formatting="strong");var k=m(n);return n.strong=!1,k}if(!n.strong&&e.eat(l))return n.strong=l,i.highlightFormatting&&(n.formatting="strong"),m(n);if(n.em===l){i.highlightFormatting&&(n.formatting="em");var k=m(n);return n.em=!1,k}if(!n.em)return n.em=l,i.highlightFormatting&&(n.formatting="em"),m(n)}else if(" "===l&&(e.eat("*")||e.eat("_"))){if(" "===e.peek())return m(n);e.backUp(1)}if(i.strikethrough)if("~"===l&&e.eatWhile(l)){if(n.strikethrough){i.highlightFormatting&&(n.formatting="strikethrough");var k=m(n);return n.strikethrough=!1,k}if(e.match(/^[^\s]/,!1))return n.strikethrough=!0,i.highlightFormatting&&(n.formatting="strikethrough"),m(n)}else if(" "===l&&e.match(/^~~/,!0)){if(" "===e.peek())return m(n);e.backUp(2)}return" "===l&&(e.match(/ +$/,!1)?n.trailingSpace++:n.trailingSpace&&(n.trailingSpaceNewLine=!0)),m(n)}function c(t,e){if(">"===t.next()){e.f=e.inline=u,i.highlightFormatting&&(e.formatting="link");var n=m(e);return n?n+=" ":n="",n+T.linkInline}return t.match(/^[^>]+/,!0),T.linkInline}function d(t,e){if(t.eatSpace())return null;var n=t.next();return"("===n||"["===n?(e.f=e.inline=k("("===n?")":"]"),i.highlightFormatting&&(e.formatting="link-string"),e.linkHref=!0,m(e)):"error"}function k(t){return function(e,n){if(e.next()===t){n.f=n.inline=u,i.highlightFormatting&&(n.formatting="link-string");var r=m(n);return n.linkHref=!1,r}return e.match(D[t]),n.linkHref=!0,m(n)}}function p(t,e){return t.match(/^([^\]\\]|\\.)*\]:/,!1)?(e.f=v,t.next(),i.highlightFormatting&&(e.formatting="link"),e.linkText=!0,m(e)):r(t,e,u)}function v(t,e){if(t.match(/^\]:/,!0)){e.f=e.inline=S,i.highlightFormatting&&(e.formatting="link");var n=m(e);return e.linkText=!1,n}return t.match(/^([^\]\\]|\\.)+/,!0),T.linkText}function S(t,e){return t.eatSpace()?null:(t.match(/^[^\s]+/,!0),void 0===t.peek()?e.linkTitle=!0:t.match(/^(?:\s+(?:"(?:[^"\\]|\\\\|\\.)+"|'(?:[^'\\]|\\\\|\\.)+'|\((?:[^)\\]|\\\\|\\.)+\)))?/,!0),e.f=e.inline=u,T.linkHref+" url")}var x=t.getMode(e,"text/html"),L="null"==x.name;void 0===i.highlightFormatting&&(i.highlightFormatting=!1),void 0===i.maxBlockquoteDepth&&(i.maxBlockquoteDepth=0),void 0===i.underscoresBreakWords&&(i.underscoresBreakWords=!0),void 0===i.taskLists&&(i.taskLists=!1),void 0===i.strikethrough&&(i.strikethrough=!1),void 0===i.tokenTypeOverrides&&(i.tokenTypeOverrides={});var T={header:"header",code:"comment",quote:"quote",list1:"variable-2",list2:"variable-3",list3:"keyword",hr:"hr",image:"image",imageAltText:"image-alt-text",imageMarker:"image-marker",formatting:"formatting",linkInline:"link",linkEmail:"link",linkText:"link",linkHref:"string",em:"em",strong:"strong",strikethrough:"strikethrough"};for(var F in T)T.hasOwnProperty(F)&&i.tokenTypeOverrides[F]&&(T[F]=i.tokenTypeOverrides[F]);var q=/^([*\-_])(?:\s*\1){2,}\s*$/,M=/^(?:[*\-+]|^[0-9]+([.)]))\s+/,b=/^\[(x| )\](?=\s)/,w=i.allowAtxHeaderWithoutSpace?/^(#+)/:/^(#+)(?: |$)/,C=/^ *(?:\={1,}|-{1,})\s*$/,y=/^[^#!\[\]*_\\<>` "'(~]+/,B=new RegExp("^("+(!0===i.fencedCodeBlocks?"~~~+|```+":i.fencedCodeBlocks)+")[ \\t]*([\\w+#-]*)"),D={")":/^(?:[^\\\(\)]|\\.|\((?:[^\\\(\)]|\\.)*\))*?(?=\))/,"]":/^(?:[^\\\[\]]|\\.|\[(?:[^\\\[\\]]|\\.)*\])*?(?=\])/},_={startState:function(){return{f:h,prevLine:null,thisLine:null,block:h,htmlState:null,indentation:0,inline:u,text:f,formatting:!1,linkText:!1,linkHref:!1,linkTitle:!1,code:0,em:!1,strong:!1,header:0,hr:!1,taskList:!1,list:!1,listStack:[],quote:0,trailingSpace:0,trailingSpaceNewLine:!1,strikethrough:!1,fencedChars:null}},copyState:function(e){return{f:e.f,prevLine:e.prevLine,thisLine:e.thisLine,block:e.block,htmlState:e.htmlState&&t.copyState(x,e.htmlState),indentation:e.indentation,localMode:e.localMode,localState:e.localMode?t.copyState(e.localMode,e.localState):null,inline:e.inline,text:e.text,formatting:!1,linkTitle:e.linkTitle,code:e.code,em:e.em,strong:e.strong,strikethrough:e.strikethrough,header:e.header,hr:e.hr,taskList:e.taskList,list:e.list,listStack:e.listStack.slice(0),quote:e.quote,indentedCode:e.indentedCode,trailingSpace:e.trailingSpace,trailingSpaceNewLine:e.trailingSpaceNewLine,md_inside:e.md_inside,fencedChars:e.fencedChars}},token:function(t,e){if(e.formatting=!1,t!=e.thisLine){var i=e.header||e.hr;if(e.header=0,e.hr=!1,t.match(/^\s*$/,!0)||i){if(l(e),!i)return null;e.prevLine=null}e.prevLine=e.thisLine,e.thisLine=t,e.taskList=!1,e.trailingSpace=0,e.trailingSpaceNewLine=!1,e.f=e.block;var n=t.match(/^\s*/,!0)[0].replace(/\t/g,"    ").length;if(e.indentationDiff=Math.min(n-e.indentation,4),e.indentation=e.indentation+e.indentationDiff,n>0)return null}return e.f(t,e)},innerMode:function(t){return t.block==g?{state:t.htmlState,mode:x}:t.localState?{state:t.localState,mode:t.localMode}:{state:t,mode:_}},blankLine:l,getType:m,closeBrackets:"()[]{}''\"\"``",fold:"markdown"};return _},"xml"),t.defineMIME("text/x-markdown","markdown")});