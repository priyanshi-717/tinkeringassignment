let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

let drawing = false;
let tool = "pencil";
let color = "#e4434e9e";
let brushSize = 2;


function setTool(selectedTool) {
    tool = selectedTool;
}


document.getElementById("colorPicker").addEventListener("change", (e) => {
    color = e.target.value;
});

document.getElementById("brushSize").addEventListener("input", (e) => {
    brushSize = e.target.value;
});


canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mouseup", stopDraw);
canvas.addEventListener("mousemove", draw);

canvas.addEventListener("touchstart", startDraw);
canvas.addEventListener("touchend", stopDraw);
canvas.addEventListener("touchmove", drawTouch);

function startDraw(e) {
    drawing = true;
    draw(e);
}

function stopDraw() {
    drawing = false;
    ctx.beginPath();
}

function draw(e) {
    if (!drawing) return;

    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";

    if (tool === "eraser") {
        ctx.strokeStyle = "#ffffff";
    } else {
        ctx.strokeStyle = color;
    }

    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
}
function drawTouch(e) {
    e.preventDefault();
    let rect = canvas.getBoundingClientRect();
    let touch = e.touches[0];

    let x = touch.clientX - rect.left;
    let y = touch.clientY - rect.top;

    draw({ offsetX: x, offsetY: y });
}
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function saveNote() {
    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;
    let image = canvas.toDataURL();

    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    notes.push({ title, content, image });

    localStorage.setItem("notes", JSON.stringify(notes));

    clearInputs();
    displayNotes();
}

function displayNotes() {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    let notesDiv = document.getElementById("notes");

    notesDiv.innerHTML = "";

    notes.forEach((note, index) => {
        notesDiv.innerHTML += `
            <div class="note">
                <h3>${note.title}</h3>
                <p>${note.content}</p>
                <img src="${note.image}" width="200"/>
                <br>
                <button onclick="editNote(${index})">Edit</button>
                <button onclick="deleteNote(${index})">Delete</button>
            </div>
        `;
    });
}
function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes"));
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
}
function editNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes"));

    document.getElementById("title").value = notes[index].title;
    document.getElementById("content").value = notes[index].content;

    let img = new Image();
    img.src = notes[index].image;
    img.onload = function() {
        ctx.drawImage(img, 0, 0);
    };

    deleteNote(index);
}
function clearInputs() {
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
window.onload = displayNotes;