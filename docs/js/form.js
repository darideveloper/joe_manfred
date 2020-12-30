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