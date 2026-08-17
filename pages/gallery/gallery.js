// Footer year
const footerBottom = document.getElementById("footer-bottom")
if (footerBottom) {
    const currentYear = new Date().getFullYear()
    footerBottom.textContent = `©${currentYear} SLM Custom Art. All rights reserved`
}

// ---- Gallery lightbox: click a portrait to see the full image + details ----
const lightbox = document.getElementById("lightbox")
if (lightbox) {
    const lbImg = document.getElementById("lightbox-img")
    const lbTitle = document.getElementById("lightbox-title")
    const lbDesc = document.getElementById("lightbox-desc")

    function openLightbox(card) {
        lbImg.src = card.dataset.full || ""
        lbImg.alt = card.dataset.title || ""
        lbTitle.textContent = card.dataset.title || ""

        const desc = card.dataset.desc || ""
        lbDesc.textContent = desc
        lbDesc.hidden = desc === ""     // no description -> show only the image + title

        lightbox.hidden = false
        document.body.style.overflow = "hidden"   // stop the page behind from scrolling
    }

    function closeLightbox() {
        lightbox.hidden = true
        lbImg.src = ""
        document.body.style.overflow = ""
    }

    // open when any gallery card is clicked (event delegation survives re-renders)
    const gallery = document.getElementById("gallery")
    if (gallery) {
        gallery.addEventListener("click", (e) => {
            const card = e.target.closest(".card")
            if (card) openLightbox(card)
        })
    }

    // close via the X button, clicking the dark backdrop, or pressing Escape
    document.getElementById("lightbox-close").addEventListener("click", closeLightbox)
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) closeLightbox()
    })
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !lightbox.hidden) closeLightbox()
    })
}
