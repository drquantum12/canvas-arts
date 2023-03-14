
const height = 600;
const width = 1200;
// layer 1 for curves
const layer1 = document.getElementById("layer1");
const ctx1 = layer1.getContext("2d");

layer1.style.width = `${width}px`;
layer1.style.height = `${height}px`;

const scale = window.devicePixelRatio;
layer1.width = Math.floor(width * scale);
layer1.height = Math.floor(height * scale);
ctx1.scale(scale,scale);

const midx = layer1.width/4;
const midy = layer1.height/4;

// layer 2 for arrows
const layer2 = document.getElementById("layer2");
const ctx2 = layer2.getContext("2d");

layer2.style.width = `${width}px`;
layer2.style.height = `${height}px`;

layer2.width = Math.floor(width * scale);
layer2.height = Math.floor(height * scale);
ctx2.scale(scale,scale);


class Circle {
    constructor(cx, cy, r, width, radians, velocity, isLastCircle=false) {
        this.cx = cx;
        this.cy = cy;
        this.radius = r;
        this.radians = radians;
        this.velocity = velocity;
        this.width = width;
        this.isLastCircle = isLastCircle;
        this.prev_point = { x: this.cx+this.radius*Math.cos(this.radians), y: this.cy+this.radius*Math.sin(this.radians)};

        this.update = (x_parent, y_parent,isChild=false) => { 
            this.radians += this.velocity;
            if(isChild){
            this.cx = x_parent;
            this.cy = y_parent;
            }
            let p1 = {x:this.cx, y:this.cy};
            let p2 = { x: this.cx + this.radius*Math.cos(this.radians), y: this.cy + this.radius*Math.sin(this.radians) };

            if(this.isLastCircle){
            ctx1.beginPath();
            ctx1.moveTo(this.prev_point.x,this.prev_point.y);
            ctx1.lineTo(p2.x, p2.y);
            ctx1.stroke();
            // console.log(this.radius, 'working')
            }
            this.prev_point = p2;
            // console.log(this.prev_point);
            this.arrow(p1,p2,6);
        };

        this.arrow = (p1, p2, size) => {
            var angle = Math.atan2((p2.y - p1.y), (p2.x - p1.x));
            var hyp = Math.sqrt((p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y));
            
            ctx2.save();
            ctx2.translate(p1.x, p1.y);
            ctx2.rotate(angle);
// line
            ctx2.beginPath();
            ctx2.lineWidth = this.width;
            ctx2.moveTo(0,0);
            ctx2.lineTo(hyp - size, 0);
            ctx2.stroke();
// triangle
            ctx2.beginPath();
            ctx2.lineTo(hyp - size, size);
            ctx2.lineTo(hyp, 0);
            ctx2.lineTo(hyp - size, -size);
            ctx2.fill();

            ctx2.restore();

        };

    }
}
const getRandomRadian = () =>{
    let deg = Math.random()*360;
    let r = deg*(Math.PI/180);
    return r;
    
}

const getRandomVelocity = () => {
    let v = Math.random()*0.1;
    // console.log(v);
    return v;
}
let circles = [];
var cx = midx;
var cy = midy;
rad = 200;

for(let i =0; i<5;i++){
    if(i == 4){
    let c = new Circle(cx,cy, rad, 2, getRandomRadian(), 0.8*4/rad,true);
    circles.push(c);
    cx = c.prev_point.x;
    cy = c.prev_point.y;
    rad -= 40;
    }
    else{
    let c = new Circle(cx,cy, rad, 2, getRandomRadian(), 0.8*4/rad);
    circles.push(c);
    cx = c.prev_point.x;
    cy = c.prev_point.y;
    rad -= 40;
    }
    
}

console.log(circles);
let px, py;
function animate(){
    requestAnimationFrame(animate);
    // clearing layer 2 for arrows
    ctx2.clearRect(0,0,layer2.width,layer2.height);
    
    for(let i=0; i< circles.length;i++){
        if(i==0){
            circles[i].update();
            px = circles[i].prev_point.x;
            py = circles[i].prev_point.y; 
        }
        else{
            circles[i].update(px,py,true);
            px = circles[i].prev_point.x;
            py = circles[i].prev_point.y; 
        }
    }
}


// handle's submit button
// $('#submitComponent').click(function(){
//     let radius = $('#radius').val();
//     let velocity = $('#velocity').val();
//     alert(`${radius}, ${velocity}`)
// })


// c.update();
// animate();