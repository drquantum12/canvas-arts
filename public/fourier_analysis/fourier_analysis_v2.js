
const height = innerHeight - 10;
const width = innerWidth - 10;
// layer 1 for curves
const layer1 = document.getElementById("layer1");
const ctx1 = layer1.getContext("2d");

layer1.style.width = `${width}px`;
layer1.style.height = `${height}px`;

const s = window.devicePixelRatio;
layer1.width = Math.floor(width * s);
layer1.height = Math.floor(height * s);
ctx1.scale(s, s);


const midx = layer1.width / (2*s);
const midy = layer1.height / (2*s);

// // layer 2 for arrows
// const layer2 = document.getElementById("layer2");
// const ctx2 = layer2.getContext("2d");

// layer2.style.width = `${width}px`;
// layer2.style.height = `${height}px`;

// layer2.width = Math.floor(width * scale);
// layer2.height = Math.floor(height * scale);
// ctx2.scale(scale, scale);

// declaration of constants
const scale_x = midx/4;
const scale_y = midy/4;

let x_container = [];
let y_container = [];

for(let i = 1; i < 5; i++){
    let theta = 0;
    let x = [];
    let y = []
    while(theta <= Math.PI*2){
        x.push(midx + theta*scale_x);
        y.push(midy + (Math.sin(i*theta)/i*theta)*scale_y);
        theta += 0.1;
    }
    x_container.push(x);
    y_container.push(y);
};



// let prev_point = {x:x[0], y:y[0]};
// let new_point = {x:0,y:0};

// for(let i = 1; i<x.length; i++){
//     new_point = {x : x[i], y : y[i]};

//     ctx1.beginPath();
//     ctx1.moveTo(prev_point.x, prev_point.y);
//     ctx1.lineTo(new_point.x, new_point.y);
//     ctx1.stroke();

//     prev_point = new_point;
// }
console.log(x_container,y_container)








// c.update();
// animate();