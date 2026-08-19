const images = [
    "./images/hero-images/23-high-st.avif",
    "./images/hero-images/33-chesley-dr.avif",
    "./images/hero-images/58-varney-rd.avif",
    "./images/hero-images/394-timber-lane.avif",
    "./images/hero-images/arneil.avif",
    "./images/hero-images/boba.avif",
    "./images/hero-images/ellowyn.avif",
    "./images/hero-images/margie.avif",
    "./images/hero-images/mom-and-foal.avif",
    "./images/hero-images/obi.avif",
    "./images/hero-images/odonnel-house-barrington.avif",
    "./images/hero-images/sammi.avif",
    "./images/hero-images/shady-cropped.avif"
]

const slide = document.querySelectorAll(".slide")

let current = 0
let next = 1

slide[current].style.backgroundImage =
    `url("${images[Math.floor(Math.random()*images.length)]}")`

function changeSlide(){

    slide[next].style.backgroundImage =
        `url("${images[Math.floor(Math.random()*images.length)]}")`

    slide[next].classList.add("active")
    slide[current].classList.remove("active")

    current = next
    next = (next + 1) % slide.length
}

setInterval(changeSlide, 5500)

const footerBottom = document.getElementById("footer-bottom")
const currentYear = new Date().getFullYear()
footerBottom.textContent = `©${currentYear} SLM Custom Art. All rights reserved`