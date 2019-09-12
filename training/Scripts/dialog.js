/* Определяем тип браузера */
var ie = 0;
var op = 0;
var ff = 0;
var browser = navigator.userAgent;
if (browser.indexOf("Opera") != -1) op = 1;
else {
    if (browser.indexOf("MSIE") != -1) ie = 1;
    else {
        if (browser.indexOf("Firefox") != -1) ff = 1;
    }
}
var block = document.getElementById("dialog");
delta_x = 0;
delta_y = 0;

block.onmousedown = saveXY;
if (op || ff) {
    block.addEventListener("onmousedown", saveXY, false);
}
document.onmouseup = clearXY;

function saveXY(obj_event) {

    if (obj_event) {
        x = obj_event.pageX;
        y = obj_event.pageY;
    }
    else {
        x = window.event.clientX;
        y = window.event.clientY;
        if (ie) {
            y -= 2;
            x -= 2;
        }
    }

    x_block = block.offsetLeft;
    y_block = block.offsetTop;

    delta_x = x_block - x;
    delta_y = y_block - y;

    document.onmousemove = moveBlock;
    if (op || ff)
        document.addEventListener("onmousemove", moveBlock, false);
}
function clearXY() {
    document.onmousemove = null;
}
function moveBlock(obj_event) {
    if (obj_event) {
        x = obj_event.pageX;
        y = obj_event.pageY;
    }
    else {
        x = window.event.clientX;
        y = window.event.clientY;
        if (ie) {
            y -= 2;
            x -= 2;
        }
    }
    new_x = delta_x + x;
    new_y = delta_y + y;
    block.style.top = new_y + "px";
    block.style.left = new_x + "px";
}