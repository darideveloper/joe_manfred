// Update videos speed

const videos = document.querySelectorAll ("video");

for (i=0; i<videos.length; i++) {
    videos[i].playbackRate = 4;
}

// Show and hide slide menu
status_slide_menu = false
buerger_button = document.querySelector ("body > i")
slide_menu = document.querySelector (".nav-slide")

function show_hide_slide_menu () {
    status_slide_menu = !status_slide_menu

    if (status_slide_menu == true) {
        slide_menu.classList.add ("show")
    } else {
        slide_menu.classList.remove ("show")
    }
}

buerger_button.addEventListener ("click", show_hide_slide_menu)
slide_menu.addEventListener ("click", show_hide_slide_menu)