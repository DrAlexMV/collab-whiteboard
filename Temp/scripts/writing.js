/**
 * Created with JetBrains WebStorm.
 * User: alexanderventura
 * Date: 11/7/13
 * Time: 5:13 PM
 * To change this template use File | Settings | File Templates.
 */

var canvas, stage, copyCanvas;
var drawingCanvas;
var oldPt;
var oldMidPt;
var title;
var color;
var stroke;

function initStage() {
    canvas = document.getElementById("writingCanvas");
    copyCanvas = document.getElementById("copyCanvas");

    canvas.width = 500;
    canvas.height = 250;
    copyCanvas.width = 500;
    copyCanvas.height = 250;
    color = "#FFFF";
    stroke = "5";

    //check to see if we are running in a browser with touch support
    stage = new createjs.Stage(canvas);
    stage.autoClear = false;
    stage.enableDOMEvents(true);

    createjs.Touch.enable(stage);
    createjs.Ticker.setFPS(24);

    drawingCanvas = new createjs.Shape();

    stage.addEventListener("stagemousedown", handleMouseDown);
    stage.addEventListener("stagemouseup", handleMouseUp);

    stage.addChild(drawingCanvas);
    stage.update();

    //
    setInterval(function() {
        var png = canvas.toDataURL();
        var context = copyCanvas.getContext("2d");
        var imageData = new Image();
        imageData.src = png;
        imageData.onload = function() {
            context.drawImage(imageData, 0, 0);
        };
    }, 30);
}

function stop() {}

function handleMouseDown(event) {
    oldPt = new createjs.Point(stage.mouseX, stage.mouseY);
    oldMidPt = oldPt;
    stage.addEventListener("stagemousemove" , handleMouseMove);
}

function handleMouseMove(event) {
    var midPt = new createjs.Point(oldPt.x + stage.mouseX>>1, oldPt.y+stage.mouseY>>1);

    drawingCanvas.graphics.clear().setStrokeStyle(stroke, 'round', 'round').beginStroke(color).moveTo(midPt.x, midPt.y).curveTo(oldPt.x, oldPt.y, oldMidPt.x, oldMidPt.y);

    oldPt.x = stage.mouseX;
    oldPt.y = stage.mouseY;

    oldMidPt.x = midPt.x;
    oldMidPt.y = midPt.y;

    stage.update();
}

function handleMouseUp(event) {
    stage.removeEventListener("stagemousemove" , handleMouseMove);
}
