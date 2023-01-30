const display = document.querySelector('#count');
const pFrame = document.querySelector('#framePrevious');
const mFrame = document.querySelector('#frameMain');
const nFrame = document.querySelector('#frameNext');
const previousButton = document.querySelector('#previous');
const nextButton = document.querySelector('#next');

const collection = {
  images: [],
  counter: 0,
};
let timeID;
for (let i = 1; i <= 10; i++) {
  if (i === 4 || i === 9) { continue; }
  const img = document.createElement('img');
  img.src = `./img/pfal${i}.jpg`;
  collection.images.push(img);
}
function changeText() {
  display.innerText = `${collection.counter + 1}/${collection.images.length}`;
}
function getCount(change) {
  let count = collection.counter;
  count += change;
  if (count === collection.images.length) { return 0; }
  if (count === -1) { return collection.images.length - 1; }
  return count;
}
function appendLeft() {
  const left = collection.images[getCount(-1)];
  left.id = 'left';
  left.style.animation = 'create 0.5s linear';
  mFrame.append(left);
}
function appendRight() {
  const right = collection.images[getCount(1)];
  right.id = 'right';
  right.style.animation = 'create 0.5s linear';
  mFrame.append(right);
}
function appendMain() {
  const main = collection.images[getCount(0)];
  main.id = 'main';
  main.style.animation = 'create 0.5s linear';
  mFrame.append(main);
}
function goNext() {
  const left = document.querySelector('#left');
  const main = document.querySelector('#main');
  const right = document.querySelector('#right');
  left.remove();
  main.id = 'left';
  right.id = 'main';
  collection.counter = getCount(1);
  appendRight();
  changeText();
  markSlide();
  clearInterval(timeID);
  afk();
}
function goPrevious() {
  const left = document.querySelector('#left');
  const main = document.querySelector('#main');
  const right = document.querySelector('#right');
  right.remove();
  main.id = 'right';
  left.id = 'main';
  collection.counter = getCount(-1);
  appendLeft();
  changeText();
  markSlide();
  clearInterval(timeID);
  afk();
}
function removeAll() {
  while (mFrame.childNodes.length > 0) {
    mFrame.firstChild.remove();
  }
}
function update() {
  removeAll();
  changeText();
  appendRight();
  appendLeft();
  appendMain();
  markSlide();
  clearInterval(timeID);
  afk();
}
function markSlide() {
  slider.childNodes.forEach((node) => node.id = '');
  slider.childNodes[collection.counter].id = 'marked';
}
function afk() { timeID = setInterval(goNext, 10000); }
document.body.addEventListener('keydown', (e) => {
  if (e.code === 'ArrowLeft') { goPrevious(); }
  if (e.code === 'ArrowRight') { goNext(); }
});
nextButton.addEventListener('click', () => {
  goNext();
});
previousButton.addEventListener('click', () => {
  goPrevious();
});

const slider = document.querySelector('#slider');
for (let i = 0; i < collection.images.length; i++) {
  const slide = document.createElement('div');
  slide.className = 'slide';
  slide.addEventListener('click', () => {
    collection.counter = i;
    update();
  });
  slider.append(slide);
}

update();
