import { galleryItems } from './app.js'

const refs = {
  parentGallery: document.querySelector(".js-gallery"),
  modalWindow: document.querySelector(".js-lightbox"),
  modalOverlay: document.querySelector(".lightbox__overlay"),
  modalBtn: document.querySelector(".lightbox__button"),
  modalImg: document.querySelector('.lightbox__image'),

}

createGallery(galleryItems, refs.parentGallery)

refs.parentGallery.addEventListener('click', onOpenModal)
refs.modalBtn.addEventListener('click', onCloseModal)
refs.modalOverlay.addEventListener('click', onOverlayClose)

function createGallery(imagesArray, parentElement) {
  const htmlString = imagesArray.reduce((acc, {preview, original, description}) => acc + `<li class="gallery__item"> <a class="gallery__link" href="${original}" > <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}"/></a></li>`, '');
  return parentElement.insertAdjacentHTML('afterbegin', htmlString)
}

function onOpenModal(e) {
  e.preventDefault()
  if (!e.target.classList.contains('gallery__image')) {
    return;
  }
  window.addEventListener('keydown', onEscKeyPress)
  
  const imageUrl = e.target.dataset.source;
  const imageAlt = e.target.dataset.alt;
  const content = document.querySelector('.lightbox__image');
  console.log(content);
  content.src = imageUrl;
  content.alt = imageAlt;
  
  refs.modalWindow.classList.add("is-open")
}

function getSrc(e) {
  if (!e.target.classList.contains('gallery-image')) {
    return;
  }
  const imageUrl = e.currentTarget.dataset.source;
  console.log(imageUrl);
  const content = document.querySelector('lightbox__image');
  content.src = imageUrl;
}

function deleteSrc() {
  refs.modalImg.src = '';
  refs.modalImg.alt = '';
}

function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress)
  refs.modalWindow.classList.remove("is-open")
  deleteSrc();
}

function onOverlayClose(e) {
  if (e.target === e.currentTarget) {
    onCloseModal();
  }
}

function onEscKeyPress(e) {
  if (e.code === "Escape") {
    onCloseModal();
  }
  
}