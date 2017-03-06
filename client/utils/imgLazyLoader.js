let timeoutId = null;
let imgList = [];
let interval = 250;
let className = 'zc-lazy-img';

function getElementLeft(ele) {
  let absoluteLeft = ele.offsetLeft;
  let parent = ele.offsetParent;

  while (parent !== null) {
    absoluteLeft += parent.offsetLeft;
    parent = parent.offsetParent;
  }
  return absoluteLeft;
}

function getElementTop(ele) {
  let absoluteTop = ele.offsetTop;
  let parent = ele.offsetParent;

  while (parent !== null) {
    absoluteTop += parent.offsetTop;
    parent = parent.offsetParent;
  }
  return absoluteTop;
}

function isShow(node) {
  // 获取浏览器视口高度
  const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
  const clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
  // 获取浏览器滚动了多少距离
  const scrollTop = document.body.scrollTop;
  const scrollLeft = document.body.scrollLeft;

  const nodeOffset = getElementTop(node);
  const nodeOffsetLeft = getElementLeft(node);
  const topDifference = nodeOffset - scrollTop;
  const leftDifference = nodeOffsetLeft - scrollLeft;
  let verticalVisible = false;
  let horizontalVisible = false;
  if (topDifference > 0 && topDifference < clientHeight) {
    verticalVisible = true;
  } else if (topDifference < 0 && (topDifference + node.offsetHeight) > 0) {
    verticalVisible = true;
  }

  if (leftDifference > 0 && leftDifference < clientWidth) {
    horizontalVisible = true;
  } else if (leftDifference < 0 && (leftDifference + node.offsetWidth) > 0) {
    horizontalVisible = true;
  }

  if (verticalVisible && horizontalVisible) {
    return true;
  }
  return false;
}

function loadImages() {
  let i;
  for (i = imgList.length - 1; i >= 0; i -= 1) {
    if (isShow(imgList[i])) {
      imgList[i].src = imgList[i].getAttribute('data-src');
      imgList[i].classList.remove(className);
      imgList.splice(i, 1);
    }
  }
}

function delay() {
  if (timeoutId !== null) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(loadImages, interval);
}

function init() {
  const nodelist = document.getElementsByClassName(className);
  imgList = Array.prototype.slice.call(nodelist);
  loadImages();
  window.addEventListener('scroll', delay);
}

const imgLazyLoader = {};

imgLazyLoader.init = function initImageLazyLoader(cls, inter) {
  className = cls || className;
  interval = inter || interval;
  init();
};

imgLazyLoader.cofigInterval = function configInterval(inter) {
  interval = inter || interval;
};

imgLazyLoader.findImages = function findImages() {
  const nodelist = document.getElementsByClassName(className);
  imgList = Array.prototype.slice.call(nodelist);
};

imgLazyLoader.stop = function stop() {
  window.removeEventListener('scroll', delay);
};

export default imgLazyLoader;
