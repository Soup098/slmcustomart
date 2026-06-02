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