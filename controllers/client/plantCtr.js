var plantCtr = {}

plantCtr.CANVAS_X = 50;
plantCtr.CANVAS_Y = 50;
plantCtr.CANVAS_W = 1000;
plantCtr.CANVAS_H = 200;
plantCtr.IMAGE_W = 100;
plantCtr.IMAGE_H = 100;

plantCtr.con;
plantCtr.x = 0;
plantCtr.dx = 10;
plantCtr.image;


plantCtr.init = function init() {
    plantCtr.con = document.getElementById("canvas").getContext("2d");
    plantCtr.image = new Image();
    plantCtr.image.src = "https://img.clipartxtras.com/7a99f4b3b6998c86b57a292aac76d4fa_airport-airports-icon-036430-icons-etc-white-airplane-clipart-no-background_512-512.png"

    setInterval(plantCtr.draw, 50);
}

plantCtr.draw = function draw() {
    plantCtr.con.strokeStyle = "white";
    plantCtr.con.fillStyle = "white";
    plantCtr.con.fillRect(0, 0, plantCtr.CANVAS_W, plantCtr.CANVAS_H);
    plantCtr.con.strokeRect(0, 0, plantCtr.CANVAS_W, plantCtr.CANVAS_H);

    if (plantCtr.x > 800) plantCtr.x = 0;

    plantCtr.con.save();
    
    plantCtr.con.drawImage(plantCtr.image, plantCtr.x, 0, plantCtr.IMAGE_W, plantCtr.IMAGE_H);
    plantCtr.x += plantCtr.dx
    plantCtr.con.restore();
}
plantCtr.init();