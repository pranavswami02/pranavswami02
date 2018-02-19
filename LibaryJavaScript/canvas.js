var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

var fontsize = 10;
var font = 'Courier';
var fullFont = fontsize + "px " + font; 
c.font = fullFont;

coolCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZｦｧｨｩｪｫｬｭｮｯｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ɒdɔbɘʇǫʜiႱʞlɿƨAᙠƆᗡƎᖷᎮHIႱᐴ⅃ИỌЯƧƸ?!<>{}[]\;:⎈❖⌘✦✧⎇⎆';

coolCharacters = breakUp(coolCharacters);

addEventListener('resize', function() {
    if(navigator.platform[0]!='i'&&navigator.platform!='Android'&&navigator.platform!='BlackBerry'&&navigator.platform.substring(0,10)!='Linux armv') {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
    }
});

function randInt(min,max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomChar()
{
    var index = randInt(0,coolCharacters.length-1);
    return coolCharacters[index];
}

function breakUp(str) {
    var arr = [];
    for(var x=0;x<str.length;x++)
        if(str[x]!=" ")
            arr.push(str[x])
    return arr;
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


function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height);
    
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
}




init()
animate();














