var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
//canvas.width = innerWidth;
//canvas.height = innerHeight;


// Variables
var mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2,
    clicking: false
};

// Event Listeners
addEventListener('mousemove', function(event) {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
});
addEventListener('touchmove',function(event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});


//addEventListener('resize', function() {
//    if(navigator.platform[0]!='i'&&navigator.platform!='Android'&&navigator.platform!='BlackBerry')
//        location.reload();
//});

addEventListener('mousedown', down);
addEventListener('mouseup', up);

addEventListener('touchstart',down);
addEventListener('touchend',up);

function up(event)
{
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    mouse.clicking = false;
}

function down()
{
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    mouse.clicking = true;
}

var img = document.getElementById('worker');
var image = false;

addEventListener('keydown', function() {
    if(image&&img==document.getElementById('people')) {
        image=false;
        img = document.getElementById('worker');
        return null;
    }
    if(image&&img!=document.getElementById('people'))
    {
        img=document.getElementById('people');
    }
    image = true;
})

// Utility Functions
function randInt(min,max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

// Implementation
var Var;
function init() {

}

var num = 0;
var drew = false;
c.drawImage(img,866,174);

// Animation Loop
function animate() {
    
    requestAnimationFrame(animate);
    c.beginPath()
    
    if(image)
    {
        c.clearRect(0, 0, canvas.width, canvas.height);
        c.drawImage(img,mouse.x-.5*img.width,mouse.y-.5*img.height);
    }
    else{
        if(mouse.clicking)
        {
            c.arc(mouse.x,mouse.y,10,0, Math.PI*2,false);
            c.strokeStyle = '#000';
            if(num==0)
                c.strokeStyle = '#f00'
            c.fillStyle = c.strokeStyle;
            c.stroke();
            c.fill();
            drew = true;
        }
        else {
            if(drew)
                num++;
        }
    }
    
    
}

init()
animate();