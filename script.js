//js. 
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 50;
const apiKey = 'Q1jb9wG6XcmSmlcKfOCIwqqBSLyxwQ7yi81Xi5zO1K8';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

//if all images were loaded
function allImageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Set Attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements For Links & Photos, Add to DOM
function showPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  //for each object in photosArray
  photosArray.forEach((photo) => {
    //<a> to link to full photo
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    //<img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event Listener, check when each is finished loading
    img.addEventListener('load', allImageLoaded);
    // Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
async function collectPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    showPhotos();
  } catch (error) {
    // Catch Error Here
    console.log(error)
  }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    showPhotos();
  }
});

// On Load
collectPhotos();