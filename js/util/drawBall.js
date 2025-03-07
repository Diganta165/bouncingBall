// function drawBall(ctx, x, y, radius, color) {
//     ctx.beginPath();
//     ctx.arc(x, y, radius, 0, Math.PI * 2);
//     ctx.fillStyle = color;
//     ctx.fill();
//     ctx.closePath();
// }

// // Example usage:
// // Assuming you have a canvas element with id 'myCanvas' in your HTML
// const canvas = document.getElementById('myCanvas');
// const ctx = canvas.getContext('2d');

// // Draw a ball at position (50, 50) with radius 10 and color red
// drawBall(ctx, 50, 50, 10, 'red');

const endAngle = Math.PI * 2;
color = "green";

const drawBall = (ctx, x, y, radius, startAngle )=>{
    ctx.beginPath();
    ctx.arc(x,y, radius, startAngle, endAngle);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath(); 
    ctx.stroke();

}

export {drawBall};