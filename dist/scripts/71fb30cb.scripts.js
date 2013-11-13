"use strict";angular.module("WhiteBoardApp",["firebase","ngRoute","ngEkathuwa","angularBootstrapNavTree","$strap.directives"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/classroom",{templateUrl:"views/classroom.html",controller:"ClassroomCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("WhiteBoardApp").controller("MainCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("WhiteBoardApp").controller("ClassroomCtrl",["$scope","$ekathuwa",function(a,b){a.directory=[{label:"AlexanderVentura",children:["Hello","World"]}],a.addNewBlackboardModal=function(){b.modal({id:"addNewBlackboard",scope:a,headerText:"Add a new Blackboard.",bodyTemplateURL:"views/addNewBlackboardModal.html"})},a.clearBlackboard=function(){a.$emit("clearBlackboard")}}]),angular.module("WhiteBoardApp").directive("blackboard",["$timeout","angularFire",function(a,b){return{templateUrl:"views/blackboard.html",restrict:"E",link:function(a,c,d){var e=c.children()[0],f="#DECDC1",g="5";e.width=d.width?d.width:1140,e.height=d.height?d.height:600;var h=new createjs.Stage(e);h.autoClear=!1,h.enableDOMEvents(!0),createjs.Touch.enable(h);var i=new createjs.Shape;a.clearCanvas=h.toDataURL();var j="https://classnote.firebaseio.com/";a.pngCode,b(new Firebase(j+"test/"),a,"pngCode");var k,l,m=function(){var a=new createjs.Point(k.x+h.mouseX>>1,k.y+h.mouseY>>1);i.graphics.clear().setStrokeStyle(g,"round","round").beginStroke(f).moveTo(a.x,a.y).curveTo(k.x,k.y,l.x,l.y),k.x=h.mouseX,k.y=h.mouseY,l.x=a.x,l.y=a.y,h.update()},n=function(){h.removeEventListener("stagemousemove",m),a.$apply(function(){a.pngCode=h.toDataURL()})},o=function(){k=new createjs.Point(h.mouseX,h.mouseY),l=k,h.addEventListener("stagemousemove",m)};h.addEventListener("stagemousedown",o),h.addEventListener("stagemouseup",n),h.addChild(i),h.update();var p=function(a){var b=e.getContext("2d"),c=new Image;c.src=a,c.onload=function(){b.drawImage(c,0,0)}};a.$watch("pngCode",function(){p(a.pngCode)}),a.$on("clearBlackboard",function(){console.log("Clearing"),h.clear(),a.pngCode=h.toDataURL()})}}}]),angular.module("WhiteBoardApp").directive("treeview",function(){return{templateUrl:"views/treeView.html",scope:{data:"="},restrict:"E",link:function(){}}}),angular.module("WhiteBoardApp").directive("colorPicker",function(){return{templateURL:"views/colorPicker.html",restrict:"E",link:function(a){a.test="test",a.palette=["#FFFF","#0000"]}}});