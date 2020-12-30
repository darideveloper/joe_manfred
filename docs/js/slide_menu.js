// Open links in slide menu
link_home = document.querySelector (".home")
link_best = document.querySelector (".link.best")
link_all = document.querySelector (".link.all")
link_videos = document.querySelector (".link.videos")
link_contact = document.querySelector (".link.contact")

function redireccionar(link) {
    setTimeout(function () { window.location.href = '/path/joe_manfred/' + link }, 1000);
}

link_home.addEventListener("click", function () { redireccionar("index.html")}) 
link_best.addEventListener("click", function () {redireccionar ("board-best.html")})
link_all.addEventListener("click", function () {redireccionar ("board-all.html")})
link_videos.addEventListener("click", function () {redireccionar ("board-videos.html")})
link_contact.addEventListener("click", function () {redireccionar ("contact.html")})