var canvas = document.createElement("canvas");
var width = canvas.width = window.innerWidth * 0.75;
var height = canvas.height = window.innerHeight * 0.75;
document.body.appendChild(canvas);
var gl = canvas.getContext('webgl');

var numMetaballs = 16;
var metaballs = [];

for (var i = 0; i < numMetaballs; i++) {
    var radius = Math.random() * 60 + 10;
    metaballs.push({
        x: Math.random() * (width - 2 * radius) + radius,
        y: Math.random() * (height - 2 * radius) + radius,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        r: radius * 0.75
    });
}

var vertexShaderSrc = `
attribute vec2 position;

void main() {
gl_Position = vec4(position, 0.0, 1.0);
}
`;

var fragmentShaderSrc = `
precision highp float;

const float WIDTH = ` + (width >> 0) + `.0;
const float HEIGHT = ` + (height >> 0) + `.0;

uniform vec3 metaballs[` + numMetaballs + `];

void main(){
float x = gl_FragCoord.x;
float y = gl_FragCoord.y;

float sum = 0.0;
for (int i = 0; i < ` + numMetaballs + `; i++) {
vec3 metaball = metaballs[i];
float dx = metaball.x - x;
float dy = metaball.y - y;
float radius = metaball.z;

sum += (radius * radius) / (dx * dx + dy * dy);
}

if (sum >= 0.99) {
    vec3 baseColor = vec3(0.7137254901960784, 0, 0); // rosado claro
    vec3 borderColor = vec3(0.6588235294117647, 0.0, 0.0); // rojo
    float borderFactor = max(0.0, 1.0 - (sum - 0.99) * 100.0);
    vec3 finalColor = mix(baseColor, borderColor, borderFactor);
    gl_FragColor = vec4(finalColor, 1.0);
    return;
}

gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
}

`;

var vertexShader = compileShader(vertexShaderSrc, gl.VERTEX_SHADER);
var fragmentShader = compileShader(fragmentShaderSrc, gl.FRAGMENT_SHADER);

var program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
gl.useProgram(program);

var vertexData = new Float32Array([
    -1.0, 1.0,
    -1.0, -1.0,
    1.0, 1.0,
    1.0, -1.0,
]);
var vertexDataBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexDataBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);

var positionHandle = getAttribLocation(program, 'position');
gl.enableVertexAttribArray(positionHandle);
gl.vertexAttribPointer(positionHandle, 2, gl.FLOAT, gl.FALSE, 2 * 4, 0);

var metaballsHandle = getUniformLocation(program, 'metaballs');

loop();
function loop() {
    for (var i = 0; i < numMetaballs; i++) {
        var metaball = metaballs[i];
        metaball.x += metaball.vx;
        metaball.y += metaball.vy;

        if (metaball.x < metaball.r || metaball.x > width - metaball.r) metaball.vx *= -1;
        if (metaball.y < metaball.r) metaball.vy = Math.abs(metaball.vy); // Si la bola toca el borde inferior, invertir la dirección vertical para que no rebote.
        if (metaball.y > height - metaball.r) metaball.vy *= -1;

    }

    var dataToSendToGPU = new Float32Array(3 * numMetaballs);
    for (var i = 0; i < numMetaballs; i++) {
        var baseIndex = 3 * i;
        var mb = metaballs[i];
        dataToSendToGPU[baseIndex + 0] = mb.x;
        dataToSendToGPU[baseIndex + 1] = mb.y;
        dataToSendToGPU[baseIndex + 2] = mb.r;
    }
    gl.uniform3fv(metaballsHandle, dataToSendToGPU);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    requestAnimationFrame(loop);
}

function compileShader(shaderSource, shaderType) {
    var shader = gl.createShader(shaderType);
    gl.shaderSource(shader, shaderSource);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw "Shader compile failed with: " + gl.getShaderInfoLog(shader);
    }

    return shader;
}

function getUniformLocation(program, name) {
    var uniformLocation = gl.getUniformLocation(program, name);
    if (uniformLocation === -1) {
        throw 'Can not find uniform ' + name + '.';
    }
    return uniformLocation;
}

function getAttribLocation(program, name) {
    var attributeLocation = gl.getAttribLocation(program, name);
    if (attributeLocation === -1) {
        throw 'Can not find attribute ' + name + '.';
    }
    return attributeLocation;
}

window.addEventListener('resize', function () {
    width = canvas.width = window.innerWidth * 0.75;
    height = canvas.height = window.innerHeight * 0.75;

    metaballs = [];

    for (var i = 0; i < numMetaballs; i++) {
        var radius = Math.random() * 60 + 10;
        metaballs.push({
            x: Math.random() * (width - 2 * radius) + radius,
            y: Math.random() * (height - 2 * radius) + radius,
            vx: (Math.random() - 0.5) * 1,
            vy: (Math.random() - 0.5) * 1,
            r: radius * 0.75
        });
    }
});

"use strict";

function qs(selector, all = false) {
    return all ? document.querySelectorAll(selector) : document.querySelector(selector);
}

function scrollToSection(element) {
    const headerHeight = qs('header').offsetHeight;
    const offset = 20;

    window.scrollTo({
        top: element.offsetTop - headerHeight - offset,
        behavior: 'smooth'
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const homeIcon = qs('a > i.ri-arrow-down-double-line');
    const projects = qs('.projects');
    const navLinks = qs('.nav-links');
    const toggleButton = qs('.menu-toggle');

    if (homeIcon && projects) {
        homeIcon.addEventListener('click', () => {
            scrollToSection(projects);
        });
    }

    const navLinksA = qs('.nav-links a', true);

    navLinksA.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                scrollToSection(targetElement);
            }
        });
    });

    if (toggleButton && navLinks) {
        toggleButton.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
        });
    }

    if (navLinks) {
        navLinks.addEventListener('click', (event) => {
            if (event.target.tagName === 'A') {
                navLinks.classList.remove('nav-active');
            }
        });
    }
});