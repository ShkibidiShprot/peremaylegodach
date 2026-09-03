import './style.css';
import { toMaylego, fromMaylego } from './text.js';

const inputArea = document.getElementById('userInput');
const outputDiv = document.getElementById('output');
const wrapperTo = document.getElementById('wrapperTo');
const wrapperFrom = document.getElementById('wrapperFrom');
const copyBtn = document.getElementById('copyBtn');
const btnToMaylego = document.getElementById('btnToMaylego');
const btnFromMaylego = document.getElementById('btnFromMaylego');
const bouncingImg = document.getElementById('bouncingImage');

let mode = 'toMaylego';

function autoResizeTextarea() {
  inputArea.style.height = 'auto';
  inputArea.style.height = inputArea.scrollHeight + 'px';
}

document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
  });
});

function createImpactSparks(x, y) {
  const vw = document.documentElement.clientWidth;
  const vh = window.innerHeight;
  const EDGE = 40;
  const particles = [];
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < 8; i++) {
    const particle = document.createElement('div');
    particle.className = 'sparkle-particle';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    const angle = Math.random() * Math.PI * 2;
    const distance = 15 + Math.random() * 20;
    let dx = Math.cos(angle) * distance;
    let dy = Math.sin(angle) * distance;

    if (x > vw - EDGE) dx = -Math.abs(dx);
    else if (x < EDGE) dx = Math.abs(dx);
    if (y > vh - EDGE) dy = -Math.abs(dy);
    else if (y < EDGE) dy = Math.abs(dy);

    particle.style.setProperty('--dx', `${dx}px`);
    particle.style.setProperty('--dy', `${dy}px`);

    fragment.appendChild(particle);
    particles.push(particle);
  }

  document.body.appendChild(fragment);
  setTimeout(() => particles.forEach(p => p.remove()), 500);
}

const BASE_SPEED_X = 140;
const BASE_SPEED_Y = 110;
const CORNER_MARGIN = 20;
const PARTICLE_SIZE = 6;

let posX = 50;
let posY = 50;
let dirX = 1;
let dirY = 1;
let lastTime = null;

let imgWidth = bouncingImg.offsetWidth || 100;
let imgHeight = bouncingImg.offsetHeight || 100;
window.addEventListener('load', () => {
  imgWidth = bouncingImg.offsetWidth || imgWidth;
  imgHeight = bouncingImg.offsetHeight || imgHeight;
});

function animateDVD(currentTime) {
  if (!lastTime) lastTime = currentTime;
  const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
  lastTime = currentTime;

  const maxX = document.documentElement.clientWidth - imgWidth - 2;
  const maxY = window.innerHeight - imgHeight - 2;

  posX += dirX * BASE_SPEED_X * delta;
  posY += dirY * BASE_SPEED_Y * delta;

  const isNearX = posX <= CORNER_MARGIN || posX >= maxX - CORNER_MARGIN;
  const isNearY = posY <= CORNER_MARGIN || posY >= maxY - CORNER_MARGIN;

  if (isNearX && isNearY) {
    dirX = -dirX;
    createImpactSparks(posX + imgWidth / 2, posY + imgHeight / 2);
  }

  if (posX >= maxX) {
    posX = maxX;
    dirX = -1;
    createImpactSparks(maxX + imgWidth - PARTICLE_SIZE, posY + imgHeight / 2);
  } else if (posX <= 0) {
    posX = 0;
    dirX = 1;
    createImpactSparks(0, posY + imgHeight / 2);
  }

  if (posY >= maxY) {
    posY = maxY;
    dirY = -1;
    createImpactSparks(posX + imgWidth / 2, maxY + imgHeight - PARTICLE_SIZE);
  } else if (posY <= 0) {
    posY = 0;
    dirY = 1;
    createImpactSparks(posX + imgWidth / 2, 0);
  }

  bouncingImg.style.transform = `translate3d(${posX.toFixed(2)}px, ${posY.toFixed(2)}px, 0)`;
  requestAnimationFrame(animateDVD);
}

function initSparks() {
  document.querySelectorAll('.spark-btn-wrapper').forEach(wrapper => {
    const btn = wrapper.querySelector('.spark-btn');
    const rect = wrapper.querySelector('.spark-path');

    rect.setAttribute('width', btn.offsetWidth - 2);
    rect.setAttribute('height', btn.offsetHeight - 2);

    const total = rect.getTotalLength();
    const sparkLength = 45;

    rect.style.strokeDasharray = `${sparkLength} ${total - sparkLength}`;
    rect.style.setProperty('--total-length', -total);
  });
}

function processText() {
  autoResizeTextarea();
  const input = inputArea.value.trim();

  outputDiv.classList.remove('update');
  void outputDiv.offsetWidth;
  outputDiv.classList.add('update');

  if (!input) {
    outputDiv.innerHTML = '<span class="placeholder">Тут з\'явиться майлеготат.</span>';
    return;
  }

  outputDiv.textContent = mode === 'toMaylego' ? toMaylego(input) : fromMaylego(input);
}

function setMode(newMode) {
  mode = newMode;
  const isToMaylego = mode === 'toMaylego';
  wrapperTo.classList.toggle('active', isToMaylego);
  wrapperFrom.classList.toggle('active', !isToMaylego);
  processText();
}

function copyResult() {
  const textToCopy = outputDiv.textContent;

  if (!textToCopy || outputDiv.querySelector('.placeholder')) return;

  navigator.clipboard.writeText(textToCopy).then(() => {
    const originalText = copyBtn.textContent;
    copyBtn.textContent = 'Скопійовано!';
    copyBtn.classList.add('copied');

    setTimeout(() => {
      copyBtn.textContent = originalText;
      copyBtn.classList.remove('copied');
    }, 2000);
  });
}

btnToMaylego.addEventListener('click', () => setMode('toMaylego'));
btnFromMaylego.addEventListener('click', () => setMode('fromMaylego'));
copyBtn.addEventListener('click', copyResult);
inputArea.addEventListener('input', processText);
window.addEventListener('resize', initSparks);

initSparks();
bouncingImg.style.transform = 'translate3d(50px, 50px, 0)';
requestAnimationFrame(animateDVD);
