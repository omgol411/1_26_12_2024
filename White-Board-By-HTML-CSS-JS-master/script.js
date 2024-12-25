const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const ws = new WebSocket('ws://localhost:8080');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let drawing = false;

canvas.addEventListener('mousedown', () => {
    drawing = true;
});

canvas.addEventListener('mouseup', () => {
    drawing = false;
    ctx.beginPath();
});

canvas.addEventListener('mousemove', (event) => {
    if (!drawing) return;

    const x = event.clientX;
    const y = event.clientY;

    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);

    // Send drawing data to the server
    ws.send(JSON.stringify({ x, y }));
});

// Handle incoming drawing data
ws.onmessage = (event) => {
    const { x, y } = JSON.parse(event.data);

    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
};

document.addEventListener('keydown', function(e) {
    const layer2 = document.querySelector('.layer2');
    const layer1 = document.querySelector('.layer1');
    if (e.key === 'P' || e.key === 'p') {
        layer1.style.pointerEvents = 'auto';
        layer2.style.pointerEvents = 'none';
    } else if (e.key === 'L' || e.key === 'l') {
        layer1.style.pointerEvents = 'none';
        layer2.style.pointerEvents = 'auto';
    }
});