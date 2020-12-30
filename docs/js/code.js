// Update videos speed

const videos = document.querySelectorAll ("video");

for (i=0; i<videos.length; i++) {
    videos[i].playbackRate = 4;
}

// Open links in slide menu
link_home = document.querySelector (".home")
link_best = document.querySelector (".link.best")
link_all = document.querySelector (".link.all")
link_videos = document.querySelector (".link.videos")
link_contact = document.querySelector (".link.contact")

function redireccionar(link) {
    setTimeout(function () { window.location.href = '/path/' + link }, 1000);
}

link_home.addEventListener("click", function () { redireccionar("index.html")}) 
link_best.addEventListener("click", function () {redireccionar ("board-best.html")})
link_all.addEventListener("click", function () {redireccionar ("board-all.html")})
link_videos.addEventListener("click", function () {redireccionar ("board-videos.html")})
link_contact.addEventListener("click", function () {redireccionar ("contact.html")})

// Show and hide slide menu
status_slide_menu = false
buerger_button = document.querySelector ("body > i")
slide_menu = document.querySelector (".nav-slide")

function show_hide_slide_menu () {
    status_slide_menu = !status_slide_menu

    if (status_slide_menu == true) {
        slide_menu.classList.remove ("hide")
    } else {
        slide_menu.classList.add ("hide")
    }


}

buerger_button.addEventListener ("click", show_hide_slide_menu)
slide_menu.addEventListener ("click", show_hide_slide_menu)