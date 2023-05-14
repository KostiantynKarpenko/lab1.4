const $area = document.querySelector('.area');
const $addBtn = document.querySelector('.btn');
const $titleTextarea = document.querySelector('.title');
const $messageTextarea = document.querySelector('.message');
const $textarea = document.querySelector("textarea");

let action = false;
let $selectedBox = null;
let selectedBoxIndex = null;
let boxes = [];

const areaWidth = $area.offsetWidth;
const areaHeight = $area.offsetHeight;
let boxWidth = 0;
let boxHeight = 0;

let startCoords = {
    x: 0,
    y: 0
}

let distance = {
    x: 0,
    y: 0
}

function boxGenerator(list) {
    let template = '';
    for(let i = 0; i < list.length; i++){
        template += '<div class="box" style="left: ' + list[i].x + 'px; top: ' + list[i].y + 'px;" data-index="' + i + '"><img src="img/cross.svg" class="delete"><textarea class="title" placeholder="Название" maxlength="32"></textarea><textarea class="message" id="myTextArea" placeholder="Введите текст заметки:" maxlength="120"></textarea></div>';
    }
    $area.innerHTML = template;
    boxWidth = document.querySelector('.box').offsetWidth;
    boxHeight = document.querySelector('.box').offsetHeight;
}
function boxController(x, y) {
    $selectedBox.style.left = x + 'px';
    $selectedBox.style.top = y + 'px';
}

// $textarea.addEventListener("input")



$area.addEventListener('mousedown', function(e) {
    if (e.target.classList.contains('box')) {
        action = true;
        $selectedBox = e.target;
        selectedBoxIndex = e.target.getAttribute('data-index');
        startCoords.x = e.pageX;
        startCoords.y = e.pageY;
    }
});
$area.addEventListener('mouseup', function(e) {
    action = false;
    boxes[selectedBoxIndex].x = distance.x;
    boxes[selectedBoxIndex].y = distance.y;
});
$area.addEventListener('mousemove', function(e) {
    if (action) {
        distance.x = boxes[selectedBoxIndex].x + (e.pageX - startCoords.x);
        distance.y = boxes[selectedBoxIndex].y + (e.pageY - startCoords.y);

        if (distance.x <= 0) distance.x = 0;
        if (distance.x >= (areaWidth - boxWidth)) distance.x = areaWidth - boxWidth;
        if (distance.y <= 0) distance.y = 0;
        if (distance.y >= (areaHeight - boxHeight)) distance.y = areaHeight - boxHeight;

        boxController(distance.x, distance.y); 
    }
});

$addBtn.addEventListener('click', function(e) {
    boxes.push({
        x:0,
        y:0
    });
    boxGenerator(boxes);
});