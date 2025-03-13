// import { drawBall } from "./util/drawBall";

const canvas = document.getElementById("game_canvas");
const ctx = canvas.getContext('2d');

// all buttons
const startBtn = document.getElementById("start_btn");
const newBallBtn = document.getElementById("add_ball_btn");

canvas.width = 800;
canvas.height = 400;
const balls = [];
let isPaused = false;


// initial x, y & radius values
let radius = 4;
let x = radius;
let y = canvas.height - radius;
let startAngle = 0;
let speed = 4;

const ball = {
    x: x,
    y: y,
    radius: radius,
    dx: 2,
    dy: 2
};

const endAngle = Math.PI * 2;
const color = "green";

function createBall(x, y, radius) {
    const dx = (Math.random() - 0.5) * speed;
    const dy = (Math.random() - 0.5) * speed;
    console.log("speed", speed)
    return { x, y, radius, dx, dy };
}

const drawBall = (ctx, x, y, radius, startAngle )=>{
    ctx.beginPath();
    ctx.arc(x,y, radius, startAngle, endAngle);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath(); 
    ctx.stroke();

}
// drawBall(ctx, 0, 0, 4, 0);
// drawBall(ctx, ball.x, ball.y, ball.radius, startAngle);



// update the ball's position
const updateBall = (ball)=>{
    ball.x += ball.dx;
    ball.y += ball.dy;

    if(ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0){
        ball.dx = -ball.dx;
    }

    if(ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0){
        ball.dy = -ball.dy;
    }

    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall(ctx, ball.x, ball.y, ball.radius, startAngle);
}
function animate() {
    // !isPaused && updateBall(ball);
    if(!isPaused){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // balls.forEach(updateBall)
        balls.forEach( ball=> updateBall(ball));
        requestAnimationFrame(animate);
    }
}




startBtn.addEventListener("click", ()=>{
    isPaused ? startBtn.textContent = "Start" : startBtn.textContent = "Pause";
    isPaused = !isPaused;
});

newBallBtn.addEventListener("click", ()=>{
    // console.log("hi")
    // updateBall(ball);
    // animate();
    // drawBall(ctx, ball.x, ball.y, ball.radius, startAngle);
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    balls.push(createBall(x, y, radius));
    console.log("balls", balls)
    animate();
});

// animate();