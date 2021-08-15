import { galleryItems } from './app.js'

const refs = {
  parentGallery: document.querySelector(".js-gallery"),
  modalWindow: document.querySelector(".js-lightbox"),
  modalOverlay: document.querySelector(".lightbox__overlay"),
  modalBtn: document.querySelector(".lightbox__button"),
  modalImg: document.querySelector('.lightbox__image'),

}
let { parentGallery, modalWindow, modalOverlay, modalBtn, modalImg } = refs;
let currentIndex = 0;
createGallery(galleryItems, parentGallery)

parentGallery.addEventListener('click', onOpenModal)
modalBtn.addEventListener('click', onCloseModal)
modalOverlay.addEventListener('click', onOverlayClose)

function createGallery(imagesArray, parentElement) {
  const htmlString = imagesArray.reduce((acc, {preview, original, description}, index) => acc + `<li class="gallery__item"> <a class="gallery__link" href="${original}" > <img class="gallery__image" src="${preview}" data-source="${original}" data-index="${index}" alt="${description}"/></a></li>`, '');
  return parentElement.insertAdjacentHTML('afterbegin', htmlString)
}

function onOpenModal(e) {
  window.addEventListener('keydown', onKeyPress)
  currentIndex = Number(e.target.dataset.index);

  e.preventDefault()
  if (!e.target.classList.contains('gallery__image')) {
    return;
  } 
  getSrcAndAlt(e);
  modalWindow.classList.add("is-open")
  
}

function onCloseModal() {
  window.removeEventListener('keydown', onKeyPress)
  modalWindow.classList.remove("is-open")
  setSrcAndAlt('', '');
}

function onKeyPress(e) {
  switch (e.code) {

    case "Escape":
      onCloseModal();
      break;
    
    case "ArrowRight":
      swipeRight();
      break;
    
    case "ArrowLeft":
      swipeLeft();
      break;
  }
}

function getSrcAndAlt(e) {
  const imageUrl = e.target.dataset.source;
  const imageAlt = e.target.alt;
  

  setSrcAndAlt(imageUrl, imageAlt);
}

function setSrcAndAlt(url, alt) {
  modalImg.src = url;
  modalImg.alt = alt;
}

function onOverlayClose(e) {
  if (e.target === e.currentTarget) {
    onCloseModal();
  }
}

function swipeRight() {
  currentIndex += 1;
  if (currentIndex > galleryItems.length - 1) {
    currentIndex = 0;
  }
  console.log(currentIndex);
  console.log(galleryItems[currentIndex]);
  modalImg.src = galleryItems[currentIndex].original;
  modalImg.alt = galleryItems[currentIndex].description;
}

function swipeLeft() {
  currentIndex -= 1;
  if (currentIndex < 0) {
    currentIndex = galleryItems.length - 1;
  }
  modalImg.src = galleryItems[currentIndex].original;
  modalImg.alt = galleryItems[currentIndex].description;
}