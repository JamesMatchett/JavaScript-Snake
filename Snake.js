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
    if (d<1){
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
      if (d<scl){
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
    
    //stop it from continuing to move parallel to the thing
    
    
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
}