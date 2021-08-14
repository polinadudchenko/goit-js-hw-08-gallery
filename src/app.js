const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const refs = {
  parentGallery: document.querySelector(".js-gallery"),
  modalWindow: document.querySelector(".js-lightbox"),
  modalOverlay: document.querySelector(".lightbox__overlay"),
  modalBtn: document.querySelector(".lightbox__button"),
  modalImg: document.querySelector('.lightbox__image'),

}
const parentGallery = document.querySelector(".js-gallery");

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