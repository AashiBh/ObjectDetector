status1="";
input="";
objects=[];
function preload(){

}
function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}
function start(){
    objectDector=ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    input = document.getElementById("input").value;
}
function draw(){
    image(video,0,0,380,380);
    if(status1 !=""){
        objectDector.detect(video, gotResult);
        for(i=0;i<objects.length;i++){
            if(input==objects[i].label){
                document.getElementById("status").innerHTML="Status: Objects Detected";
                document.getElementById("object").innerHTML = "Number of objects detected are: " + objects.length;
                fill("blue")
                percent=floor(objects[i].confidence*100);
                text(objects[i].label+ " " + percent + "%", objects[i].x,objects[i].y);
                noFill();
                stroke("blue")
                rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
            }
            else{
                document.getElementById("status").innerHTML="Status: Objects Not Detected";
            }
               }
    }
}
function gotResult(error,result){
if(error){
    console.log(error)
}
console.log(result)
}
function modelLoaded(){
    status1=true;
    console.log("model loaded");
}