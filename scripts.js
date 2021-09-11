const REPEAT = 15000
const PARTS = 3;
const tracerPoints = [[33, 20], [72, 44], [48.5, 58], [43.5, 61], [43.5, 26], [84, 50]]
const tracerFront = [true, true, false, false, false]
const lineLenghts = tracerPoints.reduce(
    (a, c, i, l) => i == 0 ? [] : [...a, hypdiff(c, l[i - 1])],
    [])
const lenghtSum = lineLenghts.reduce((a, c) => a + c)
const lineDurations = lineLenghts.map(c => c / lenghtSum * REPEAT)
const lineDurationsAggreg = lineDurations.reduce((a, c) => [...a, (a[a.length - 1] | 0) + c], [])

let start = null
let part = 0

const canvas = document.querySelector('.logo')
const ctx = canvas.getContext('2d');
setCanvasDimensions()
drawWireframe()
window.requestAnimationFrame(step)

function hypdiff(a, b) { return Math.hypot(b[0] - a[0], b[1] - a[1]) }

function scale(x, y) {
    return [x * canvas.width / 100, y * canvas.height / 100]
}

function move(x, y) {
    ctx.moveTo(...scale(x, y))
}

function line(x, y) {
    ctx.lineTo(...scale(x, y))
}

function draw(color) {
    ctx.beginPath()
    move(54, 50)
    line(38, 41)
    line(38, 82)
    line(28, 76.3)
    line(28.2, 23.6)
    // ctx.stroke()
    line(63.9, 44.2)
    ctx.fillStyle = color;
    ctx.fill();
}

function rotate(degrees) {
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(degrees * Math.PI / 180);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);
}

function setCanvasDimensions() {
    canvas.height = canvas.width = canvas.clientWidth * window.devicePixelRatio
    ctx.scale(1.5, 1.5)
    ctx.translate(...scale(-22, -16))
}

function drawWireframe() {
    ctx.lineWidth = 1 * canvas.width / 300;
    ctx.shadowBlur = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.strokeStyle = "#ddd"
    // ctx.setLineDash([5 * canvas.width / 300, 3 * canvas.width / 300]);
    draw('#999')
    rotate(120)
    draw('#DDD')
    rotate(120)
    draw('#666')
    rotate(120)
}

function getTracerPos(time, color) {
    let lineTime, current, start, end

    let lineIndex = lineDurationsAggreg.findIndex(b => time <= b)
    if (lineIndex < 0) lineIndex = lineDurationsAggreg.length - 1
    lineTime = lineDurations[lineIndex]
    current = time - (lineDurationsAggreg[lineIndex - 1] | 0)
    start = tracerPoints[lineIndex]
    end = tracerPoints[lineIndex + 1]

    ctx.strokeStyle = color;
    if (!tracerFront[lineIndex]) {
        ctx.globalAlpha = 0.1
    }

    if (current > lineTime) return end

    let x = start[0] + ((end[0] - start[0]) * (current / lineTime))
    let y = start[1] + ((end[1] - start[1]) * (current / lineTime))

    return [x, y]
}

function drawTracer(time) {
    let color = 'hsl('+ (Date.now() % 36000)/100 +',100%,';
    let colorLight = color + '60%)';
    let colorDark = color + '40%)';
    let shrink = 30*Math.sin(time/30)
    setDrawOptionsTracerFront(shrink, colorLight);
    ctx.beginPath()
    move(...getTracerPos(time + 20 + shrink, colorDark))
    line(...getTracerPos(time + 120 - shrink, colorDark))
    ctx.stroke()
    ctx.globalAlpha = 1
}

window.onresize = function () {
    setCanvasDimensions()
    drawWireframe()
}

function setDrawOptionsTracerFront(shrink, color) {
    ctx.setLineDash([]);
    ctx.lineCap = "round";
    ctx.shadowBlur = 5 * canvas.width / 300;
    ctx.lineWidth = (4 * canvas.width / 300) * (100+(shrink/2))/100;
    ctx.shadowColor = color;
}

function step(timestamp) {
    if (!start) start = timestamp;
    let progress = (timestamp - start) % (REPEAT * PARTS);
    let nextPart = Math.floor(progress / REPEAT)
    drawWireframe()
    rotate(120 * (part))
    drawTracer(progress % REPEAT)
    rotate(-120  * (part))
    part = nextPart
    window.requestAnimationFrame(step);
}

