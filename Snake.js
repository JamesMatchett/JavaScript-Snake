var s = new Snake() 
var scl = 20;
var food;
var currDir = (0,0);
disableScroll();

//watch constructor class tutorial
function setup() {
  createCanvas(495, 495);
  s = new Snake();
  frameRate(15); 
  pickLocation();
  
}

function pickLocation(){
  var cols = floor(width/scl);
  var rows = floor(height/scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

function mousePressed(){
  s.total++;
}

function draw() {
  background(51)
  s.death();
  s.update();
  s.reappear();
  s.show();
  
  if(s.eat(food)){
   pickLocation();
  }
  
  fill(255,0,100);
  rect(food.x, food.y, scl, scl);
}

function keyPressed(){
  
  if (keyCode === UP_ARROW){
    
    s.dir(0, -1);
    currDir = (0, -1);
  } else if (keyCode === DOWN_ARROW){
    s.dir(0,1);
    currDir = (0,1)
  } else if (keyCode === RIGHT_ARROW){
    s.dir(1, 0);
    currDir = (1,0);
  } else if (keyCode === LEFT_ARROW){
    s.dir(-1, 0);
    currDir = (-1, 0);
  } else if (keyCode === 32){
    s.reset();
  }
}

function Snake(){
  this.x = 0*scl;
  this.y = 1*scl;
  this.xspeed =1;
  this.yspeed=0;
  this.total = 0;
  this.tail = [];
  
  this.dir = function(x,y){
    this.xspeed = x;
    this.yspeed = y;
  }
  
  
  this.eat = function(pos){
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d<scl){
      this.total++;
      return true;
    } else{
      return
    }
    
  }
  
  this.death = function (){
    for(var i = 0; i < this.tail.length; i++){
      var pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y);
      if (d<1){
        console.log('starting over');
        this.total = 0;
        this.tail = [];
        
      }
    }
  }
  
  this.reset = function(){
    this.x = 1*scl;
    this.y = 1*scl;
    this.total = 0;
    this.tail = [];
    
  }
  
  
  //makes the snake appear out the other side if it hits an edge
  this.reappear = function(){
    
    var d1;
    var d2;
    var d3;
    var d4;
    
    
    
    //right edge
    if (this.x > width){
     
        this.x = (0*scl);
      
      //left edge
    } if (this.x < -1){
      
        this.x = (width);
      }
      //top edge
    if (this.y < (height-height)-1*scl){
      
        this.y = height;
      
      //bottom edge
    }if (this.y > height){
     
        this.y = (height-height);
      
    } 
    
    //stop it from continuing to move paralell to the thing
    
    
  }
  
  this.update = function(){
    if(this.total === this.tail.length){
      for (var i = 0; i<this.tail.length-1; i++ ){
      this.tail[i] = this.tail[i+1];
    }
    }
    this.tail[this.total-1] = createVector(this.x, this.y); 
    
    
    
    
    
    
    
    
    this.x = this.x + this.xspeed*scl;
    this.y = this.y + this.yspeed*scl;
    //add if on edge, appear at the opposite edge
    
   this.x = constrain(this.x, -1*scl, width + scl);
    //this.y = constrain(this.y, 0, height + scl);
     
    
   
    
    
  }
  
  this.show = function(){
    fill(255);
    for (var i = 0; i < this.total; i++ ){
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
      
    }
    fill(255);
    rect(this.x, this.y, scl, scl);
  }
  
  var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null; 
    window.onwheel = null; 
    window.ontouchmove = null;  
    document.onkeydown = null;  
}
}
