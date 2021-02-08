let sections_selector = ["#section-best", "#section-all", "#section-videos"]

// Hide buttons
async function hide_board_buttons () {
    // Run "hide_les_10 function, for each right slide button

    // Loop for each section
    for (var index_section in sections_selector) {
        let button_selector = sections_selector[index_section] + " > header > a"
        let see_all_button = document.querySelector (button_selector)
        let articles_selector = sections_selector[index_section] + " > div > div.article-container"

        // Count articles in section
        articles_num = document.querySelectorAll (articles_selector).length

        // Hide "show all" buton if articles is less 10
        if (articles_num < 10) {
            see_all_button.classList.add ("hide")
        }
    } 
}

hide_board_buttons ()

function slide () {
    // Add slide for each section

    for (var index_section in sections_selector) {
        let selector = sections_selector[index_section] + " > div"

        const slider = document.querySelector(selector);
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
        });

        slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
        });

        slider.addEventListener('mousemove', (e) => {
        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1; //scroll-fast
        slider.scrollLeft = scrollLeft - walk;
        console.log(walk);
        });
    }   
}

slide()

// function get_with_list (articles) {
//     // return a list of accumulated widths

//     width_list = []

//     for (i=0; i < articles.length; i++) {
//         if (i == 0) {
//             width = get_element_width(articles[i]) + 30
//         } else {
//             width = get_element_width(articles[i]) + width_list[i-1] + 30
//         }
    
//         width_list.push(width)
//     }

//     return width_list
// }



// function offset(el) {
//     // Get position of elements
//     var rect = el.getBoundingClientRect(),
//     scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
//     scrollTop = window.pageYOffset || document.documentElement.scrollTop;

//     return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
// }


// function slide (articles, article_id, width_list, counter) {
//     last_article = false

//     // Size of the window
//     const vw = document.documentElement.clientWidth

//     // get position of the last article
//     selector_last_article = article_id + " > div > div.article-container:last-child"
    
//     last_article = document.querySelector (selector_last_article)
//     var divOffset = offset(last_article)

//     // Verify if last article is in the screen
//     console.log (divOffset.left + last_article.offsetWidth, vw)
//     if (divOffset.left < vw - last_article.offsetWidth*.8) {
//         last_article = true
//     }

//     // Move slide or return to the fisrt article 
//     if (last_article == true) {
//         position = 0
//         counter = -1
//     } else {
//         position = width_list [counter]
//     }

//     // move all elements in the section
//     translation = "translate(-" + String(position) + "px)"
//     for (i=0; i < articles.length; i++) {
//         articles[i].style.transition = "transform 1s";
//         articles[i].style.transform = translation;
//     }

//     counter += 1
// }

// function get_element_width (element) {
//     return element.offsetWidth
// }



// // Listen each click of the left and right buttons

// let counter_best = 0
// let best_articles = document.querySelectorAll ("#section-best > div > div.article-container")
// width_list_best = get_with_list (best_articles)
// right_btn = document.querySelector ("#section-best > div > .section-button.right")
// right_btn.addEventListener("click",  function(){ slide (best_articles, "#section-best", width_list_best, counter_best); })

// let ounter_all = 0
// let all_articles = document.querySelectorAll ("#section-all > div > div.article-container")
// width_list_all = get_with_list (all_articles)
// right_btn = document.querySelector ("#section-all > div > .section-button.right")
// right_btn.addEventListener("click",  function(){ slide (all_articles, "#section-all", width_list_all, counter_all); })

// let counter_vid = 0
// let video_articles = document.querySelectorAll ("#section-videos > div > div.article-container")
// width_list_videos = get_with_list (video_articles)
// right_btn = document.querySelector ("#section-videos > div > .section-button.right")
// right_btn.addEventListener("click",  function(){ slide (video_articles, "#section-videos", width_list_videos, counter_vid); })







// // Open links in slide menu
// link_home = document.querySelector (".home")
// link_best = document.querySelector (".link.best")
// link_all = document.querySelector (".link.all")
// link_videos = document.querySelector (".link.videos")
// link_contact = document.querySelector (".link.contact")

// function redireccionar(link) {
//     setTimeout(function () { window.location.href = '' + link }, 1000);
// }

// link_home.addEventListener("click", function () { redireccionar("index.html")}) 
// link_best.addEventListener("click", function () {redireccionar ("board-best.html")})
// link_all.addEventListener("click", function () {redireccionar ("board-all.html")})
// link_videos.addEventListener("click", function () {redireccionar ("board-videos.html")})
// link_contact.addEventListener("click", function () {redireccionar ("contact.html")})