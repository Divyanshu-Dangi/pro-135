function setup() {
  canvas = createCanvas(380,380);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(380,380);
  video.hide();
}
function start()
{
  Objectdetector=ml5.objectDetector('cocossd',modelloaded);
  document.getElementById("status").innerHTML="status:detecting objects";
}

status="";
img="";
objects =[];
function modelloaded()
{
    console.log("model is loaded");
    status=true;
    Objectdetector.detect(video,gotresults);
}

function gotresults(error,results)
{
  if(error)
  {
    console.error(error);
  }  
  else{
    console.log(results);
    objects=results;
  }
}

function preload()
{
  img=loadImage("dog_cat.jpg")
}
function draw(){
   image(video, 0,0,380,380);
   r = random(255);
   g = random(255);
   b = random(255);
   if (status!="")
   {
    Objectdetector.detect(video,gotresults);
    for(i=0;i<objects.length;i++)
    {
      document.getElementById("status").innerHTML="Status:Object Detected";

      fill(r,g,b);
      percent= floor(objects[i].confidence*100);
      text(objects[i].label+ " " + percent + "%",objects[i].x+15,objects[i].y+15);
      noFill();
      stroke(r,g,b);
      rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
      if(objects[i].label=="person")
{
 document.getElementById("number_of_objects").innerHTML="Baby is detected";
}
else{
 document.getElementById("number_of_objects").innerHTML="Baby is not detected";
 playSound("alarm.mp3");
}
    }
  }
}