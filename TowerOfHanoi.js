      let inp = document.getElementById("inp"); 
      let cont = document.getElementById("container");       
      let canv = cont.getContext("2d");        
      let circleArr = [];
      let towerArr = [];
      let winningPattern = "";
      let userLastTowerPattern = "";
      let moves = 0;
      
      let maxNumOfCircles = 8;
      let numOfCirclesInGame = inp.value;
      numOfCirclesInGame = numOfCirclesInGame <= maxNumOfCircles ? numOfCirclesInGame <= 0 ? 1 : numOfCirclesInGame : 8;
            
      let towerHeight = 80;
      let radUp = (towerHeight-8)/maxNumOfCircles/2;
      
      let xMove;
      let yMove;
      let anim;
      
      function Circle(xa, ya, rad, poss)
      {      
        this.x = xa;
        this.y = ya;
        this.radiusSide = rad;
        this.radiusUp = radUp;
        
        this.lowest = 0;
        this.highest = 0;
        this.mostLeft = 0;
        this.mostRight = 0;   
        this.position = poss;
        this.touched = false;  
        this.mousseFixX;
        this.mousseFixY;
        
        canv.beginPath();
          canv.moveTo(this.x + Math.cos(0/57.2957795) * this.radiusSide, this.y + Math.sin(0/57.2957795) * this.radiusUp);
          for(let i = 0; i <= 360; i++)
          {
            canv.lineTo(this.x + Math.cos(i/57.2957795) * this.radiusSide, this.y + Math.sin(i/57.2957795) * this.radiusUp);
              
          }   
          canv.fillStyle = "black";
          canv.fill();
        canv.closePath();
           
        this.update = function()
        {
         
          if(this.touched == true)
          {
            this.x = xMove - this.mousseFixX;
            this.y = yMove - this.mousseFixY;
          
          }
          
          canv.beginPath();
            canv.moveTo(this.x + Math.cos(0/57.2957795) * this.radiusSide, this.y + Math.sin(0/57.2957795) * this.radiusUp); 
            for(let i = 0; i <= 361; i++)
            {
              canv.lineTo(this.x + Math.cos(i/57.2957795) * this.radiusSide, this.y + Math.sin(i/57.2957795) * this.radiusUp);
              
              if(i == 180)
              {
                this.mostLeft = this.x + Math.cos(i/57.2957795) * this.radiusSide;
              
              }
              
              if(i == 360)
              {
                this.mostRight = this.x + Math.cos(i/57.2957795) * this.radiusSide;
              
              }
              
              if(i == 270)
              {
                this.highest = this.y + Math.sin(i/57.2957795) * this.radiusUp;
              
              }
              
              if(i == 90)
              {
                this.lowest = this.y + Math.sin(i/57.2957795) * this.radiusUp;
              
              }
              
            }  
             
            canv.fillStyle = "black";
            canv.stroke();
            canv.fill();
          canv.closePath();
          
        }
         
      }  
        
      function Tower(xe, ye, pos)
      { 
        this.x = xe;
        this.y = ye;
        this.width = 100;
        this.height = towerHeight;
        this.pos = pos;
        this.circles = [];

        canv.beginPath();
          canv.rect(this.x, this.y+this.height, this.width, 10);
          canv.fillStyle = "red";
          canv.fill();
        canv.closePath();
        
        canv.beginPath();
          canv.rect(this.x+this.width/2-5, this.y, 10, this.height);
          canv.fillStyle = "red";
          canv.fill();
        canv.closePath();
        
        this.update = function()
        {          
          canv.beginPath();
            canv.rect(this.x, this.y+this.height, this.width, 10);
            canv.fillStyle = "red";
            canv.fill();
          canv.closePath();
        
          canv.beginPath();
            canv.rect(this.x+this.width/2-5, this.y, 10, this.height);
            canv.fillStyle = "red";
            canv.fill();
          canv.closePath();
      
        }      
      }     
      
      for(let i = 0; i < 3; i++)
      {
        towerArr.push(new Tower(100+(i*130), 200, i));
      
      }
   
      
      let startRadius = 15;
      let increaseOfRadius = (towerArr[0].width-(startRadius*2))/(maxNumOfCircles-1)/2;
      
      for(let j = 0; j < numOfCirclesInGame; j++)
      {                                                                                                            // to +1 u radUp*2 je kvùli lehèímu rozestupu mezi kruhy (aby nebyli napláclé na sobì)
        circleArr.push(new Circle(towerArr[0].x+(towerArr[0].width/2), (towerArr[0].y+towerArr[0].height-radUp)-((numOfCirclesInGame-1)-j)*(radUp*2+1), startRadius + (j*increaseOfRadius), 1));
                                                                                                                                              
      }
              
      for(let k = circleArr.length-1; k >= 0; k--)
      {
        towerArr[0].circles.push(circleArr[k].radiusSide);
        winningPattern+=circleArr[k].radiusSide;
         
      }           
    
      let spust = function() {   
        anim = requestAnimationFrame(spust);      
        canv.clearRect(0, 0, 1000, 1000);  
        
        for(let j = 0; j < towerArr.length; j++)
        {
          towerArr[j].update();
      
        }     
        
        for(let i = 0; i < circleArr.length; i++)
        {
          circleArr[i].update();
      
        }  
        
        userLastTowerPattern = "";
        for(let k = 0; k < towerArr[2].circles.length; k++)
        {
          userLastTowerPattern+=towerArr[2].circles[k];
      
        }       
        
        if(userLastTowerPattern == winningPattern)
        {
          alert("Konec hry. Vìž byla úspìšnì pøevedena na poslední stojan. Poèet tahù: " + moves);
          cancelAnimationFrame(anim);
        } 
                   
      }        
           
      spust();
      
      function clickk(event)
      {
        xMove = event.clientX-cont.offsetLeft;
        yMove = event.clientY-cont.offsetTop; 
        
        for(let i = 0; i < circleArr.length; i++)
        {
          if(xMove > circleArr[i].mostLeft && xMove < circleArr[i].mostRight && yMove > circleArr[i].highest && yMove < circleArr[i].lowest)
          {
            if(towerArr[circleArr[i].position-1].circles.indexOf(circleArr[i].radiusSide) > towerArr[circleArr[i].position-1].circles.length-2)
            { 
              circleArr[i].touched = true;
              circleArr[i].mousseFixX = xMove - circleArr[i].x;
              circleArr[i].mousseFixY = yMove - circleArr[i].y;
            
              break;
              
            }   
            
          }            
        }
                      
      }
      
      function end()
      {         
        for(let i = 0; i < circleArr.length; i++)
        {
          if(circleArr[i].touched == true)
          {
            for(let j = 0; j < towerArr.length; j++)
            {
              if(circleArr[i].x > towerArr[j].x && circleArr[i].x < towerArr[j].x + towerArr[j].width)
              {
                if(towerArr[j].circles[towerArr[j].circles.length-1] >= circleArr[i].radiusSide || towerArr[j].circles[towerArr[j].circles.length-1] == undefined)
                {         
                  towerArr[circleArr[i].position-1].circles.splice(towerArr[circleArr[i].position-1].circles.indexOf(circleArr[i].radiusSide), 1);
                 
                  circleArr[i].position = j+1;
                  circleArr[i].y = (towerArr[0].y+towerArr[0].height-circleArr[i].radiusUp) - (towerArr[j].circles.length*(circleArr[i].radiusUp*2+1))
                                   
                  towerArr[j].circles.push(circleArr[i].radiusSide);
                  moves++;
                  
                  break;
                
                } else {
                  
                  circleArr[i].y = (towerArr[0].y+towerArr[0].height-circleArr[i].radiusUp) - ((towerArr[circleArr[i].position-1].circles.length-1)*(circleArr[i].radiusUp*2+1));
              
                }
                
              } else {
                  
                circleArr[i].y = (towerArr[0].y+towerArr[0].height-circleArr[i].radiusUp) - ((towerArr[circleArr[i].position-1].circles.length-1)*(circleArr[i].radiusUp*2+1));
             
              }
            }
          }  
        
        }
             
        for(let k = 0; k < circleArr.length; k++)
        {
          circleArr[k].touched = false;
          circleArr[k].x = towerArr[circleArr[k].position-1].x + towerArr[circleArr[k].position-1].width/2;
          
        } 
           
      }
      
      function movement(event)
      {
        xMove = event.clientX-cont.offsetLeft;
        yMove = event.clientY-cont.offsetTop; 
                 
      }
      
      function restart()
      {
        circleArr = [];
        towerArr = [];
        moves = 0;
        userLastTowerPattern = "";
        winningPattern = "";
        numOfCirclesInGame = inp.value;
        numOfCirclesInGame = numOfCirclesInGame <= maxNumOfCircles ? numOfCirclesInGame <= 0 ? 1 : numOfCirclesInGame : 8;
        
        for(let i = 0; i < 3; i++)
        {
          towerArr.push(new Tower(100+(i*130), 200, i));
      
        }
      
        for(let j = 0; j < numOfCirclesInGame; j++)
        {                                                                                                            // to +1 u radUp*2 je kvùli lehèímu rozestupu mezi kruhy (aby nebyli napláclé na sob)
          circleArr.push(new Circle(towerArr[0].x+(towerArr[0].width/2), (towerArr[0].y+towerArr[0].height-radUp)-((numOfCirclesInGame-1)-j)*(radUp*2+1), startRadius + (j*increaseOfRadius), 1));
                                                                                                                                              
        }
              
        for(let k = circleArr.length-1; k >= 0; k--)
        {
          towerArr[0].circles.push(circleArr[k].radiusSide);
          winningPattern+=circleArr[k].radiusSide;
         
        }
        
        cancelAnimationFrame(anim);
        spust();           
      
      }
       
      cont.addEventListener("mousedown", function(){clickk(event)});
      cont.addEventListener("mouseup", function(){end()});
      cont.addEventListener("mousemove", function(){movement(event)});