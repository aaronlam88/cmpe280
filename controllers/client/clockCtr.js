var clockCtr = {};

clockCtr.canvas = document.getElementById("canvas");
clockCtr.ctx = clockCtr.canvas.getContext("2d");
clockCtr.radius = clockCtr.canvas.height / 2;
clockCtr.ctx.translate(clockCtr.radius, clockCtr.radius);
clockCtr.radius = clockCtr.radius * 0.90

clockCtr.drawClock = function drawClock() {
    clockCtr.drawFace(clockCtr.ctx, clockCtr.radius);
    clockCtr.drawNumbers(clockCtr.ctx, clockCtr.radius);
    clockCtr.drawTime(clockCtr.ctx, clockCtr.radius);
};

clockCtr.drawFace = function drawFace(ctx, radius) {
    var grad;
    clockCtr.ctx.beginPath();
    clockCtr.ctx.arc(0, 0, clockCtr.radius, 0, 2 * Math.PI);
    clockCtr.ctx.fillStyle = 'white';
    clockCtr.ctx.fill();
    grad = clockCtr.ctx.createRadialGradient(0, 0, clockCtr.radius * 0.95, 0, 0, clockCtr.radius * 1.05);
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#333');
    clockCtr.ctx.strokeStyle = grad;
    clockCtr.ctx.lineWidth = clockCtr.radius * 0.1;
    clockCtr.ctx.stroke();
    clockCtr.ctx.beginPath();
    clockCtr.ctx.arc(0, 0, clockCtr.radius * 0.1, 0, 2 * Math.PI);
    clockCtr.ctx.fillStyle = '#333';
    clockCtr.ctx.fill();
};

clockCtr.drawNumbers = function drawNumbers(ctx, radius) {
    var ang;
    var num;
    clockCtr.ctx.font = clockCtr.radius * 0.15 + "px arial";
    clockCtr.ctx.textBaseline = "middle";
    clockCtr.ctx.textAlign = "center";
    for (num = 1; num < 13; num++) {
        ang = num * Math.PI / 6;
        clockCtr.ctx.rotate(ang);
        clockCtr.ctx.translate(0, -clockCtr.radius * 0.85);
        clockCtr.ctx.rotate(-ang);
        clockCtr.ctx.fillText(num.toString(), 0, 0);
        clockCtr.ctx.rotate(ang);
        clockCtr.ctx.translate(0, clockCtr.radius * 0.85);
        clockCtr.ctx.rotate(-ang);
    }
};

clockCtr.drawTime = function drawTime(ctx, radius) {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    hour = hour % 12;
    hour = (hour * Math.PI / 6) +
        (minute * Math.PI / (6 * 60)) +
        (second * Math.PI / (360 * 60));
        clockCtr.drawHand(clockCtr.ctx, hour, clockCtr.radius * 0.5, clockCtr.radius * 0.07);
    //minute
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    clockCtr.drawHand(clockCtr.ctx, minute, clockCtr.radius * 0.8, clockCtr.radius * 0.07);
    // second
    second = (second * Math.PI / 30);
    clockCtr.drawHand(clockCtr.ctx, second, clockCtr.radius * 0.9, clockCtr.radius * 0.02);
};

clockCtr.drawHand = function drawHand(ctx, pos, length, width) {
    clockCtr.ctx.beginPath();
    clockCtr.ctx.lineWidth = width;
    clockCtr.ctx.lineCap = "round";
    clockCtr.ctx.moveTo(0, 0);
    clockCtr.ctx.rotate(pos);
    clockCtr.ctx.lineTo(0, -length);
    clockCtr.ctx.stroke();
    clockCtr.ctx.rotate(-pos);
};

setInterval(clockCtr.drawClock, 1000);