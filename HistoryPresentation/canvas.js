var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

var fontsize = 10;
var font = 'Arial';
var fullFont = fontsize + "px " + font; 
c.font = fullFont;
var part = 'Matrix'


c.shadowColor = 'rgb(0,255,0)'
c.shadowBlur = .75*fontsize;
c.shadowOffsetX = .25*fontsize;
c.shadowOffsetY = .25*fontsize;

// Variables
var mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2 
};

var word = "HARLEM RENAISSANCE"
if(word==null)
    word='';
var wordFontsize = 0;
var wordFullFont = wordFontsize + "px "+font;


coolCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZｦｧｨｩｪｫｬｭｮｯｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ɒdɔbɘʇǫʜiႱʞlɿƨAᙠƆᗡƎᖷᎮHIႱᐴ⅃ИỌЯƧƸ?!<>{}[]\;:⎈❖⌘✦✧⎇⎆';

coolCharacters = breakUp(coolCharacters);

// Event Listeners
addEventListener('mousemove', function(event) {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
});

addEventListener('resize', function() {
    if(navigator.platform[0]!='i'&&navigator.platform!='Android'&&navigator.platform!='BlackBerry')
        location.reload();
});

addEventListener('click', clicked)

addEventListener('touchstart',clicked)

function stopAudio(audio) {
    audio.pause();
    audio.currentTime = 0;
}

function clicked()
{
    if(part=='Matrix')
        stringsToChars();
    else
        window.open('Presentation/',)
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

var boundries = 10;

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
        
        if(this.x<=0||this.x+fontsize>=innerWidth)
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

	this.draw = function() {
        c.font = fullFont;
//        c.rotate(this.theta);
		c.fillStyle = this.color;     
        c.fillText(this.char,this.x,this.y)
//        c.rotate(-this.theta);
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

function newString()
{
    var opacity = Math.random();
    if(opacity<.5)
        opacity*=2;

    return new String(randInt(0,cellindex)*fontsize,randInt(0,cellindex2)*fontsize,opacity);
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


var adding = 2;
var count=0;
// Animation Loop
function animate() {
    
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
                if(wordFontsize==fontsize&&count>20)
                    leaving = true;
                var interval = innerWidth/word.length;
                for(var x=0;x<word.length;x++)
                {    
                    c.fillText(word[x],x*interval+.5*interval-.5*wordFontsize,innerHeight/2-.5*wordFontsize)
                    if(leaving)
                    {
                        chars.push(new CharObj(word[x],x*interval+.5*interval-.5*fontsize,innerHeight/2-.5*wordFontsize,randInt(-2,2),randInt(-5,5),'#00ff00'))
                    }

                }
                if(!leaving)
                {
                    if(wordFontsize<interval||count>20){
                        wordFontsize+=adding;
                        wordFullFont = wordFontsize + "px "+font;
                    }
                    else {
                        if(wordFontsize>fontsize)
                            adding=-2;
                        if(count>20)
                            wordFontsize-=2;
                        wordFullFont = wordFontsize + "px "+font;
                        count++;
                    }
                    setFontsize(fontsize);
                }
                else{
                    word=''
                }
                break;
            }
            else
                boundries+=3;
    }
    

}

init()
animate();