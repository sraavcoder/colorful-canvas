 var drawing = [];
 var currentPath = [];
 var colorpicker;
 var colorpicker2;
 var isDrawing = false;
function setup(){

  database = firebase.database();

  canvas = createCanvas(1000,700);
  canvas.parent('canvascontainer')
  canvas.mousePressed(startPath);
  canvas.mouseReleased(stopDrawing);
  colorpicker = createColorPicker('#ed225d');
  colorpicker.position(10,height+10);
  colorpicker2 = createColorPicker(color('grey'));
  colorpicker2.position(60,height+10);

  save = createButton('SAVE');
  save.mousePressed(()=>{
    var ref = database.ref('drawings');
    var data = {
      
     drawing:drawing
    }
    ref.push(data);
  })
}
function startPath(){
  isDrawing = true;
  currentPath = [];
  drawing.push(currentPath)
}
function stopDrawing(){
  isDrawing = false;
}

function draw(){
  background(colorpicker2.color())

  save.position(width+10,20)
   if(isDrawing){
     var point = {
       x:mouseX,
       y:mouseY
     }
     currentPath.push(point);
   }
   
   stroke(colorpicker.color());
   strokeWeight(10);
   noFill();
   for(var i = 0; i < drawing.length; i++){
     beginShape();
    var path = drawing[i];
     
    for(var j = 0; j < path.length; j++){
    
    vertex(path[j].x,path[j].y);
    }
   endShape(); 
   }

   
}