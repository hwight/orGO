//TO-DO:
//   add +/- charges
//  drag shapeElements
//   delete on chrome
//   undo/redo
//   eraser
//   canvas resizes pixels on window change
//   upon intersections show blue dots
//   benzene ring

var path,line,line3,firstPoint,lastPoint,shape;
var isDragging = false;
var isDB = false, isSB = false, isTB = false, isTX = false, isShape = false, isDot = false, isSolid = false;


paper.install(window);
//need to add way that when page is resized acount for it
paper.view.viewSize = [500, 500];


var db = document.getElementById('db'), sb = document.getElementById('sb'), tb = document.getElementById('tb');
var tx = document.getElementById('tx');
var tri= document.getElementById('tri'), square = document.getElementById('square'), pent= document.getElementById('pent'), hex = document.getElementById('hex'), hept = document.getElementById('hept'), octo = document.getElementById('octo');
var dotstereo = document.getElementById('dotstereo');
var solidStereo = document.getElementById('solidstereo');
var save = document.getElementById('save');


//once add text element is clicked, create a new text object
//and push to array of text elements
var textElements = [];
var thisTXT = -1;
tx.onclick= function (){
  isTX = true;
  isShape = false;
  // Create a centered text item at the center of the view:
  var text = new PointText({
  	fontSize: 15
  });

  text.position = new Point (100,100);
  textElements.push(text);
  thisTXT ++;

}

var shapeElements = [];
var thisShape = -1;
function addShape(points){
  if (isShape){
    // Create a Paper.js Path to draw a line into it:
    shape = new Path();
    shape.strokeColor = 'black';
    // How large should it be
    var radius = 40;
    // 0 to 2PI is a circle, so divide that by the number of points
    // in our object and that's how many radians we should put a new
    // point in order to draw the shape
    var angle = ((2 * Math.PI) / points);

    // For as many vertices in the shape, add a point
    for(i = 0; i <= points; i++) {

      // Add a new point to the object
      shape.add(new Point(
        // Radius * Math.cos(number of radians of the point) is the x position
        radius * Math.cos(angle * i),
        // And the same thing with Math.sin for the y position of the point
        radius * Math.sin(angle * i)
      ));
    }

    // Offset the shape so it's fully displayed on the canvas
    shape.position.x += 200;
    shape.position.y += 200;
    paper.view.draw();
    shapeElements.push(shape);
    thisShape ++;
  }
}
tri.onclick = function (){
  isShape = true;
  addShape(3);
}

square.onclick = function (){
  isShape = true;
  addShape(4);
}

pent.onclick = function (){
  isShape = true;
  addShape(5);
}

hex.onclick = function (){
  isShape = true;
  addShape(6);
}

hept.onclick = function (){
  isShape = true;
  addShape(7);
}

octo.onclick = function (){
  isShape = true;
  addShape(8);
}

db.onclick = function (){
  isDB = true;
  isSB = false;
  isTB = false;
  isTX= false;
  isShape = false;
}

sb.onclick = function(){
  isDB = false;
  isSB = true;
  isTB = false;
  isTX= false;
  isShape = false;
  isSolid= false;
  isDot = false;
}
tb.onclick = function (){
  isDB = false;
  isSB = false;
  isTB = true;
  isTX= false;
  isShape = false;
  isSolid= false;
  isDot = false;
}

dotstereo.onclick=function(){
  isDot = true;
  isSolid = false;
  isDB = false;
  isSB = false;
  isTB = false;
  isTX= false;
  isShape = false;
}

solidstereo.onclick=function(){
  isDot = false;
  isSolid = true;
  isDB = false;
  isSB = false;
  isTB = false;
  isTX= false;
  isShape = false;
}


//need to also add space
function onKeyDown(event) {
	// When a key is pressed, set the content of the text item:
  if (event.key == 'control')
  {
    if (isTX)
    {
      textElements[thisTXT].fontSize +=3;
    }
    else if (isShape)
    {
      shapeElements[thisShape].scale(1.1);
    }
  }

  if (event.key == 'right' || event.key == 'left' || event.key == 'up' || event.key =='down')
  {
    if (isShape && event.key == 'right')
    {
      shapeElements[thisShape].rotate(15);
    }
    else if (isShape && event.key == 'left')
    {
      shapeElements[thisShape].rotate(-15);
    }
  }
  if (event.key == 'command')
  {
    if (isTX)
    {
      textElements[thisTXT].fontSize -=3;
    }
    else if (isShape)
    {
      shapeElements[thisShape].scale(0.9);
    }
  }
  if (event.key == 'delete' || event.key == 'backspace' || event.key == '\b')
  {
    var str= textElements[thisTXT].content;
    textElements[thisTXT].content = str.substring(0, str.length - 1);
  }
  else if (isTX && event.key >= 'a' && event.key <= 'z' && event.key != 'right' && event.key != 'left'){
    var k = event.key;
    if (k != 'shift' && k != 'caps-lock' && k != 'enter' && k != 'control' && k != 'command' && k != 'up' && k != 'down')
    {
      if (event.modifiers.shift) {
          k= event.key.toUpperCase();
      }
      textElements[thisTXT].content += k;
    }
  }
}


function onMouseDown(event) {
    if (isTX)
    {
      textElements[thisTXT].position = event.point;
      paper.view.draw();
    }

    if (isShape)
    {
      shapeElements[thisShape].position = event.point;
      paper.view.draw();
    }
    isDragging= false;
    firstPoint = event.point;
    path = new Path();
    path.strokeColor = 'black';

    if (isSB || isDB || isTB)
    {
      if (path.segments.length == 0) {
          path.add(event.point);
      }
      // Add a segment to the path at the position of the mouse:
      path.add(event.point);

      if (isDB || isTB)
      {
        line = new Path();
        if (line.segments.length == 0) {
            line.add(event.point);
        }
        // Add a segment to the path at the position of the mouse:
        line.add(event.point);

      }

      if(isTB)
      {
        line3 = new Path();
        if (line3.segments.length == 0) {
            line3.add(event.point);
        }
        // Add a segment to the path at the position of the mouse:
        line3.add(event.point);
      }
    }



    if (isDot)
    {
      path.add(firstPoint);
      tool.fixedDistance = 3;
    }

    if (isSolid)
    {
      path = new Path();
      path.fillColor = 'black';
      tool.fixedDistance =3;
      path.add(event.point);
    }
}


function getSlope (firstPoint, lastPoint)
{
  var num = firstPoint.y-lastPoint.y;
  var denom = firstPoint.x-lastPoint.x;
  return (num/denom);
}

function onMouseDrag(event) {
    if (isSB == true)
    {
      path.lastSegment.point = event.point;
    }

    else if (isDB == true || isTB == true)
    {
      line.remove();
      path.lastSegment.point = event.point;
      line.strokeColor = 'blue';
      line = path.clone();
      var slope = getSlope(firstPoint, event.point);

      if (slope > -0.3 && slope < 0.3)
      {
        line = line.translate(0,10);
      }
      else{
  		    line = line.translate(10,0);
        }

     if (isTB)
      {
        line3.remove();
        line3.strokeColor = 'red';
        line3 = path.clone();
        if (slope > -0.3 && slope < 0.3)
        {
          line3 = line3.translate(0,20);
        }
        else{
            line3 = line3.translate(20,0);
          }
      }
    }

    else if (isDot)
    {
      var step = event.delta;
      step.angle += 90;

      var top = event.middlePoint + step;
      var bottom = event.middlePoint - step;

      var l = new Path();
      l.strokeColor = 'black';
      l.add(top);
      l.add(bottom);
      tool.fixedDistance += (0.15*tool.fixedDistance);
    }

    if(isSolid){
    		var step = event.delta / 2;
    		step.angle += 90;

    		var top = event.middlePoint + step;
    		var bottom = event.middlePoint - step;

    		path.add(top);
    		path.insert(0, bottom);
    		path.smooth();
    		tool.fixedDistance += (0.25*tool.fixedDistance);
    }



}






$('#save').click(function() {
  console.log(paper.project);
  var svg = paper.project.exportJSON({asString: true});
  console.log(svg);
});
