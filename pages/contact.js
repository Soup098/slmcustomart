document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form")
    const statusEl = document.getElementById("form-status")
    if(!form) return

    form.addEventListener("submit", async (e) => {
        e.preventDefault()

        const submitBtn = form.querySelector(".order-submit")
        submitBtn.disabled = true
        statusEl.textContent = "Sending..."

        const payload = Object.fromEntries(new FormData(form).entries())

        console.log(payload)

        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(payload)
            })
            const result = await res.json()

            if(result.success) {
                statusEl.textContent = "Thanks! Your message has been sent."
                form.reset()
            } else {
                statusEl.textContent = result.message || "Something went wrong. Please try again."
            }
        } catch(err){
            statusEl.textContent = "Network error. Please try again later."
        } finally {
            submitBtn.disabled = false
        }
    })
})