const ctx = document.getElementById('canvas').getContext('2d');
window.addEventListener('resize', resize);
resize();
let mousePos = {
    x: 0,
    y: 0

}
window.addEventListener('mousemove', draw);
window.addEventListener('mousedown', mousePosition);
window.addEventListener('mouseenter', mousePosition);

function mousePosition(e) {
//     console.log('ok')
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
}

function resize(e) {
//     console.log('ok2')
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    
}

function draw(e) {
//     console.log('ok3')
    if (e.buttons !== 1)
        return;
    ctx.beginPath();
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#195';
    ctx.linewidth = 5;
    ctx.moveTo(mousePos.x, mousePos.y);
    mousePosition(e);
    ctx.lineTo(mousePos.x, mousePos.y);
    ctx.stroke();
}

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