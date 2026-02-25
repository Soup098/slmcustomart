const images = [
    "./images/homes/4-27-25 Final.jpg",
    "./images/homes/33 Chesley Dr..jpg",
    "./images/homes/58 Varney Rd..jpg",
    "./images/homes/394 Timber lane mat cropped.jpg",
    "./images/homes/Final 1.jpg",
    "./images/homes/Portrait-of-Mildred-©-2022.jpg",
    "./images/pets/Lando.jpg",
    "./images/pets/Mica finished.jpg",
    "./images/pets/Mom and Foal.jpg",
    "./images/pets/Obi.jpg",
    "./images/pets/Sammi.jpg",
    "./images/pets/Shady.jpg",
]

const slideshow = document.getElementById("home-slideshow")

let index = Math.floor(Math.random() * images.length)

function changeSlide(){
    slideshow.style.backgroundImage = `url("${images[index]}")`
    index = Math.floor(Math.random() * images.length)
}

changeSlide()

setInterval(changeSlide, 5000)