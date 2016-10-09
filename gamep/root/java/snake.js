/*
 * Nur Alif Ilyasa 2016
 * 
 *
 * Snake     Ver. 1.0.0
 *
 * last Update : 11.22 , sunday, October 9, 2016
 * 
 * 
 * repository  : https://github.com/NurAlif/Snake
 * 
 * nuralif.ilyasa@gmail.com
 * 
 */



var widthscrn = document.documentElement.clientWidth;
var heightscrn = document.documentElement.clientHeight - 200;

var cnav = document.getElementById("snake");

cnav.style.width = widthscrn;
cnav.style.height = heightscrn;

var snack = new Array();
var foods = new Array();

var skor,highskor;

skor = 0;
highskor = 0;

var kolor,krono,sise;

var kollor = new Array();
kollor[0] = document.getElementById("rand");
kollor[1] = document.getElementById("red");
kollor[4] = document.getElementById("green");
kollor[2] = document.getElementById("blue");
kollor[3] = document.getElementById("purple");
kollor[5] = document.getElementById("orange");

var getc = function(){
    cwidth = widthscrn / snack[0].width;
    cheight = heightscrn / snack[0].height;
    cnav.style.width = cwidth * size;
    cnav.style.height = cheight * size;
}; 

var getkolor = function(kolloo){
    var reset = function(){
        for(i = 0; i <= 5;i++){
                kollor[i].style.backgroundColor = "#cccccc";
            }
    };
    switch(kolloo){
        case "rand":
            kolor = 0;reset();kollor[0].style.backgroundColor = "#000000";break;
        case "red":
            kolor = 1;reset();kollor[1].style.backgroundColor = "#000000";break;
        case "blue":
            kolor = 2;reset();kollor[2].style.backgroundColor = "#000000";break;
        case "purple":
            kolor = 3;reset();kollor[3].style.backgroundColor = "#000000";break;
        case "green":
            kolor = 4;reset();kollor[4].style.backgroundColor = "#000000";break;
        case "orange":
            kolor = 5;reset();kollor[5].style.backgroundColor = "#000000";break;
    }
};

function getinfo(){
    
    sise = document.getElementById("size").value;
    size = sise - 0;
    krono = document.getElementById("krono").value - 0;
 
};

function hide(){
    document.getElementById("fom").hidden = true;
    document.getElementById("but").hidden= true;
}

function ahide(){
    document.getElementById("fom").hidden = false;
    document.getElementById("but").hidden= false;
}

function startGame() {
    document.getElementById("snake").style.backgroundColor = "#aec9d0";
    keylisten();
    getinfo();
    snake.start();
    addbodi();
    getc();
}

function restart(){
    keylisten();
    getinfo();
    snack.restart();
    addbodi();
}

//game master

var snake = {
    canvas : document.getElementById("snake"),
    start : function() {
        this.canvas.width = widthscrn;
        this.canvas.height = heightscrn;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.runtime = setInterval(runtime, krono);
    },
    restart : function(){
        this.runtime = setInterval(runtime, krono);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};

//obj bodi

function bodi(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.kolor = color;
    this.x = x;
    this.y = y;    
    this.dirs;
    this.dir;
    this.update = function(){
        ctx = snake.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    
    this.move = function(){
        switch(this.dir){
            case 0:
                this.x -= size;break;
            case 1:
                this.y -= size;break;
            case 2:
                this.x += size;break;
            case 3:
                this.y += size;break;
        }
    };
}

var time  = 0;

//_________________________food

function food(){
    var no = foods.length;
    foods[no] = new mkn(Math.floor((Math.random() * 3) + 1),
    Math.floor((Math.random() * widthscrn) + 1),
    Math.floor((Math.random() * heightscrn) + 1));
    foods[no].update();
}

//________________________listener
var code;

var keylisten= function(){
    window.onkeydown = function (e) {
        code = e.keyCode ? e.keyCode : e.which;
        switch(code){
            case 65:
                if(snack[0].dir !== 2){
                    snack[0].dir = 0;
                }
                break;
            case 87:
                if(snack[0].dir !== 3){
                    snack[0].dir = 1;
                }
                break;
            case 68:
                if(snack[0].dir !== 0){
                    snack[0].dir = 2;
                }
                break;
            case 83:
                if(snack[0].dir !== 1){
                    snack[0].dir = 3;
                }
                break;
        }
    };
};

var warna = new Array("red","blue","purple","green","orange");

//__________________________bodi

var getbody = function(){
    
    if(time === 0||time === 1){
        
                snack[0] = new bodi(size,size,warna[kolor-1],
                               size * 5,
                               size * 5);
                snack[0].dir = 2;
                snack[1] = new bodi(size,size,warna[kolor-1],snack[0].x,snack[0].y);
                snack[1].dir = snack[0].dir;
            }else{
                switch(snack[snack.length - 1].dir){
                    case 2 :
                        snack[snack.length] = new bodi(size,size,warna[kolor-1],
                        snack[snack.length - 1].x - size,snack[snack.length - 1].y);
                        break;
                    case 3 :
                        snack[snack.length] = new bodi(size,size,warna[kolor-1],
                        snack[snack.length - 1].x,snack[snack.length - 1].y - size);
                        break;
                    case 0 :
                        snack[snack.length] = new bodi(size,size,warna[kolor-1],
                        snack[snack.length - 1].x + size,snack[snack.length - 1].y);
                        break;
                    case 1 :
                        snack[snack.length] = new bodi(size,size,warna[kolor-1],
                        snack[snack.length - 1].x,snack[snack.length - 1].y + size);
                        break;
                }
            }
    
};

function addbodi(){
    switch(kolor){
        case 0:
            if(time === 0||time === 1){
                
                snack[0] = new bodi(size,size,
                    warna[Math.floor((Math.random() * 5) + 1) -1],
                            size * 5,
                            size * 5);
                snack[0].dir = 2;
                snack[1] = new bodi(size,size,
                    warna[Math.floor((Math.random() * 5) + 1) -1],
                    snack[0].x,snack[0].y);
                snack[1].dir = snack[0].dir;
            }else{
                
                var randkolor = function(koll){
                    var itkol;
                    var mykol;
                    switch(koll){
                        case "red":
                            itkol = 0;
                            break;
                        case "blue":
                            itkol = 1;
                            break;
                        case "purple":
                            itkol = 2;
                            break;
                        case "green":
                            itkol = 3;
                            break;
                        case "orange":
                            itkol = 4;
                            break;
                    }
                    
                    do{
                        mykol = Math.floor((Math.random() * 5) + 1) -1;
                    }while(mykol === itkol);
                    return mykol;
                };
    
                switch(snack[snack.length - 1].dir){
                    case 2 :
                        snack[snack.length] = new bodi(size,
                            size,
                            warna[randkolor(snack[snack.length-1].kolor)],
                            snack[snack.length - 1].x - size,
                            snack[snack.length - 1].y);
                        break;
                    case 3 :
                        snack[snack.length] = new bodi(size,
                            size,
                            warna[randkolor(snack[snack.length-1].kolor)],
                            snack[snack.length - 1].x,
                            snack[snack.length - 1].y - size);
                        break;
                    case 0 :
                        snack[snack.length] = new bodi(size,
                            size,
                            warna[randkolor(snack[snack.length-1].kolor)],
                            snack[snack.length - 1].x + size,
                            snack[snack.length - 1].y);
                        break;
                    case 1 :
                        snack[snack.length] = new bodi(size,
                            size,
                            warna[randkolor(snack[snack.length-1].kolor)],
                            snack[snack.length - 1].x,
                            snack[snack.length - 1].y + size);
                        break;
                }
            }break;
        default:
            getbody();
    }
}

//____________________________________________runtime

var nodel = 80;

var scrboard = document.getElementById("value");

var hstscr;
hstscr = 0;

function runtime() {
    
    cedges();
    cscolid();
    spwmkn();
    cntmkn();
    snake.clear();
    snack[0].move();
    snack[0].update();
    for(numf = 1; numf < snack.length;numf++){
        snack[numf].dir = snack[numf - 1].dirs;
        snack[numf].move();
        snack[numf].update();
    }
    for(vav = 1; vav < foods.length;){
        foods[vav].update();
        vav = vav + 1;
    }
    for(nourut = 0; nourut < snack.length;nourut++){
        snack[nourut].dirs = snack[nourut].dir;
    }
    time = time + 1;
    notif();
}
var count = 0;
var counter = function(){
    if(count === 10){
        addbodi();
    count = 0;
    }else{count++;}
};

var getmkn = function(){
    foods[foods.length] = new mkn(size*Math.floor((Math.random() * 3) + 1),
    warna[Math.floor((Math.random() * 5) + 1)-1], 
    ((Math.floor((Math.random() * cwidth - 3) + 1)+0) * snack[0].width), 
    ((Math.floor((Math.random() * cheight - 3) + 1)+0) * snack[0].height) +0);
};

//obj mkn

function mkn(width, color, x, y) {
    this.width = width;
    this.height = width;
    this.kolor = color;
    this.x = x;
    this.y = y;    
    this.dirs;
    this.dir;
    this.update = function(){
        ctx = snake.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    
    this.move = function(){
        switch(this.dir){
            case 0:
                this.x -= size;break;
            case 1:
                this.y -= size;break;
            case 2:
                this.x += size;break;
            case 3:
                this.y += size;break;
            
        }
    };
}

var cgmknc = new Array();

function cgmkn(long){
    this.count = long;
    this.take = function(){
        if( this.count > 0)
        {
            
            addbodi();
            this.count = this.count - 1;
        }
};}
var cc = 0;
var cntmkn = function(){
    if(cc > 0){
        addbodi();
        cc--;
    }
};

function spwmkn(){
    if(time < 1){
        getmkn();getmkn();getmkn();getmkn();
    }else{
        
        //_________________________wanted for collison
        
        for(i = foods.length-1; i >= 0; i--){
            
            if(snack[0].x === foods[i].x && snack[0].y === foods[i].y){
                score += snack.length * 10;
                addbodi();
                foods.splice(i,1);
                getmkn();
            }else if((snack[0].x === (foods[i].x + size) && snack[0].y === foods[i].y )||
                    (snack[0].x === foods[i].x && snack[0].y === (foods[i].y + size))||
                    (snack[0].x === (foods[i].x + size) && snack[0].y === (foods[i].y + size)))
                    
            {
                if((foods[i].width === (2*size))||(foods[i].width === (3*size)))
                {
                    cc += 4;
                    foods.splice(i,1);
                    getmkn();
                    score += snack.length * 10;
                }
            }else if((snack[0].x === foods[i].x && snack[0].y === (foods[i].y + (size*2)))||
                    (snack[0].x === (foods[i].x + size) && snack[0].y === (foods[i].y + (size*2)))||
                    (snack[0].x === (foods[i].x + (2*size))&& snack[0].y === (foods[i].y + (size*2)))||
                    (snack[0].x === foods[i].x + (2*size)&& snack[0].y === (foods[i].y + size))||
                    (snack[0].x === foods[i].x + (2*size)&& snack[0].y === foods[i].y)){
                
                if(foods[i].width === (3*size))
                {    
                    cc += 8;
                    foods.splice(i,1);
                    getmkn();
                    score += snack.length * 10;
                }
            }
        }
    }
}

var cons;

var top;

function cscolid(){
    
    for(i = 2; i < snack.length; i++ ){
        if(snack[i].x === snack[0].x && snack[i].y === snack[0].y){
            score -= (snack.length - i) * 10;
            tbod = snack.length - i;
            snack.splice(i,snack.length - i);
            cons = 0;
        }
    }
}

function cedges(){
    if(snack[0].x < 0 || snack[0].y < 0|| snack[0].x > widthscrn || 
            snack[0].y > heightscrn){
        cons = 1;
    }
}

var score = 0;

var tbod = 0;

var upscr = function(){
    score += 3;
    if(score >= hstscr){
        hstscr = score;
    }
};

var dispscrbrd = function(){
    var width = Math.round(widthscrn*(5/6));
    var height = Math.round(heightscrn*(6/7));
    var corx = (widthscrn/2) - (width/2);
    var cory = (heightscrn/2) - (height/2);
    ctx = snake.context;
    ctx.fillStyle = "#808080";
    ctx.fillRect( corx, cory, width, height);
    ctx.font = "30px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("SCORE     : " + score, corx + ((width/2) - 200), 
        cory + 108);
    ctx.fillText("HIGHSCORE : " + hstscr, corx + ((width/2) - 200), 
        cory + 150);
    ctx.fillText("PANJANG   : " + snack.length, corx + ((width/2) - 200), 
        cory + 194);
    if(score !== hstscr){
        ctx.fillText("GAMEOVER ", corx + ((width/2) - 100), cory + 50);
    }else{
        ctx.fillText("NEW HIGHSCORE !", corx + ((width/2) - 100), cory + 50);
    }
    ctx.font = "20px Arial";
    ctx.fillText("Tekan spacebar untuk coba lagi !", corx + ((width/2) - 150), 
        cory + 240);
};

var masreset = function(){
    dispscrbrd();
    score = 0;
    tbod = 0;
    time =0;
    top = undefined;
    cons = undefined;
    cc = 0;
    count = 0;
    nodel = 80;
    code = undefined;
    snack.splice(0,snack.length-1);
    foods.splice(0,foods.length-1);
    window.onkeydown = function (e) {
        var code = e.keyCode ? e.keyCode : e.which;
        if (code === 32 || code === 13){
            restart();
        }
    };
};

var notif = function(){
    upscr();
    if(cons === 0){
        scrboard.innerHTML = "BADAN TELAH TERPOTONG SEPANJANG " + tbod;
        if(nodel <= 0){cons = 2; nodel = 80;}else{nodel--;}
    }else if(cons === 1){
        scrboard.innerHTML = "Your creature was colide an edge";
        clearInterval(snake.runtime);
        masreset();
    }else{
        scrboard.innerHTML = "SCOR         : " + score + "<br>" +
                "HIGHEST SCORE : " + hstscr + "<br>" +
                "PANJANG BADAN : " + snack.length;
    }
};