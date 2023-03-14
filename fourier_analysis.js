
const height = innerHeight - 10;
const width = innerWidth - 10;
// layer 1 for curves
const layer1 = document.getElementById("layer1");
const ctx1 = layer1.getContext("2d");

layer1.style.width = `${width}px`;
layer1.style.height = `${height}px`;

const scale = window.devicePixelRatio;
layer1.width = Math.floor(width * scale);
layer1.height = Math.floor(height * scale);
ctx1.scale(scale, scale);

const midx = layer1.width / 4;
const midy = layer1.height / 4;

// layer 2 for arrows
const layer2 = document.getElementById("layer2");
const ctx2 = layer2.getContext("2d");

layer2.style.width = `${width}px`;
layer2.style.height = `${height}px`;

layer2.width = Math.floor(width * scale);
layer2.height = Math.floor(height * scale);
ctx2.scale(scale, scale);


class Circle {
    constructor(cx, cy, r, width, radians, velocity, direction, isLastCircle = false) {
        this.cx = cx;
        this.cy = cy;
        this.radius = r;
        this.radians = radians;
        this.velocity = velocity;
        this.direction = direction;
        this.width = width;
        this.isLastCircle = isLastCircle;
        this.prev_point = { x: this.cx + this.radius * Math.cos(this.radians), y: this.cy + this.radius * Math.sin(this.radians) };

        this.update = (x_parent, y_parent, isChild = false) => {
            this.radians += this.direction*this.velocity;
            if (isChild) {
                this.cx = x_parent;
                this.cy = y_parent;
            }
            let p1 = { x: this.cx, y: this.cy };
            let p2 = { x: this.cx + this.radius * Math.cos(this.radians), y: this.cy + this.radius * Math.sin(this.radians) };

            if (this.isLastCircle) {
                ctx1.beginPath();
                ctx1.moveTo(this.prev_point.x, this.prev_point.y);
                ctx1.lineTo(p2.x, p2.y);
                // ctx1.strokeStyle = 'white'
                ctx1.stroke();
                // console.log(this.radius, 'working')
            }
            this.prev_point = p2;
            // console.log(this.prev_point);
            this.arrow(p1, p2, 6);
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
            ctx2.moveTo(0, 0);
            ctx2.lineTo(hyp - size, 0);
            ctx2.strokeStyle = 'rgb(35, 55, 103)';
            ctx2.stroke();
            // triangle
            ctx2.beginPath();
            ctx2.lineTo(hyp - size, size);
            ctx2.lineTo(hyp, 0);
            ctx2.lineTo(hyp - size, -size);
            ctx2.fillStyle = 'rgb(35, 55, 103)';
            ctx2.fill();

            ctx2.restore();

        };

    }
}

const getRandomRadius = () => {
    let r = [];
    return Math.random() * 100 + 50;
}

const getRandomRadian = () => {
    let deg = Math.random() * 360;
    let r = deg * (Math.PI / 180);
    return r;

}

const getRandomDirection = () =>{
    let d = [1,-1];
    return d[Math.floor(Math.random()*2)];
}

const getRandomVelocity = () => {
    let v = Math.random() * 3;
    // console.log(v);
    return v;
}

// rad = 200;

// for(let i =0; i<5;i++){
//     if(i == 4){
//     let c = new Circle(cx,cy, rad, 2, getRandomRadian(), 0.8*4/rad,true);
//     circles.push(c);
//     cx = c.prev_point.x;
//     cy = c.prev_point.y;
//     rad -= 40;
//     }
//     else{
//     let c = new Circle(cx,cy, rad, 2, getRandomRadian(), 0.8*4/rad);
//     circles.push(c);
//     cx = c.prev_point.x;
//     cy = c.prev_point.y;
//     rad -= 40;
//     }

// }

let px, py;
function animate() {
    requestAnimationFrame(animate);
    // clearing layer 2 for arrows
    ctx2.clearRect(0, 0, layer2.width, layer2.height);
    ctx1.fillStyle = 'rgba(255,255,255,0.5)';
    // ctx1.fillStyle = 'rgba(0,0,0,0.01)';
    // ctx1.fillRect(0, 0, layer1.width, layer1.height);

    for (let i = 0; i < circles.length; i++) {
        if (i == 0) {
            circles[i].update();
            px = circles[i].prev_point.x;
            py = circles[i].prev_point.y;
        }
        else {
            circles[i].update(px, py, true);
            px = circles[i].prev_point.x;
            py = circles[i].prev_point.y;
        }
    }
}

let circles = [];
var cx = midx;
var cy = midy;

// handle's add component submit button
$('#submitComponent').click(function () {
    // getting input
    let rad = Number($('#radius').val());
    let velocity = Number($('#velocity').val());

    // adding circle to circles array
    if (circles.length == 0) {
        let c = new Circle(cx, cy, rad, 2, getRandomRadian(), velocity / rad, getRandomDirection());
        circles.push(c);
        // console.log(circles.at(-1).prev_point.x);
    }
    else {
        cx = circles.at(-1).prev_point.x;
        cy = circles.at(-1).prev_point.y;
        let c = new Circle(cx, cy, rad, 2, getRandomRadian(), velocity / rad, getRandomDirection());
        circles.push(c);
    }

    // handling isLastCircle property for all circles
    for (let i = 0; i < circles.length; i++) {
        if (i == circles.length - 1) {
            circles[i].isLastCircle = true;
        }
        else {
            circles[i].isLastCircle = false;
        }
    }

    // console.log(circles);
    $('#component-form').addClass('hide');
    componentFormState = false;
});

// handle's generate random submit
$('#submitRandomComponent').click(function () {
    ctx1.clearRect(0,0,layer1.width,layer1.height);
    ctx2.clearRect(0,0,layer2.width, layer2.height);
    circles = [];
    cx = midx;
    cy = midy;
    let num = Number($('#amount').val());
    for (let i = 0; i < num; i++) {
        // adding circle to circles array
        if (i == num - 1) {
            let v = getRandomVelocity();
            let r = getRandomRadius();
            cx = circles.at(-1).prev_point.x;
            cy = circles.at(-1).prev_point.y;
            let c = new Circle(cx, cy, r, 2, getRandomRadian(), v / r, getRandomDirection(), true);
            circles.push(c);
        }
        else if (circles.length == 0) {
            let v = getRandomVelocity();
            let r = getRandomRadius();
            let c = new Circle(cx, cy, r, 2, getRandomRadian(), v / r, getRandomDirection());
            circles.push(c);
            // console.log(circles.at(-1).prev_point.x);
        }
        else {
            let v = getRandomVelocity();
            let r = getRandomRadius();
            cx = circles.at(-1).prev_point.x;
            cy = circles.at(-1).prev_point.y;
            let c = new Circle(cx, cy, r, 2, getRandomRadian(), v / r, getRandomDirection());
            circles.push(c);
        }
    };
    $('#random-component-form').addClass('hide');
        randomComponentState = false;
    console.log(circles);

})



// c.update();
// animate();