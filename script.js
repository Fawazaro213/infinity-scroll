const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 15;
const apiKey = '5HhKbIbAixgICKrDZjEsmEKmgGH-7HA-zD8gz66SoY8';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
    console.log('image loaded');
    imagesLoaded++;
    console.log(imagesLoaded)
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log('ready', ready);
    }
}

// Helper function to Set Attribute on DOM Element
function setAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
}
}

// Create element links and photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // run function for each object in photosArray
    photosArray.forEach((photo) => {
        // creating an anchor element to link to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        // create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        // Event Listener
        img.addEventListener('load', imageLoaded);
        // item.setAttribute('src', photo.urls.regular);
        // item.setAttribute('alt', photo.alt_description);
        // item.setAttribute('title', photo.alt_description);
        // Put <img> inside <a> and put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item)
    });
}

// Get Photo from Unsplash API
async function getPhotos() {
    try{
        const res = await fetch(apiUrl);
        photosArray = await res.json();
        displayPhotos();
        // const data = await res.json();
        // console.log(photosArray);
    } catch (error) {
        // return error
    }
}

// Check to see if scrolling near a bottom of a page load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready)  {
        ready = false;
        getPhotos();
        console.log("Load more")
     }
})

// onLoad
getPhotos();