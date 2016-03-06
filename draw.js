var path,line,line3,firstPoint,lastPoint;

var isDragging = false;
var isDB = false, isSB = false, isTB = false;

//need to add way that when page is resized acount for it
paper.view.viewSize = [500, 500];

var db = document.getElementById('db'), sb = document.getElementById('sb'), tb = document.getElementById('tb');

db.onclick = function (){
  isDB = true;
  isSB = false;
  isTB = false;
}

sb.onclick = function(){
  isDB = false;
  isSB = true;
  isTB = false;
}
tb.onclick = function (){
  isDB = false;
  isSB = false;
  isTB = true;
}

function onMouseDown(event) {
    isDragging= false;
    firstPoint = event.point;
    path = new Path();
    path.strokeColor = 'black';
}

function onMouseDrag(event) {
    if (isDB == true)
    {
      if (isDragging == false){
        path = new Path();
        line = new Path();
        path.strokeColor = 'black';
        line.strokeColor = 'black';
        path.add(firstPoint);
        line.add(new Point(firstPoint.x+50, firstPoint.y));
        isDragging = true;
      }
      else{
        path.add(event.point);
        lastPoint = event.point;
        line.add(new Point(event.point.x+50, event.point.y));
      }

      path.removeOnUp();
      line.removeOnUp();
    }

    else if (isSB == true)
    {
        path.add(event.point);
        lastPoint = event.point;
        path.removeOnUp();
    }


    else if (isTB == true)
    {
      if (isDragging == false){
        path = new Path();
        line = new Path();
        line3 = new Path();
        path.strokeColor = 'black';
        line.strokeColor = 'black';
        line3.strokeColor = 'black';
        path.add(firstPoint);
        line.add(new Point(firstPoint.x+25, firstPoint.y));
        line3.add(new Point(firstPoint.x+50, firstPoint.y));
        isDragging = true;
      }
      else{
        path.add(event.point);
        lastPoint = event.point;
        line.add(new Point(event.point.x+25, event.point.y));
        line3.add(new Point(event.point.x+50, event.point.y));
      }
      line.removeOnUp();
      path.removeOnUp();
      line3.removeOnUp();

    }


}

function onMouseUp(event) {
  if (isDB ==true)
  {
    if (isDragging){
      var myPath = new Path();
      myPath.strokeColor = 'black';
      myPath.add(firstPoint);
      myPath.add(lastPoint);

      var slope =( (firstPoint.y-lastPoint.y)/(firstPoint.x-lastPoint.x));

     var cop1 = new Path();
     cop1.strokeColor = 'black';

      if(slope >= 0)
      {
        var x1 = firstPoint.x + 20;
        var x2 = lastPoint.x + 20
        var denom = x1-x2;
        var y2 = lastPoint.y - 20;
        var y1 = denom * slope + y2;

        cop1.add(new Point (x1,y1));
        cop1.add (new Point (x2,y2));
        cop1.scale(0.7)
      }
      else{
          var x1 = firstPoint.x + 20;
          var x2 = lastPoint.x + 20
          var denom = x1-x2;
          var y2 = lastPoint.y + 20;
          var y1 = denom * slope + y2;

          cop1.add(new Point (x1,y1));
          cop1.add (new Point (x2,y2));
          cop1.scale (0.7);
       }
     }
   }

   else if (isTB ==true)
   {
     if (isDragging){
       var myPath = new Path();
       myPath.strokeColor = 'black';
       myPath.add(firstPoint);
       myPath.add(lastPoint);

       var slope =( (firstPoint.y-lastPoint.y)/(firstPoint.x-lastPoint.x));

       var cop1 = new Path();
       cop1.strokeColor = 'black';

       var cop3 = new Path();
       cop3.strokeColor = 'black';

       if(slope >= 0)
       {
         var x1 = firstPoint.x + 20;
         var x2 = lastPoint.x + 20
         var denom = x1-x2;
         var y2 = lastPoint.y - 20;
         var y1 = denom * slope + y2;


        var x1a = x1 + 20;
        var x2a = x2 + 20;
        var denoma = x1a-x2a;
        var y2a = y2 - 20;
        var y1a = denoma * slope + y2a;

         cop1.add(new Point (x1,y1));
         cop1.add (new Point (x2,y2));
         cop1.scale(0.7);
         cop3.add(new Point (x1a,y1a));
         cop3.add (new Point (x2a,y2a));
         cop3.scale(0.7);

       }
       else{
           var x1 = firstPoint.x + 20;
           var x2 = lastPoint.x + 20
           var denom = x1-x2;
           var y2 = lastPoint.y + 20;
           var y1 = denom * slope + y2;

           var x1a = x1 + 20;
           var x2a = x2 + 20;
           var denoma = x1a-x2a;
           var y2a = y2 + 20;
           var y1a = denoma * slope + y2a;

           cop1.add(new Point (x1,y1));
           cop1.add (new Point (x2,y2));
           cop1.scale (0.7);
           cop3.add(new Point (x1a,y1a));
           cop3.add (new Point (x2a,y2a));
           cop3.scale(0.7);
        }
      }
    }

  else if (isSB == true)
  {
    var myPath = new Path();
    myPath.strokeColor = 'black';
    myPath.add(firstPoint);
    myPath.add(lastPoint);
  }

}
