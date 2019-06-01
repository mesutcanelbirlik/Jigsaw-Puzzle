pushToPuzzle();
function pushToPuzzle() {
    for (var i = 0; i < pieces * pieces; i++) {
        for (var j = 0; j < pieces; j++) {
            if ((i >= pieces * j) && (i <= pieces * j + pieces - 1)) {
                createPiece(canvas[i], contexts[i], (i - pieces * j) * (length - (length / 5.8)), j * (length - (length / 5.8)));
            }
        }
    }
}

function createPiece(c, context, olcuX, olcuY) {
    context.rect(length / 4, length / 4, length, length);

    //sol ust kose
    if (c.id == 0) {
        rightFirst(context, c.id);
        bottomFirst(context, c.id);
    }
    //sag ust kose
    else if (c.id == pieces - 1) {
        left(context, c.id);
        bottom(context, c.id);
    }
    //sag alt kose
    else if (c.id == (pieces * pieces) - 1) {
        left(context, c.id);
        pop(context, c.id);
    }
    //sol alt kose
    else if (c.id == (pieces * pieces) - pieces) {
        right(context, c.id);
        pop(context, c.id);
    }
    //ust kenar
    else if (c.id > 0 && c.id < pieces - 1) {
        left(context, c.id);
        right(context, c.id);
        bottom(context, c.id);
    }
    //alt kenar
    else if (c.id > ((pieces * pieces) - pieces) && c.id < ((pieces * pieces) - 1)) {
        left(context, c.id);
        right(context, c.id);
        pop(context, c.id);
    }
    //sol kenar 
    else if (leftEdge(c.id)) {
        right(context, c.id);
        pop(context, c.id);
        bottom(context, c.id);
    }
    //sag kenar 
    else if (rightEdge(c.id)) {
        left(context, c.id);
        pop(context, c.id);
        bottom(context, c.id);
    }
    //geriye kalanlar 
    else {
        left(context, c.id);
        right(context, c.id);
        pop(context, c.id);
        bottom(context, c.id);
    }
    context.clip();
    context.drawImage(imgTest, olcuX, olcuY, length + length / 4, length + length / 4, 0, 0, length + length / 2, length + length / 2);
}

function leftEdge(id) {
    for (var i = 1; i <= pieces - 2; i++) {
        if(id==(pieces * i)){
            return true;
        }
    }
}

function rightEdge(id) {
    var first = pieces + pieces - 1;
    for (var i = 1; i <= pieces - 2; i++) {
        if(id==first){
            return true;
        }
        first += pieces;
    }
}

function pop(context, id) {
    var state = Math.floor(Math.random() * 2);
    var x = length / 4 + length / 2;
    var y = length / 4;
    if (id > 0) {
        if (canvas[id - pieces].classList.contains("bottom-out")) {
            girinti(context, x, y, 1, 2);
            canvas[id].classList.add("top-in");
        } else if (canvas[id - pieces].classList.contains("bottom-in")) {
            cikinti(context, x, y);
            canvas[id].classList.add("top-out");
        }
    }
}

function left(context, id) {
    var state = Math.floor(Math.random() * 2);
    var x = length / 4;
    var y = length / 2 + length / 4;
    if (id > 0) {
        if (canvas[id - 1].classList.contains("right-out")) {
            girinti(context, x, y, 0.5, 1.5);
            canvas[id].classList.add("left-in");
        } else if (canvas[id - 1].classList.contains("right-in")) {
            cikinti(context, x, y);
            canvas[id].classList.add("left-out");
        }
    }
}

function bottomFirst(context, id) {
    var state = Math.floor(Math.random() * 2);
    var x = length / 2 + length / 4;
    var y = length + length / 4;
    if (state == 0) {
        cikinti(context, x, y);
        canvas[id].classList.add("bottom-out");
    } else if (state == 1) {
        girinti(context, x, y, 2, 1);
        canvas[id].classList.add("bottom-in");
    }
}

function bottom(context, id) {
    var state = Math.floor(Math.random() * 2);
    var x = length / 2 + length / 4;
    var y = length + length / 4;
    if (id > 0) {
        if (canvas[id - 1].classList.contains("bottom-out") == false) {
            cikinti(context, x, y);
            canvas[id].classList.add("bottom-out");
        } else if (canvas[id - 1].classList.contains("bottom-in") == false) {
            girinti(context, x, y, 2, 1);
            canvas[id].classList.add("bottom-in");
        }
    }
}

function rightFirst(context, id) {
    var state = Math.floor(Math.random() * 2);
    var x = length + length / 4;
    var y = length / 2 + length / 4;
    if (state == 0) {
        cikinti(context, x, y);
        canvas[id].classList.add("right-out");
    } else if (state == 1) {
        girinti(context, x, y, 1.5, 0.5);
        canvas[id].classList.add("right-in");
    }
}

function right(context, id) {
    var state = Math.floor(Math.random() * 2);
    var x = length + length / 4;
    var y = length / 2 + length / 4;
    if (id > 0) {
        if (canvas[id - 1].classList.contains("right-out") == false) {
            cikinti(context, x, y);
            canvas[id].classList.add("right-out");
        } else if (canvas[id - 1].classList.contains("right-in") == false) {
            girinti(context, x, y, 1.5, 0.5);
            canvas[id].classList.add("right-in");
        }
    }
}

function cikinti(context, x, y) {
    context.moveTo(x, y);
    context.arc(x, y, length / 4, 0, 360);
}

function girinti(context, x, y, start, end) {
    var radius = length / 4;
    context.moveTo(x, y);
    context.arc(x, y, radius, start * Math.PI, end * Math.PI, true);
    context.clearRect(x - radius, y - radius, radius * 2, radius * 2);
}