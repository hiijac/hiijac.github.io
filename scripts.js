const slow = 1.5
const REPEAT = 15000 * slow
const PARTS = 3;
const TRACER_LENGTH = REPEAT / 400
const SHAPE = [[54, 50],[38, 41],[38, 82],[28, 76.3],[28.2, 23.6],[63.9, 44.2]]
const tracerPoints = [[36, 21.85], [72, 44], [43.5, 61], [43.5, 26], [84, 50], [81.38, 51.95]]
const lineLenghts = mapSubsequent(tracerPoints, hypdiff)
const lenghtSum = lineLenghts.reduce((a, c) => a + c)
const lineDurations = lineLenghts.map(c => c / lenghtSum * REPEAT)
const lineDurationsAggreg = lineDurations.reduce((a, c) => [...a, (a[a.length - 1] | 0) + c], [])

let start = null
let part = 0

const canvas = document.querySelector('.logo')
const ctx = canvas.getContext('2d');
setCanvasDimensions()
window.requestAnimationFrame(step)

function mapSubsequent(array, mapper) {
    return array.reduce(
        (a, c, i, l) => i == 0 ? [] : [...a, mapper(l[i - 1], c)],
    [])
}

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

    for (let i = 0; i < SHAPE.length; i++) {
        let point = SHAPE[i]
        if (!i) move(...point); else line(...point);
    }

    let grad = ctx.createLinearGradient(...scale(...SHAPE[5]), ...scale(...SHAPE[1]));
    grad.addColorStop(0, color.shad);
    grad.addColorStop(0.5, color.val);
    grad.addColorStop(1, color.val);

    ctx.fillStyle = grad;
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

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawWireframe(line, except) {
    ctx.save()
    ctx.lineWidth = 1 * canvas.width / 300;
    const colors = ['87', '53', '67'].map(c => ({
        val: `hsla(0,0%,${c}%,0.6)`,
        shad: `hsla(0,0%,${c*0.7}%,0.6)`
    }))
    rotate(120)
    colors.forEach((color, index) => {
        if (line == null || ((line === index) ^ except)) {
            draw(color)
        }
        rotate(120)
    })
    ctx.restore()
}

function perpendicularGradient(start, end, colorLight, colorDark) {
    let vec = start.map((c, i) => c - end[i])
    let dist = Math.sqrt(vec.map(c => c ** 2).reduce((a, c) => a + c));
    let offset = 1;
    let norm = vec.map(c => c / dist)
    let perp = norm.map(c => c * offset)
    perp.reverse()
    let mid = start.map((c, i) => (c + end[i]) / 2)
    let a = mid.map((c, i) => c - (perp[i] * (i * 2 - 1)))
    let b = mid.map((c, i) => c - (perp[i] * -(i * 2 - 1)))

    let grad = ctx.createLinearGradient(...scale(...a), ...scale(...b));
    grad.addColorStop(0, colorDark);
    grad.addColorStop(0.5, colorLight);
    grad.addColorStop(1, colorDark);

    return grad
}

function getTracerPos(time) {
    let lineTime, current, start, end

    let lineIndex = lineDurationsAggreg.findIndex(b => time <= b)
    if (lineIndex < 0) lineIndex = lineDurationsAggreg.length - 1
    lineTime = lineDurations[lineIndex]
    current = time - (lineDurationsAggreg[lineIndex - 1] | 0)
    start = tracerPoints[lineIndex]
    end = tracerPoints[lineIndex + 1]

    let x = start[0] + ((end[0] - start[0]) * (current / lineTime))
    let y = start[1] + ((end[1] - start[1]) * (current / lineTime))

    return [x, y]
}

function getStretch(time) {
    let amp = TRACER_LENGTH / 1.2
    let per = TRACER_LENGTH * 3.7
    return 4 * amp / per * Math.abs((((time - per / 4) % per) + per) % per - per / 2)
}

function drawTracer(time) {
    ctx.save()
    let color = 'hsla(' + 350 + ',100%,';
    let colorLight = color + '45%,1)';
    let colorDark = color + '40%,1)';
    let stretch = getStretch(time)
    
    const start = getTracerPos(time - stretch);
    const end = getTracerPos(time + TRACER_LENGTH + stretch);

    setTracerDrawOptions(stretch, colorLight);
    ctx.strokeStyle = perpendicularGradient(start,end,colorLight,colorDark)

    ctx.beginPath()
    move(...start)
    line(...end)
    ctx.stroke()
    ctx.restore()
}

window.onresize = function () {
    setCanvasDimensions()
    clearCanvas()
}

function setTracerDrawOptions(stretch, color) {
    ctx.setLineDash([]);
    ctx.lineCap = "round";
    ctx.shadowBlur = 5 * canvas.width / 300;
    ctx.lineWidth = (5 * canvas.width / 300) * (TRACER_LENGTH - (stretch / 6)) / TRACER_LENGTH;
    ctx.shadowColor = color;
}

function step(timestamp) {
    if (!start) start = timestamp;
    let progress = (timestamp - start) % (REPEAT * PARTS);
    let nextPart = Math.floor(progress / REPEAT)
    let time = progress % REPEAT;
    let tracerIndex = lineDurationsAggreg.findIndex(b => time <= b);
    let tracerLast = tracerIndex == lineDurations.length - 1
    let tracerInFront = tracerIndex < 2 || tracerLast
    let wireframePart = (part+tracerLast) % PARTS

    clearCanvas()
    if (tracerInFront) drawWireframe(wireframePart)
    rotate(120 * part)
    drawTracer(time)
    rotate(-120 * part)
    if (tracerInFront) drawWireframe(wireframePart, true)
    else drawWireframe()
    part = nextPart
    window.requestAnimationFrame(step);
}

