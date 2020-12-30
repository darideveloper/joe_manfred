let max_size = false
let img_button = document.querySelector ("body > main > div > figure")

img_button.addEventListener("click", resize)

function resize () {
    if (max_size == true) {
        img_button.classList.remove ("max-width")
        img_button.classList.add ("max-height")
        max_size = false
    } else {
        img_button.classList.add ("max-width")
        img_button.classList.remove ("max-height")
        max_size = true
    }
}
