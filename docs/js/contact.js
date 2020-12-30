// Send form
const scriptURL = 'https://script.google.com/macros/s/AKfycbyZhp_7Wlb6iSlDQsHtHjSUk5VQurWSI0Vr9i6OYtIoFdEmS9Pl/exec'
const form = document.forms['submit-to-google-sheet']

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => console.log('Success!', response))
    .catch(error => console.error('Error!', error.message))

  form.reset()        
  window.alert ("Message sent to Joe Manfred")
})

// Clear form and show message
const btn_submit = document.querySelector ("#submit")

function clear_form () {
    const name = document.querySelector ("#submit")
    const email = document.querySelector ("#email")
    const message = document.querySelector ("#message")
}


// Open links in slide menu
link_home = document.querySelector (".home")
link_best = document.querySelector (".link.best")
link_all = document.querySelector (".link.all")
link_videos = document.querySelector (".link.videos")
link_contact = document.querySelector (".link.contact")

function redireccionar(link) {
    setTimeout(function () { window.location.href = '' + link }, 1000);
}

link_home.addEventListener("click", function () { redireccionar("index.html")}) 
link_best.addEventListener("click", function () {redireccionar ("board-best.html")})
link_all.addEventListener("click", function () {redireccionar ("board-all.html")})
link_videos.addEventListener("click", function () {redireccionar ("board-videos.html")})
link_contact.addEventListener("click", function () {redireccionar ("contact.html")})