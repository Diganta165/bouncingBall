// import { drawBall } from "./util/drawBall";

const canvas = document.getElementById("game_canvas");
const ctx = canvas.getContext('2d');

// all buttons
const startBtn = document.getElementById("start_btn");
const newBallBtn = document.getElementById("add_ball_btn");
const changeColorBtn = document.getElementById("change_ball_color_btn");

canvas.width = 800;
canvas.height = 400;
let animationFrame = null;
const balls = [];
const ballColors = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "brown", "black", "white"];
let isPaused = true;
let firstClick = false;


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

const updateBall = (ball)=>{
    ball.x += ball.dx;
    ball.y += ball.dy;

    if(ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0){
        ball.dx = -ball.dx;
    }

    if(ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0){
        ball.dy = -ball.dy;
    }
    drawBall(ctx, ball.x, ball.y, ball.radius, startAngle);
}
function animate() {
    if(isPaused){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        balls.forEach( ball=> updateBall(ball));
    }
    
    requestAnimationFrame(animate);
}

animate();


startBtn.addEventListener("click", ()=>{
    isPaused ? startBtn.textContent = "Start" : startBtn.textContent = "Pause";
    isPaused = !isPaused;
    
    if(!firstClick){
        firstClick = true;
        balls.push(createBall(x, y, radius));
    };
        
});

newBallBtn.addEventListener("click", ()=>{
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    balls.push(createBall(x, y, radius));
});

// Change Ball Color
changeColorBtn.addEventListener("click", ()=>{
    // const colorIndex = Math.floor(Math.random() * 10)
    // balls.forEach(ball => ball.color = ""+  ballColors[colorIndex]);
    balls.forEach(ball => ball.color = '#' + Math.floor(Math.random() * 16777215).toString(16));
    // ctx.fillStyle = colorIndex;

    ball.color = '#' + Math.floor(Math.random() * 16777215).toString(16);

    console.log(ballColors[Math.floor(Math.random() * 10).toString()])
}); 