const $area = document.querySelector('.area');
const $box = document.querySelector('.box');
const $addBtn = document.querySelector('.btn');
const $delete = document.querySelector('.delete');
const $note = document.querySelector('.note')

let action = false;
let $selectedBox = null;
let selectedBoxIndex = null;
let $selectedNote = null;
let selectedNoteIndex = null;
let boxes = [];
let messages = [];

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

if (!!getLS('coords')) {
    boxes = getLS('coords');
    boxGenerator(boxes);
}

function setLS(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getLS(key) {
    return JSON.parse(localStorage.getItem(key));
}

function boxGenerator(list) {
    let template = '';
    for(let i = 0; i < list.length; i++){
        if (!!getLS('messages')) {
            messages = getLS('messages');
        }
        else {
            messages[i] = '';
        }
        template += '<div class="box" style="left: ' + list[i].x + 'px; top: ' + list[i].y + 'px;" data-index="' + i + '"><img src="img/cross.svg" class="delete"><textarea class="note" placeholder="Введите текст заметки:" maxlength="120" data-index="'+ i + '">' + messages[i] + '</textarea></div>';
    }
    $area.innerHTML = template;
    boxWidth = document.querySelector('.box').offsetWidth;
    boxHeight = document.querySelector('.box').offsetHeight;
}

function boxController(x, y) {
    $selectedBox.style.left = x + 'px';
    $selectedBox.style.top = y + 'px';
}

$area.addEventListener('mousedown', function(e) {
    if (e.target.classList.contains('box')) {
        action = true;
        $selectedBox = e.target;   
        selectedBoxIndex = e.target.getAttribute('data-index');
        startCoords.x = e.pageX;
        startCoords.y = e.pageY;
    }
});

$area.addEventListener('change', function(e) {
    if (e.target.classList.contains('note')) {
        value = getLS('messages')
        selectedNoteIndex = e.target.getAttribute('data-index');
        messages[selectedNoteIndex] = e.target.value;
        setLS('messages', messages);
    }
});


$area.addEventListener('mouseup', function(e) {
    action = false;
    boxes[selectedBoxIndex].x = distance.x;
    boxes[selectedBoxIndex].y = distance.y;
    setLS('coords', boxes);
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