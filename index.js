const images = [
    "./images/homes/crystal-sam.jpg",
    "./images/homes/4-27-25 Final.jpg",
    "./images/homes/33 Chesley Dr..jpg",
    "./images/homes/58 Varney Rd..jpg",
    "./images/homes/394 Timber lane mat cropped.jpg",
    "./images/homes/Final 1.jpg",
    "./images/homes/Portrait-of-Mildred-©-2022.jpg",
    "./images/pets/Lando.jpg",
    "./images/pets/Mom and Foal.jpg",
    "./images/pets/Obi.jpg",
    "./images/pets/Sammi.jpg",
    "./images/pets/Shady.jpg",
    "./images/pets/Margy.jpg"
]

const slides = document.querySelectorAll(".slide")

let current = 0
let next = 1

slides[current].style.backgroundImage =
    `url("${images[Math.floor(Math.random()*images.length)]}")`

function changeSlide(){

    slides[next].style.backgroundImage =
        `url("${images[Math.floor(Math.random()*images.length)]}")`

    slides[next].classList.add("active")
    slides[current].classList.remove("active")

    current = next
    next = (next + 1) % slides.length
}

setInterval(changeSlide, 5500)