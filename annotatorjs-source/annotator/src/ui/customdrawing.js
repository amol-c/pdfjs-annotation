"use strict";

var util = require('../util');
var fabric = require('fabric').fabric

var $ = util.$;
var Promise = util.Promise;

// This is to copy the ids over on calling toDatalessJSON.
fabric.Object.prototype.toObject = (function (toObject) {
  return function () {
      return fabric.util.object.extend(toObject.call(this), {
          id: this.id,
          tpt_type: this.tpt_type
      });
  };
})(fabric.Object.prototype.toObject);

var CustomDrawing = exports.CustomDrawing = function CustomDrawing(options) {
  var c = document.getElementById('the-canvas');
  var ctx = c.getContext("2d");
  var bg = c.toDataURL("image/png");

  var canvas = new fabric.Canvas('the-canvas', {
    isDrawingMode: true
  });

  canvas.setBackgroundImage(bg,canvas.renderAll.bind(canvas));

  this._canvas = canvas
  canvas.freeDrawingBrush.color = "red";
  canvas.freeDrawingBrush.width = parseInt(2, 10) || 1;
  canvas.freeDrawingBrush.shadow = new fabric.Shadow({
    blur: parseInt(2, 10) || 0,
    offsetX: 0,
    offsetY: 0,
    affectStroke: true,
    color: "red",
  });

  $("#zoom-in").click(() => {
    var zoom = canvas.getZoom();
    zoom = zoom + 10/200;
    if (zoom > 20) zoom = 20;
    if (zoom < 0.01) zoom = 0.01;
    canvas.setZoom(zoom);
    $("#text-layer").animate({ 'zoom': zoom }, 400);
  })

  $("#zoom-out").click(() => {
    var zoom = canvas.getZoom();
    zoom = zoom - 10/200;
    if (zoom > 20) zoom = 20;
    if (zoom < 0.01) zoom = 0.01;
    canvas.setZoom(zoom);
    $("#text-layer").animate({ 'zoom': zoom }, 400);
  })  

  $("#add-textbox").click(() => {
      var textBox = new fabric.Textbox('MyText', {
        width: 150,
        top: 5,
        left: 5,
        fontSize: 16,
        textAlign: 'center',
        text: 'MY TEXT',
        editable: true
    });

    canvas.add(textBox)
  })

  var self = this;

  // $("#save-pdf").click(function() {
  //   canvas.isDrawingMode = !canvas.isDrawingMode;
  //   canvas.setBackgroundImage(null)
  //   var objectsJson = canvas.toDatalessJSON().objects
  //   self.options.onSave(objectsJson)
  //   canvas.setBackgroundImage(bg,canvas.renderAll.bind(canvas))
  // })

  $("#hand-tool").click(function() {
    canvas.isDrawingMode = !canvas.isDrawingMode
  })

  this.options = $.extend(true, {}, CustomDrawing.options, options);
};

CustomDrawing.options = {
  // The CSS class to apply to drawn highlights
  onSave: function() {},
  onCreate: function() {},
  onUpdate: function() {}
};

CustomDrawing.prototype.updateAnnotation = function (annotation) {
  console.log(annotation)
  const items = this._canvas.getObjects()
  const item = items.find((element) => {
    return element.id === annotation.id
  })

  item.id = annotation.id
  item.tpt_type = annotation.tpt_type
}

CustomDrawing.prototype.drawAll = function (annotations) {
  var self = this;

  var p = new Promise(function (resolve) {
    if (annotations.length === 0) {
      addObjectAddedListener.call(self)
      resolve()
      return
    }

    var annotationObjects = annotations;

    console.log(annotationObjects)

    var backgroundImage = self._canvas.backgroundImage
    self._canvas = self._canvas.loadFromJSON({objects: annotationObjects})
    self._canvas.setBackgroundImage(backgroundImage, self._canvas.renderAll.bind(self._canvas));
    addObjectAddedListener.call(self)

    resolve()
  })
  return p
};

// Public: Draw highlights for the annotation.
//
// annotation - An annotation Object for which to draw highlights.
//
// Returns an Array of drawn highlight elements.
CustomDrawing.prototype.draw = function (annotation) {

};

// Public: Remove the drawn highlights for the given annotation.
//
// annotation - An annotation Object for which to purge highlights.
//
// Returns nothing.
CustomDrawing.prototype.undraw = function (annotation) {
  
};

// Public: Redraw the highlights for the given annotation.
//
// annotation - An annotation Object for which to redraw highlights.
//
// Returns the list of newly-drawn highlights.
CustomDrawing.prototype.redraw = function (annotation) {

};


function addObjectAddedListener() {
  var self = this
  this._canvas.on("object:added", function({target}) {
    var obj = self._canvas.toJSON().objects[self._canvas.size() - 1]
    if(target.type === "textbox") {
      obj.text = target.text
      obj.editable = target.editable
      obj.fontSize = target.fontSize
    }

    obj.tpt_type = "customDrawing"
    self.options.onCreate(obj)

    console.log(obj)
  })

  this._canvas.on("object:modified", function({e, target}) {
    // var obj = self._canvas.toDatalessJSON().objects[self._canvas.size() - 1]

    const id = target.id
    const objects = self._canvas.toDatalessJSON().objects
    var obj = objects.find(function(element) {
      return element.id === target.id
    })

    if(target.type === "textbox") {
      obj.text = target.text
      obj.editable = target.editable
      obj.fontSize = target.fontSize
    }

    self.options.onUpdate(obj)


    console.log(obj)
  })
}
