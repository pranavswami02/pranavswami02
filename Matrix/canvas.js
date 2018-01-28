var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

var fontsize = 10;
var font = 'Courier';
var fullFont = fontsize + "px " + font; 
c.font = fullFont;
var part = 'Matrix';


c.shadowColor = 'rgb(0,255,0)'
c.shadowBlur = .75*fontsize;
c.shadowOffsetX = .25*fontsize;
c.shadowOffsetY = .25*fontsize;

// Variables
var mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2 
};

var word = prompt("Enter Some Text Here","The Matrix Game");
if(word==null)
    word='';
var wordFontsize = 0;
var wordFullFont = wordFontsize + "px "+font;
var direction = undefined;
var startPos = [undefined,undefined];
var endPos = [undefined,undefined];
var cellindex = Math.floor(innerWidth/fontsize);
var cellindex2 = Math.floor(innerHeight/fontsize);


coolCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZｦｧｨｩｪｫｬｭｮｯｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ɒdɔbɘʇǫʜiႱʞlɿƨAᙠƆᗡƎᖷᎮHIႱᐴ⅃ИỌЯƧƸ?!<>{}[]\;:⎈❖⌘✦✧⎇⎆';

coolCharacters = breakUp(coolCharacters);

// Event Listeners
addEventListener('mousemove', function(event) {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
});

addEventListener('resize', function() {
    if(navigator.platform[0]!='i'&&navigator.platform!='Android'&&navigator.platform!='BlackBerry'&&navigator.platform.substring(0,10)!='Linux armv')
        location.reload();
});

addEventListener('click', clicked);

addEventListener('touchstart',startTouch);
addEventListener('touchmove',function(event){
    event.preventDefault();
});
addEventListener('touchend',endTouch);
addEventListener('tap',function(){
    
});

addEventListener('keydown',function(event){
    event.preventDefault();
    switch(event.keyCode)
    {
        case 32: direction = undefined;
            break;
        case 39:
            if(direction!='left')
                direction='right';
            break;
        case 37: 
            if(direction!='right')
                direction='left';
            break;
        case 38:
            if(direction!='down')
                direction='up';
            break;
        case 40:
            if(direction!='up')
                direction='down';
            break;
        default: break;
    }
})

function clicked()
{
    if(part=='Matrix')
        stringsToChars();
}

function startTouch(event)
{
    event.preventDefault();
    clicked();
    if(part=='GxirtAME') {
        startPos[0] = event.touches[0].pageX;
        startPos[1] = event.touches[0].pageY;
    }
}

function endTouch(event)
{
    event.preventDefault();
    if(part=='GxirtAME') {
        if(Math.abs(event.changedTouches[0].pageX-startPos[0])>Math.abs(event.changedTouches[0].pageY-startPos[1])) {
            if(event.changedTouches[0].pageX-startPos[0]>0)
                if(direction!='left')
                    direction='right';
                else {
                    
                }
            else if(direction!='right'){
                direction='left';
            }
        }
        else {
            if(event.changedTouches[0].pageY-startPos[1]>0)
                if(direction!='up')
                    direction='down';
                else {
                    
                }
            else if(direction!='down'){
                direction='up';
            }
        }
    }
}

// Utility Functions
function randInt(min,max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function breakUp(str) {
    var arr = [];
    for(var x=0;x<str.length;x++)
        if(str[x]!=" ")
            arr.push(str[x])
    return arr;
}

function randomChar()
{
    var index = randInt(0,coolCharacters.length-1);
    return coolCharacters[index];
}

var boundries = 0.010964912280701754*innerHeight;

function CharObj(char, x, y, dx, dy, /*d0, */ color) {
	this.char = char;
    this.x = x;
	this.y = y;
    this.dx = dx;
    this.dy = dy;
//    this.d0 = d0;
//    this.theta = 0;
    if(randInt(0,1)==1)
        this.gravity = -5;
    else   
        this.gravity = 5;
    this.color = color;
    this.conservedEnergy = .85;

	this.update = function() {
        
        
        if((this.x<=0||this.x+fontsize>=innerWidth)&&part!='GxirtAMETransition')
            this.dx*=-1;
        if(this.y+fontsize+this.dy > canvas.height-boundries||this.y+this.dy<boundries)
        {
            if((this.gravity==5&&this.dy>0)||(this.gravity==-5&&this.dy<0))
                this.dy*=-this.conservedEnergy;
        }
        else {
            this.dy+=this.gravity;
        }
            
        
        this.y+=this.dy;
        this.x+=this.dx;
		this.draw();
	};
    
    this.changeCharRandomly = function() {
        if(randInt(0,200)==1)
            this.char = randomChar();
    }
    
	this.draw = function() {
        c.shadowColor = this.color;
        c.font = fullFont;
//        c.rotate(this.theta);
		c.fillStyle = this.color;     
        c.fillText(this.char,this.x,this.y)
//        c.rotate(-this.theta);
        c.shadowColor = 'rgb(0,255,0)';
	};
}



function String(x,y,opacity) {
    this.x = x;
    this.y = y;
    this.opacity = opacity;
    this.charArray = [];
    this.ending = false;
    this.stopped = false;
    
    this.update = function() {
        if(!this.stopped)
        {
            if(randInt(0,200)==1)
                this.stopped = true;
            this.append();
        }
        else
        {
            if(randInt(0,100)==1)
                this.ending = true;
            if(this.ending)
                this.end();
        }
        this.changeChars();
        this.draw();
    }
    
    this.getChars = function() {
        allChars = [];
        char_posY = [];
        for(var i=0;i<this.charArray.length;i++)
        {
            char_posY.push(this.y+i*fontsize)
        }
        
        for(var i=0;i<this.charArray.length;i++)
        {
            var dyForChar = randInt(-4,4);
            while(dyForChar==0)
                dyForChar = randInt(-4,4);
            allChars.push(new CharObj(this.charArray[i],this.x,char_posY[i],randInt(-3,3),dyForChar,'rgba(0,255,0,'+this.opacity+')'));
        }
        return allChars;  
    }
    
    this.changeChars = function()
    {
        for(var x=0;x<this.charArray.length;x++)
            if(randInt(0,200)==1)
                this.charArray[x] = randomChar();
    }
    
    this.append = function() {
        var char = randomChar();
        this.charArray.push(char[0]);
    }
    
    this.end = function() {
        var tempArray = [];
        for(var x=1;x<this.charArray.length;x++)
        {
            tempArray.push(this.charArray[x]);
        }
        
        this.charArray = tempArray;
        this.y+=fontsize;
    }
    
    this.draw = function() {
        c.font = fullFont;
        c.fillStyle = 'rgba(0,255,0,'+this.opacity+')'
        //c.rotate(Math.PI);
        for(var x=0;x<this.charArray.length;x++)
        {
            
           if(x==this.charArray.length-1&&!this.stopped)
                c.fillStyle = '#fff';     
            c.fillText(this.charArray[x],this.x,this.y+x*fontsize)
        }
        //c.rotate(-Math.PI);
    }
}

function Snake(x,y,dx,dy,startingChar)
{
    this.dx = dx;
    this.dy = dy;
    this.charArray = [new CharObj(startingChar,x,y,0,0,'#fff')];
//    for(var i=1;i<1000;i++)
//        this.charArray.push(new CharObj(randomChar(),x-i*10,y,0,0,'#00ff00'));
    this.update = function() {
        switch(direction)
        {
            case 'right':
                this.dx=fontsize;
                this.dy=0;
                break;
            case 'left':
                this.dx=-fontsize;
                this.dy=0;
                break;
            case 'down':
                this.dx=0;
                this.dy=fontsize;
                break;
            case 'up':
                this.dx=0;
                this.dy=-fontsize;
                break;
        }
        var head = this.charArray[0];

        for(var x=this.charArray.length-1;x>-1;x--)
        {
            if(x!=this.charArray.length-1&&typeof direction!='undefined'&&direction!='none') {
                this.charArray[x+1].x = this.charArray[x].x;
                this.charArray[x+1].y = this.charArray[x].y;
            }
            this.charArray[x].changeCharRandomly();
        }
        this.charArray[0].x+=this.dx;
        this.charArray[0].y+=this.dy;
        var lose = false;
        for(var x=1;x<this.charArray.length;x++)
        {
            if(this.charArray[0].x==this.charArray[x].x&&this.charArray[0].y==this.charArray[x].y)
                lose = true;
        }
        if((head.x<0||head.y<0||head.x+fontsize>innerWidth||head.y+fontsize>innerHeight)||lose)
            youLose();
        this.draw();
    }
    
    this.add = function(charobj) {
        var arr = this.charArray;
        charobj.x = arr[arr.length-1].x;
        charobj.y = arr[arr.length-1].y;
        if(arr.length==1)
        {
            switch(direction)
            {
                case 'right': charobj.x = arr[arr.length-1].x-10;
                    break;
                case 'left': charobj.x = arr[arr.length-1].x+10;
                    break;
                case 'up': charobj.x = arr[arr.length-1].y+10;
                    break;
                case 'down': charobj.x = arr[arr.length-1].y-10;
                    break;
                default: charobj.x = arr[arr.length-1].x-10;
                    break;
                    
            }
        }
        else if(arr[arr.length-1].x==arr[arr.length-2].x)
            charobj.y = arr[arr.length-1].y*2-arr[arr.length-2].y;
        else
            charobj.x = arr[arr.length-1].x*2-arr[arr.length-2].x;
        
        this.charArray.push(charobj);
    }
    
    this.draw = function() {
        for(var x=0;x<this.charArray.length;x++)
            this.charArray[x].draw();
    }
    
}

// Implementation
var Var;
var strings = [];
var chars = [];
function init() {
    strings = [];
    chars = [];
    part = 'Matrix'
    cellindex = Math.floor(innerWidth/fontsize);
    cellindex2 = Math.floor(innerHeight/fontsize);
    for(var x=0;x<0;x++)
        strings.push(newString());

}

function setFontsize(fontSize){
    fontsize = fontSize;
    fullFont = fontsize + "px "+font;
    c.shadowBlur = .75*fontsize;
    c.shadowOffsetX = .25*fontsize;
    c.shadowOffsetY = .25*fontsize;
}

function setGameFontSize(fontSize){
    gameFontSize = fontSize;
    fullGameFontSize = gameFontSize + "px "+font;
    c.shadowBlur = .75*gameFontSize;
    c.shadowOffsetX = .25*gameFontSize;
    c.shadowOffsetY = .25*gameFontSize;
}



function newString()
{
    var opacity = Math.random();
    if(opacity<.5)
        opacity*=2;

    return new String(randInt(0,cellindex)*fontsize,randInt(0,cellindex2)*fontsize,opacity);
}

function newPosX() {
    return randInt(0,cellindex)*fontsize;
}

function newPosY() {
    return randInt(0,cellindex2)*fontsize;
}

function youLose() {
    direction='none';
    delay=150;
    apple = new CharObj(randomChar(),newPosX(),newPosY(),0,0,'rgba(255,0,0,1)');
    apple.gravity=0;
    snake = new Snake(Math.floor((innerWidth/2)/fontsize)*fontsize,Math.floor((innerWidth/2)/fontsize)*fontsize,0,0,randomChar());
}

function stringsToChars() {
    part = 'Gravimatix';
    chars = [];
    for(var x=0;x<strings.length;x++)
    {
        chars = chars.concat(strings[x].getChars());
    }
    strings = []
}

function eatApple() {
    apple.color = 'rgba(0,255,0,1)';
    
    for(var x=0;x<3;x++)
    {
        var temp = new CharObj(); 
        Object.assign(temp,apple);
        snake.add(temp);
    }
    apple = new CharObj(randomChar(),newPosX(),newPosY(),0,0,'rgba(255,50,50,1)');
    apple.gravity = 0;
}
//            c.strokeRect(0,0,innerWidth-20,innerHeight-40);


var apple = new CharObj(randomChar(),newPosX(),newPosY(),0,0,'rgba(255,50,50,1)');
apple.gravity = 0;
var adding = 1;
var count=0;
var sideBoundries = (innerWidth-.7*innerHeight)/2;
var img = '';
var op = 0;
var delay = 150;
var gameFontSize = 20;
var fullGameFontSize = gameFontSize + "px "+font;
var snake = new Snake(Math.floor((innerWidth/2)/fontsize)*fontsize,Math.floor((innerHeight/2)/fontsize)*fontsize,0,0,randomChar());

window.onload = function(){
    img = document.getElementById('mousePhoto');
}

// Animation Loop
function animate() {
    
    if(part!='GxirtAME')
        requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height);
 
    switch(part)
    {
        case 'Matrix':
            for(var x=0;x<strings.length;x++)
            {
                var length = strings[x].charArray.length;
                var posX = strings[x].x;
                var posY = strings[x].y;
                var posBottomY = posY + fontsize*length;
                strings[x].update();
                if(length<0)
                    strings.splice(x,1);
                else {
                   for(var y=0;y<strings.length;y++)
                    {
                       if(x!=y&&posBottomY>=strings[y].y&&posX==strings[y].x&&posY<strings[y].y)
                        {
                           strings[y].stopped = true;
                           strings[y].ending = true;
                           if(strings[x].stopped)
                           {
                                strings[y].ending = false;
                           }
                           if(strings[x].ending&&strings[x].length<1)
                               strings[y].ending = true;
                        }

                    }
                }

            }
            if(randInt(0,2)==0)
            {
                strings.push(newString());
            }
            break;
        case 'Gravimatix':
            var keepGoing = false;
            for(var x=0;x<chars.length;x++)
            {
                chars[x].update();
                if(chars[x].dy==0)
                    chars[x].dy+=1;
                if(!keepGoing&&chars[x].y>0&&chars[x].y<innerHeight)
                    keepGoing = true;
            }
            if(!keepGoing)
                location.reload();
            if(word!='')
            {
                c.font = wordFullFont;
                c.fillStyle = '#00ff00'
                c.shadowBlur = .5*wordFontsize;
                c.shadowOffsetX = .25*wordFontsize;
                c.shadowOffsetY = .25*wordFontsize;

                var leaving = false;            
                if(wordFontsize==fontsize&&count>100)
                    leaving = true;
                var interval = innerWidth/word.length;
                for(var x=0;x<word.length;x++)
                {    
                    c.fillText(word[x],x*interval+.5*interval-.35*wordFontsize,innerHeight/2+.35*wordFontsize)
                    if(leaving)
                    {
                        chars.push(new CharObj(word[x],x*interval+.5*interval-.5*fontsize,innerHeight/2-.5*wordFontsize,randInt(-2,2),randInt(-5,5),'#00ff00'))
                    }

                }
                if(!leaving)
                {
                    if(wordFontsize<interval||count>100){
                        wordFontsize+=adding;
                        wordFullFont = wordFontsize + "px "+font;
                    }
                    else {
                        if(wordFontsize>fontsize)
                            adding=-1;
                        if(count>100)
                            wordFontsize-=1;
                        wordFullFont = wordFontsize + "px "+font;
                        count++;
                    }
                    setFontsize(fontsize);
                }
                else{
                    word=''
                }
            }
            else
            {
                boundries+=1;
                if(boundries>=.15*innerHeight)
                    part = 'GxirtAMETransition';
            }
            break;
        case 'GxirtAMETransition':
            if(op<1)
                op +=.1;
            else if(chars.length==0)
            {
                part = 'GxirtAME'
                
            }
            for(var x=0;x<chars.length;x++)
            {
                chars[x].dx=(chars[x].x>innerWidth/2)? 5: -5;
                chars[x].update();
                if((chars[x].x>sideBoundries-2*fontsize&&chars[x].x<innerWidth-sideBoundries&&chars[x].y>boundries-2*fontsize&&chars[x].y<innerHeight-boundries)||(chars[x].x>innerWidth||chars[x].x<fontsize||chars[x].y<-fontsize||chars[x].y>innerHeight)||(chars[x].x+fontsize>sideBoundries&&chars[x].x+fontsize<innerWidth-sideBoundries&&chars[x].y+fontsize>boundries&&chars[x].y+fontsize<innerHeight-boundries))
                {
                    chars.splice(x,1);
                    x--;
                }
            }
            break;
            
        case 'GxirtAME':
            delay = 150-snake.charArray.length;
            if(delay<0)
                delay=0;
            head = snake.charArray[0];
            if(head.x==apple.x&&head.y==apple.y)
                eatApple();
            c.fillStyle='#ff0000';
            c.font = (2*fontsize)+"px Courier";
            c.fillText("Score: "+(snake.charArray.length-1),100,100);
            c.font = fullFont;
            snake.update();
            apple.update();
            setTimeout(animate,delay);
            break;
    }
    
    if(img!=''&&navigator.platform[0]!='i'&&navigator.platform!='Android'&&navigator.platform!='BlackBerry'&&navigator.platform.substring(0,10)!='Linux armv'&&innerWidth>700&&part!='GxirtAME')
        c.drawImage(img,mouse.x-img.width/2,mouse.y-img.height/2);

}

init()
animate();