var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;


// Variables
var mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2 
};

var colors = [
	'#2185C5',
	'#7ECEFD',
	'#FFF6E5',
	'#FF7F66'
];


// Event Listeners
addEventListener('mousemove', function(event) {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
});

addEventListener('resize', function() {
	canvas.width = innerWidth;	
	canvas.height = innerHeight;

	init();
});

addEventListener('click', function() {
    init();
})


// Utility Functions
function randInt(min,max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
	return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1;
    const yDist = y2 - y1;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}


// Objects
function Ball(x, y, dx, dy, gravity, radius, color) {
	this.x = x;
	this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.gravity = gravity;
	this.radius = radius;
	this.color = color;
    this.conservedEnergy = .9

	this.update = function() {
        if(this.y+this.radius+this.dy > canvas.height)
        {
            if(this.dy>0)
                this.dy=-this.dy*this.conservedEnergy;
            
        }
        else {
            this.dy+=this.gravity;
        }
        if((this.x+this.radius+this.dx>=canvas.width)||this.x-this.radius<=0)
            this.dx*=-1;
        
        this.y+=this.dy;
        this.x+=this.dx;
		this.draw();
	};

	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);	
		c.fillStyle = this.color;
		c.fill();
        c.stroke();
		c.closePath();
	};
}


// Implementation
var balls = []
function init() {
	balls = []

	for (var i = 0; i < 200; i++) {
        var radius = randInt(20,40)
		balls.push(new Ball(randInt(radius,innerWidth-radius),randInt(radius,innerHeight-radius),randInt(-8,8),randInt(-8,8),2,radius,randomColor(colors)))
	}
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    if(mouse.x>250)
    {
        c.clearRect(0, 0, canvas.width, canvas.height);

        for(var i=0;i<balls.length;i++)
        {
            balls[i].update();
        }
    }
}

init();
animate();