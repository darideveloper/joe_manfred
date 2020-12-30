// Count elements in each section
const best_articles = document.querySelectorAll ("#section-best > div > div.article-container")
const all_articles = document.querySelectorAll ("#section-all > div > div.article-container")
const video_articles = document.querySelectorAll ("#section-videos > div > div.article-container")

const best_articles_num = best_articles.length
const all_articles_num = all_articles.length
const video_articles_num = video_articles.length


async function hide_see_all_buttons () {
    hide_less_10("#section-best > header > a", best_articles_num)
    hide_less_10 ("#section_all > header > a", all_articles_num)
    hide_less_10 ("#section-videos > header > a", video_articles_num)
}


// Hide "see all" botton
function hide_less_10 (selector, number) {
    if (number < 10) {
        const see_all_button = document.querySelector (selector)
        see_all_button.classList.add ("hide")
    }
}

function get_with_list (articles) {
    // return a list of accumulated widths

    width_list = []

    for (i=0; i < articles.length; i++) {
        if (i == 0) {
            width = get_element_width(articles[i]) + 30
        } else {
            width = get_element_width(articles[i]) + width_list[i-1] + 30
        }
    
        width_list.push(width)
    }

    return width_list
}



function offset(el) {
    // Get position of elements
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

counter_best = 0
last_article = false
function slide (articles, article_id, width_list) {
    // Size of the window
    const vw = document.documentElement.clientWidth

    // get position of the last article
    selector_last_article = article_id + " > div > div.article-container:last-child"
    
    last_article = document.querySelector (selector_last_article)
    var divOffset = offset(last_article)

    // Verify if last article is in the screen
    console.log (divOffset.left + last_article.offsetWidth, vw)
    if (divOffset.left < vw - last_article.offsetWidth*.8) {
        last_article = true
    }

    // Move slide or return to the fisrt article 
    if (last_article == true) {
        position = 0
        counter_best = -1
    } else {
        position = width_list [counter_best]
    }

    // move all elements in the section
    translation = "translate(-" + String(position) + "px)"
    for (i=0; i < articles.length; i++) {
        articles[i].style.transition = "transform 1s";
        articles[i].style.transform = translation;
    }

    counter_best += 1
}

function get_element_width (element) {
    return element.offsetWidth
}

// Listen each click of the left and right buttons

width_list_best = get_with_list (best_articles)
right_btn = document.querySelector ("#section-best > div > .section-button.right")
right_btn.addEventListener("click",  function(){ slide (best_articles, "#section-best", width_list_best); })

width_list_all = get_with_list (all_articles)
right_btn = document.querySelector ("#section-all > div > .section-button.right")
right_btn.addEventListener("click",  function(){ slide (all_articles, "#section-all", width_list_all); })

width_list_videos = get_with_list (video_articles)
right_btn = document.querySelector ("#section-videos > div > .section-button.right")
right_btn.addEventListener("click",  function(){ slide (video_articles, "#section-videos", width_list_videos); })

hide_see_all_buttons ()




