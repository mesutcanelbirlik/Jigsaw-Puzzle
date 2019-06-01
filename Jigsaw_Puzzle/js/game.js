var canvas = [];
var contexts = [];
var leftOffset = 0;
var topOffset = 0;
var pieces = Math.sqrt(localStorage.getItem("piecesNumber"));
var piece = localStorage.getItem("piecesNumber");
var imgTest = document.getElementById("image");
imgTest.src = localStorage.getItem("imgPath");
var length = 400 / pieces;
var timerValue = parseInt(localStorage.getItem("timerValue"));
console.log(timerValue);
document.getElementById('deneme').style.left = "520px";
document.getElementById('deneme').style.top = "20px";
let result = 0;
let sec = 0;


for (var i = 0; i < pieces * pieces; i++) {
    var x = document.createElement('canvas');
    x.id = i;
    x.width = length * 3 / 2;
    x.height = length * 3 / 2;
    x.style.borderRadius = '50px';
    x.style.zIndex = "1";
    canvas.push(x);
    contexts.push(x.getContext("2d"));
    dragDrop(x);
    document.getElementById("puzzle").appendChild(x);
}
solve(0);

for (var i = 0; i < pieces * pieces; i++) {
    var x = document.createElement('canvas');
    x.id = i + pieces * pieces;
    x.width = length * 3 / 2;
    x.height = length * 3 / 2;
    //x.style.borderRadius = '50px';
    x.style.zIndex = "-1";
    canvas.push(x);
    contexts.push(x.getContext("2d"));
    document.getElementById("puzzle").appendChild(x);
}
diz2(0);


function solve(offset) {
    for (var i = 0; i < pieces * pieces; i++) {
        for (var j = 0; j < pieces; j++) {
            if ((canvas[i].id >= pieces * j) && (canvas[i].id <= pieces * j + pieces - 1)) {
                canvas[i].style.left = leftOffset + ((canvas[i].id - pieces * j) * (length + offset)) + "px";
                canvas[i].style.top = topOffset + j * (length + offset) + "px";
            }
        }
    }
}

function diz2(offset) {
    var total = pieces*pieces;
    for (var i = total; i < total*2; i++) {
        for (var j = pieces; j < pieces*2; j++) {
            if ((canvas[i].id >= pieces * j) && (canvas[i].id <= pieces * j + pieces - 1)) {
                canvas[i].style.left = 500 + ((canvas[i].id - pieces * j) * (length + offset)) + "px";
                canvas[i].style.top = -400 + j * (length + offset) + "px";
            }
        }
    }
}

function countDown(el) {
    var element = document.getElementById('time');
    element.innerHTML = sec + " seconds";
    sec++
        var timer = setTimeout('countDown(' + sec + ',"' + el + '")', 1000);
    console.log(sec);
    if (sec == timerValue * 60 + 2 && timerValue != 0) {
        if (confirm("Time is up \n play again")) {
            window.location.href = "index.html"
        }
    }
}

function shuffle() {
    for (var i = 0; i < pieces * pieces; i++) {
        canvas[i].style.left = Math.floor(getRandom(leftOffset, 600)) + "px";
        canvas[i].style.top = Math.floor(getRandom(topOffset, 400)) + "px";
    }
    countDown(0, "time");
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

var count = 0;


function parcaTakip(a) {
    var leftint;
    var sp;
    if (pieces == 5) {
        leftint = 70;
        sp = leftint + 10;
    } else if (pieces == 7) {
        leftint = 55;
        sp = leftint;
    } else if (pieces == 10) {
        leftint = 40;
        sp = leftint;
    }
    if (a > 0) {
        var x1 = parseInt(canvas[a - 1].style.left);
        var y1 = parseInt(canvas[a].style.left);
        var leftRange = (y1 - x1);
        var c1 = parseInt(canvas[a - 1].style.top);
        var v1 = parseInt(canvas[a].style.top);

        if ((leftRange >= leftint) && (leftRange <= (leftint + 10))) {
            if (c1 == v1) {
                var audio = document.getElementById("audio");
                audio.play();
                var my = document.createElement('div');
                my.style.position = "absolute";
                my.style.left = canvas[a - 1].style.left;
                //my.id = count;
                canvas[a - 1].style.left = "0px";
                canvas[a].style.left = sp + "px";
                document.onmouseup = null;
                document.onmousemove = null;
                my.appendChild(canvas[a - 1]);
                my.appendChild(canvas[a]);
                dragDrop(my);
                document.getElementById("puzzle").appendChild(my);
                count++;
            }

        }
    }
}

function mergePieces(e) {
    var p = canvas[parseInt(e.id) + pieces * pieces];
    if (p.id == parseInt(e.id) + pieces * pieces) {
        if ((parseInt(p.style.left) - 2 <= parseInt(e.style.left)) &&
            (parseInt(p.style.left) + 2 >= parseInt(e.style.left))) {
            if ((parseInt(p.style.top) - 2 <= parseInt(e.style.top)) &&
                (parseInt(p.style.top) + 2 >= parseInt(e.style.top))) {
                console.log('text');
                var audio = document.getElementById("audio");
                audio.play()
                e.style.left = p.style.left;
                e.style.top = p.style.top;
                e.onmousedown = null;
                e.onmouseup = null;
                e.onmousemove = null;
                document.onmousedown = null;
                document.onmouseup = null;
                document.onmousemove = null;
                result++;
                console.log(result);

                console.log(piece)
if (result == piece) {
    imgTest.style.opacity="1";
    imgTest.style.display = "none";
    $("#image").fadeIn(1000);
    imgTest.style.zIndex="1";
    for(var i=0; i<pieces*pieces; i++){
        canvas[i].style.opacity="0";
        canvas[i].style.zIndex = "-1";
    }
    setTimeout(myFunction, 3000);
}
            }
        }
    }
}

function myFunction() {
    confirm("congratulation You Win \n time needed: " + sec +"\n Do you want to play again")
        window.location.href = "index.html"
  }

    //surukle birak fonksiyonu
    function dragDrop(element) {
        var pos1 = 0,
            pos2 = 0,
            pos3 = 0,
            pos4 = 0;

        //mouse tiklanma durumunda olacaklar
        element.onmousedown = function (e) {
            //event e icin browser config
            e = e || window.event;
            e.preventDefault();

            // baslangictaki mouse'un konumunu kayit eder
            pos3 = e.clientX;
            pos4 = e.clientY;

            //mouse la tiklanmama durumunda olacaklar
            document.onmouseup = function () {
                //tum event ler sifirlanir
                document.onmouseup = null;
                document.onmousemove = null;
            };

            // mouse hareket etme durumunda olacaklar
            document.onmousemove = function (e) {
                mergePieces(element);
                //event e icin browser config
                e = e || window.event;
                e.preventDefault();

                // mouse'un yeni konumunu ayarlar
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;

                // elemanin yeni konumunu ayarlar
                element.style.top = (element.offsetTop - pos2) + "px";
                element.style.left = (element.offsetLeft - pos1) + "px";
            };

        }
    }
    /*
    function dragstart_handler(event) {
        event.dataTransfer.setData("text", event.target.id);
    }

    function drop(event) {
        event.preventDefault();
        var data = event.dataTransfer.getData("text", event.target.id);
        console.log(data)
        
        console.log(event.target.id);
        console.log(document.getElementById(data));
        if (event.target.getAttribute('class') == 'drophere1') {
            event.target.appendChild(document.getElementById(data));
        }else{
            alert ("not allowed");
        }
        document.getElementById(data).draggable = false;
    }
    function dragover_handler(ev) {
        ev.preventDefault();
        ev.dataTransfer.dropEffect = "move"
         console.log("dragOver");
        console.log(ev.dataTransfer.dropEffect); 
    }*/