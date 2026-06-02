const images = [
    "./images/hero-images/23-high-st.jpg",
    "./images/hero-images/33-chesley-dr.jpg",
    "./images/hero-images/58-varney-rd.jpg",
    "./images/hero-images/394-timber-lane.jpg",
    "./images/hero-images/arneil.jpg",
    "./images/hero-images/boba.jpg",
    "./images/hero-images/ellowyn.jpg",
    "./images/hero-images/margie.jpg",
    "./images/hero-images/mom-and-foal.jpg",
    "./images/hero-images/obi.jpg",
    "./images/hero-images/odonnel-house-barrington.jpg",
    "./images/hero-images/sammi.jpg",
    "./images/hero-images/shady-cropped.jpg"
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