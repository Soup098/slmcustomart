const images = [
    "./images/homes/sam-and-crystal.jpg",
    "./images/homes/red-brick-house.jpg",
    "./images/homes/chesley-dr.jpg",
    "./images/homes/varney-rd.jpg",
    "./images/homes/timber-lane.jpg",
    "./images/homes/house.jpg",
    "./images/homes/mildred.jpg",
    "./images/pets/lando.jpg",
    "./images/pets/mom-and-foal.jpg",
    "./images/pets/obi.jpg",
    "./images/pets/sammi.jpg",
    "./images/pets/shady.jpg",
    "./images/pets/margy.jpg"
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