!function(e){"function"==typeof define&&define.amd?define(["angular","bootstrap-slider"],e):"object"==typeof module&&module.exports?module.exports=e(require("angular"),require("bootstrap-slider")):window&&e(window.angular,window.Slider)}(function(e,i){e.module("ui.bootstrap-slider",[]).directive("slider",["$parse","$timeout","$rootScope",function(t,n,o){return{restrict:"AE",replace:!0,template:'<div><input class="slider-input" type="text" style="width:100%" /></div>',require:"ngModel",scope:{max:"=",min:"=",step:"=",value:"=",ngModel:"=",ngDisabled:"=",range:"=",sliderid:"=",ticks:"=",ticksLabels:"=",ticksSnapBounds:"=",ticksPositions:"=",scale:"=",focus:"=",formatter:"&",onStartSlide:"&",onStopSlide:"&",onSlide:"&"},link:function(n,o,a,r,s){function l(){function s(e,i,t){f[e]=i||t}function l(e,i,t){f[e]=i||0===i?parseFloat(i):t}function d(e,i,t){f[e]=i?i+""=="true":t}function p(i){return e.isString(i)&&0===i.indexOf("[")?e.fromJson(i):i}var f={};s("id",n.sliderid),s("orientation",a.orientation,"horizontal"),s("selection",a.selection,"before"),s("handle",a.handle,"round"),s("tooltip",a.sliderTooltip||a.tooltip,"show"),s("tooltip_position",a.sliderTooltipPosition,"top"),s("tooltipseparator",a.tooltipseparator,":"),s("ticks",n.ticks),s("ticks_labels",n.ticksLabels),s("ticks_snap_bounds",n.ticksSnapBounds),s("ticks_positions",n.ticksPositions),s("scale",n.scale,"linear"),s("focus",n.focus),l("min",n.min,0),l("max",n.max,10),l("step",n.step,1);var v=f.step+"",m=v.search(/[^.,]*$/),g=v.substring(m);if(l("precision",a.precision,g.length),d("tooltip_split",a.tooltipsplit,!1),d("enabled",a.enabled,!0),d("naturalarrowkeys",a.naturalarrowkeys,!1),d("reversed",a.reversed,!1),d("range",n.range,!1),f.range){if(e.isArray(n.value))f.value=n.value;else if(e.isString(n.value)){if(f.value=p(n.value),!e.isArray(f.value)){var b=parseFloat(n.value);isNaN(b)&&(b=5),b<n.min?(b=n.min,f.value=[b,f.max]):b>n.max?(b=n.max,f.value=[f.min,b]):f.value=[f.min,f.max]}}else f.value=[f.min,f.max];n.ngModel=f.value}else l("value",n.value,5);a.formatter&&(f.formatter=function(e){return n.formatter({value:e})}),"$"in window&&$.fn.slider&&($.fn.slider.constructor.prototype.disable=function(){this.picker.off()},$.fn.slider.constructor.prototype.enable=function(){this.picker.on()}),o[0].__slider&&o[0].__slider.destroy();var w=new i(o[0].getElementsByClassName("slider-input")[0],f);o[0].__slider=w;var S=p(a.updateevent);S=e.isString(S)?[S]:["slide"],e.forEach(S,function(e){w.on(e,function(e){r.$setViewValue(e)})}),w.on("change",function(e){r.$setViewValue(e.newValue)});var h={slideStart:"onStartSlide",slide:"onSlide",slideStop:"onStopSlide"};return e.forEach(h,function(e,i){var o=t(a[e]);w.on(i,function(i){n[e]&&n.$apply(function(){o(n.$parent,{$event:i,value:i})})})}),e.isFunction(c)&&(c(),c=null),c=n.$watch("ngDisabled",function(e){e?w.disable():w.enable()}),e.isFunction(u)&&u(),u=n.$watch("ngModel",function(e){n.range?w.setValue(e):w.setValue(parseFloat(e)),w.relayout()},!0),w}var u,c,d=l(),p=["min","max","step","range","scale","ticksLabels"];e.forEach(p,function(e){n.$watch(e,function(){d=l()})});var f=["relayout","refresh","resize"];e.forEach(f,function(i){e.isFunction(d[i])&&n.$on("slider:"+i,function(){d[i]()})})}}}])});