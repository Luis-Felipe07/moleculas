

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

// CLASE DE LAS BOLAS PINTADAS EN PANTALLA
class Bola {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radio = 3; 
        this.dirX = Math.random() * 2 - 1;
        this.dirY = Math.random() * 2 - 1;
        this.velocidad = 1.5;
    }

    dibujar() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
    }

    mover() {
        this.x += this.dirX * this.velocidad;
        this.y += this.dirY * this.velocidad;

        // Rebote en los bordes del canvas
        if (this.x + this.radio > canvas.width || this.x - this.radio < 0) {
            this.dirX *= -1;
        }
        if (this.y + this.radio > canvas.height || this.y - this.radio < 0) {
            this.dirY *= -1;
        }
    }
}

// Crear múltiples partículas
let bolas = [];
const numBolas = 100; 

for (let i = 0; i < numBolas; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    bolas.push(new Bola(x, y));
}

// Función para dibujar líneas entre partículas cercanas
function dibujarLineas() {
    for (let i = 0; i < bolas.length; i++) {
        for (let j = i + 1; j < bolas.length; j++) {
            const dx = bolas[i].x - bolas[j].x;
            const dy = bolas[i].y - bolas[j].y;
            const distancia = Math.sqrt(dx * dx + dy * dy);

            // Dibuja una línea si las partículas están cerca
            if (distancia < 100) {
                ctx.beginPath();
                ctx.moveTo(bolas[i].x, bolas[i].y);
                ctx.lineTo(bolas[j].x, bolas[j].y);
                ctx.strokeStyle = `rgba(0, 0, 0, ${1 - distancia / 100})`; // Opacidad basada en la distancia
                ctx.lineWidth = 0.5;
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
}

// Animación principal
function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    bolas.forEach(bola => {
        bola.mover();
        bola.dibujar();
    });

    dibujarLineas(); 

    requestAnimationFrame(animar); 
}

animar();

