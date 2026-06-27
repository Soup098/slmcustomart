// --- Connect to Supabase (same public values as your gallery pages) ---
const SUPABASE_URL = "https://eklumrribtzzkxssuojv.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrbHVtcnJpYnR6emt4c3N1b2p2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwMTc2NzEsImV4cCI6MjA5NTU5MzY3MX0.w-33diostKvrJC3Yq-cq85EDEfFZ66CJmmXHXjEBi70"
const db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
const BUCKET = "portraits"
// --- Grab the two screens ---
const loginView = document.getElementById("login-view")
const dashView = document.getElementById("dashboard-view")


// Decide which screen to show based on login state
async function refreshAuth() {
    const { data: { session } } = await db.auth.getSession()
        if (session) {
            loginView.hidden = true
            dashView.hidden = false
            loadGrids() // defined in Section 5
        } else {
            loginView.hidden = false
            dashView.hidden = true
        }
}

// Sign in when the login form is submitted
document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault()

    const email = document.getElementById("email").value.trim()
    const password = document.getElementById("password").value
    const msg = document.getElementById("login-msg")

    msg.textContent = "Signing in..."

    const { error } = await db.auth.signInWithPassword({ email, password })

    if (error) { msg.textContent = error.message; return }

    msg.textContent = ""

    refreshAuth()
})

// Sign out
document.getElementById("logout-btn").addEventListener("click", async () => {
    await db.auth.signOut()
    refreshAuth()
})
// Run once when the page loads
refreshAuth()



const dropzone = document.getElementById("dropzone")
const fileInput = document.getElementById("file-input")
const preview = document.getElementById("preview")
const previewWrap = document.getElementById("preview-wrap")
const previewName = document.getElementById("preview-name")
const previewRemove = document.getElementById("preview-remove")
let selectedFile = null

// Click the drop zone to open the file browser
dropzone.addEventListener("click", () => fileInput.click())
fileInput.addEventListener("change", () => {
    if (fileInput.files[0]) setFile(fileInput.files[0])
})

// Highlight while dragging over
;["dragenter", "dragover"].forEach(evt =>
    dropzone.addEventListener(evt, (e) => {
        e.preventDefault(); dropzone.classList.add("hover")
        }
    )
)

;["dragleave", "drop"].forEach(evt =>
    dropzone.addEventListener(evt, (e) => {
        e.preventDefault(); dropzone.classList.remove("hover")
        }
    )
)

// Handle a dropped file
dropzone.addEventListener("drop", (e) => {
    if (e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0])
    }
)

// Remove the chosen photo and return to the drop-zone state
previewRemove.addEventListener("click", (e) => {
    e.stopPropagation()
    clearPhoto()
})

function clearPhoto() {
    selectedFile = null
    fileInput.value = ""
    preview.removeAttribute("src")
    previewName.textContent = ""
    previewWrap.hidden = true
    dropzone.hidden = false
}

// Shared: validate, remember, and preview the chosen image
function setFile(file) {
    if (!file.type.startsWith("image/")) {
        alert("Please choose an image file."); return
    }

    selectedFile = file
    preview.src = URL.createObjectURL(file)
    previewName.textContent = file.name
    previewWrap.hidden = false
    dropzone.hidden = true        // swap drop zone for the preview card
}


document.getElementById("upload-form").addEventListener("submit", async (e) => {
    e.preventDefault()

    const msg = document.getElementById("upload-msg")

    if (!selectedFile) {
        msg.textContent = "Choose a photo first.";
        return
    }

    const title = document.getElementById("title").value.trim()
    const description = document.getElementById("description").value.trim()
    const category = document.querySelector('input[name=category]:checked').value

    msg.textContent = "Uploading..."

    // 1. Build a unique, tidy path inside the bucket
    const ext = selectedFile.name.split(".").pop().toLowerCase()
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40)
    const path = category + "/" + Date.now() + "-" + slug + "." + ext

    // 2. Upload the file to Storage
    const up = await db.storage.from(BUCKET)
    .upload(path, selectedFile, { cacheControl: "3600", upsert: false })

    if (up.error) {
        msg.textContent = "Upload failed: " + up.error.message;
        return
    }

    // 3. Get the public URL for that file
    const { data: urlData } = db.storage.from(BUCKET).getPublicUrl(path)

    // 4. Insert the database row the galleries read from
    const ins = await db.from("portraits").insert({
        title: title,
        description: description,
        category: category,
        image_url: urlData.publicUrl,
        storage_path: path,
        display_order: Date.now()
    })
    if (ins.error) {
        msg.textContent = "File saved but DB insert failed: " + ins.error.message
        return
    }

    // 5. Success: reset the form and refresh the thumbnails
    msg.textContent = "Added to the gallery!"
    e.target.reset()
    clearPhoto()
    loadGrids()
})



// Escape text so DB values are shown as text, never interpreted as HTML
function escapeHtml(str) {
    return String(str ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
}

async function loadGrids() {
    await renderGrid("pet", document.getElementById("pet-grid"))
    await renderGrid("home", document.getElementById("home-grid"))
}

async function renderGrid(category, grid) {
    const { data, error } = await db
    .from("portraits")
    .select("*")
    .eq("category", category)
    .order("display_order")

    if (error) {
        grid.innerHTML = "<p>Could not load.</p>";
        return
    }
    if (!data.length) {
        grid.innerHTML = "<p>No photos yet.</p>";
        return
    }
    grid.innerHTML = data.map(piece => `
        <figure class="card" data-id="${escapeHtml(piece.id)}"
        data-path="${escapeHtml(piece.storage_path || "")}">
        <img src="${escapeHtml(piece.image_url)}" alt="${escapeHtml(piece.title)}" loading="lazy">
        <figcaption>${escapeHtml(piece.title)}</figcaption>
        <button class="delete-btn">Delete</button>
        </figure>`).join("")
}

document.addEventListener("click", async (e) => {
    const card = e.target.closest(".card")

    // 1. Clicked the red Delete button
    if (e.target.classList.contains("delete-btn")) {
        await deletePortrait(card)
        return
    }

    // 2. Clicked a card: select just this one
    if (card) {
        document.querySelectorAll(".card.selected")
        .forEach(c => { if (c !== card) c.classList.remove("selected") })
        card.classList.toggle("selected")
        return
    }

    // 3. Clicked empty space: clear any selection
    document.querySelectorAll(".card.selected")
    .forEach(c => c.classList.remove("selected"))
})

async function deletePortrait(card) {
    if (!confirm("Delete this portrait? This cannot be undone.")) return

    const id = card.dataset.id
    const path = card.dataset.path

    // 1. Remove the database row (this is what hides it from the gallery)
    const del = await db.from("portraits").delete().eq("id", id)
    if (del.error) {
        alert("Delete failed: " + del.error.message);
        return
    }

    // 2. Remove the actual file from Storage, if we know where it is
    if (path) {
        const rm = await db.storage.from(BUCKET).remove([path])
        if (rm.error) console.warn("Row gone but file remains:", rm.error.message)
    }
    // 3. Redraw the grids
    loadGrids()
}
