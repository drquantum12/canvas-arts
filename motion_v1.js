const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function setup() {
      const height = 500;
      const width = 1200;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const scale = window.devicePixelRatio;
      canvas.width = Math.floor(width * scale);
      canvas.height = Math.floor(height * scale);
      ctx.scale(scale,scale);
    }


function Planet(x,y,radius,color){
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.radians = 0;
  this.velocity = 0.05;
  // using just x = acos_theta and y = bsin_theta
  // x**2/a**2 + y**2/b**2 = 1

  this.update = () =>{
    this.radians += this.velocity;
    this.x = x + 3*Math.cos(this.radians)*100;
    this.y = y + 1*Math.sin(this.radians)*100;
    this.draw();
  };
  this.draw = () =>{
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius,0,2*Math.PI,false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}
let planet;
function init(){
  planet = new Planet(canvas.width/4,canvas.height/4,10,'rgb(35, 55, 103)');

}

function animate(){
  requestAnimationFrame(animate);
  ctx.fillStyle = 'rgba(255,255,255,0.1)';
  // ctx.fillStyle = 'rgba(0,0,0,0.1)';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  planet.update();
}
setup()
init()
// animate() 