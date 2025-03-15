const canvas = document.getElementById("game_canvas");
const ctx = canvas.getContext('2d');

// all buttons
const startBtn = document.getElementById("start_btn");
const newBallBtn = document.getElementById("add_ball_btn");
const changeColorBtn = document.getElementById("change_ball_color_btn");
const restartBtn = document.getElementById("restart_btn");
const speedIncreaseBtn = document.getElementById("increase_btn");
const speedDecreaseBtn = document.getElementById("decrease_btn");

const addSquareBtn = document.getElementById("add_square_btn");

canvas.width = 800;
canvas.height = 400;
const balls = [];
const ballColors = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "brown", "black", "white"];
let isPaused = true;
let firstClick = false;


// initial x, y & radius values
let radius = 8;
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


// Create ball
function createBall(x, y, radius, color) {
    const dx = (Math.random() - 0.5) * speed;
    const dy = (Math.random() - 0.5) * speed;
    return { x, y, radius, dx, dy, color };
}


// Draw ball
const drawBall = (ctx, x, y, radius, startAngle, color )=>{
    ctx.beginPath();
    ctx.arc(x,y, radius, startAngle, endAngle);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath(); 
    ctx.stroke();

}


// Update ball position
const updateBall = (ball)=>{
    ball.x += ball.dx;
    ball.y += ball.dy;

    if(ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0){
        ball.dx = -ball.dx;
    }

    if(ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0){
        ball.dy = -ball.dy;
    }
    drawBall(ctx, ball.x, ball.y, ball.radius, startAngle, ball.color);
}

// Animation of balls
function animate() {
    if(isPaused){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        balls.forEach( ball=> updateBall(ball));
    }
    
    requestAnimationFrame(animate);
}

animate();

// Start game
startBtn.addEventListener("click", ()=>{
    isPaused ? startBtn.textContent = "Start" : startBtn.textContent = "Pause";
    isPaused = !isPaused;
    
    if(!firstClick){
        firstClick = true;
        balls.push(createBall(x, y, radius, color));
    };
        
});


// Add new Ball
newBallBtn.addEventListener("click", ()=>{
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    balls.push(createBall(x, y, radius, color));
});

// Change Ball Color
changeColorBtn.addEventListener("click", ()=>{
    const colorIndex = Math.floor(Math.random() * 10)
    balls.forEach(ball => ball.color = ballColors[colorIndex]);
}); 


// Restart game
restartBtn.addEventListener("click", ()=>{
    balls.length = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    startBtn.textContent = "Start";
    isPaused = !isPaused;
    firstClick = false;
});


// Increase Speed
speedIncreaseBtn.addEventListener("click", ()=>{
    let clickCount = 0;
    clickCount++;
    speed += (clickCount * 0.5);
    balls.forEach(ball => {
        ball.dx *= 1.5;
        ball.dy *= 1.5;
    });
});


// Increase Speed
speedDecreaseBtn.addEventListener("click", ()=>{
    let clickCount = 0;
    clickCount++;
    speed -= (clickCount * 0.5);
    balls.forEach(ball => {
        ball.dx *= 0.5;
        ball.dy *= 0.5;
    });
});



// Draw Square
const drawSquare = (ctx, x, y, size, color) => {
    // const ctx = canvas.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size);
}

addSquareBtn.addEventListener("click", ()=>{
    ctx.beginPath();
    drawSquare(ctx, 10, 10, 50, "red");
});


