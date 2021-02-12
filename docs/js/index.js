let sections_selector = ["#section-best", "#section-all", "#section-videos"]

function redirect(link, time) {
    setTimeout(function () { window.location.href = '' + link }, time);
}

let sliding = false 
function create_slides () {
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
            if (isDown) {
                sliding = true
                e.preventDefault();
                const x = e.pageX - slider.offsetLeft;
                const walk = (x - startX) * 1; //scroll-fast
                slider.scrollLeft = scrollLeft - walk;
            } else {
                sliding = false
            }
            
        });
    }   
}


function add_links_to_articles () {
    // open each articles of the slides in main page
    for (var index_section in sections_selector) {
        let selector_article = sections_selector[index_section] + "  > div > div > article"
        let articles = document.querySelectorAll (selector_article)

        

        for (let article_index in articles) {
            let current_article = articles [article_index]

            // Validate the node
            if (typeof (current_article) == "object") {
                // Extract title and strip
                let elem = current_article.childNodes[3]
                let text = String(elem.textContent).replace(/^\s+|\s+$/g, "").toLowerCase().replaceAll(" ", "-")
                let link = ""
                
                if (text == "see-all") {
                    // Create links for "see all" articles
                    let id = elem.childNodes[1].id

                    if (id == "last-best") {
                        link = "board-best.html"
                    } else if (id == "last-all") {
                        link = "board-all.html"
                    } else if (id == "last-videos") {
                        link = "board-videos.html"
                    }
                    
                } else {
                    // Create links for all other articles
                    link = "articles/" + text + ".html"
                }
                
                
                // Add listener to open link
                current_article.addEventListener("click", function () {

                    // If slide if not active, redirect
                    if (!sliding){
                        redirect (link, 100)
                    }
                })

                
            }
        }
    }
}

function update_gradiants_scroll () {
    // Update gradins with scroll events
    for (selector_id in sections_selector) {
        
        // Selectors of slide and gradiants
        let selector_slide = sections_selector[selector_id] + " > div"
        let selector_gradiant_right = sections_selector[selector_id] + " > header > div.gradiants > div.right"
        let selector_gradiant_left = sections_selector[selector_id] + " > header > div.gradiants > div.left"

        // Sliders and gradiants elements
        let slider = document.querySelector (selector_slide)
        let gradiant_right = document.querySelector (selector_gradiant_right)
        let gradiant_left = document.querySelector (selector_gradiant_left)

        slider.addEventListener ('scroll', function (e) {
            let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
            // Add and remove classes to hide right gradiant
            if (slider.scrollLeft <= (slider.scrollWidth)*.02) {
                gradiant_left.classList.add ("hide")
            } else {
                gradiant_left.classList.remove ("hide")
            }
            
            // Add and remove classes to hide left gradiant
            if (slider.scrollLeft + vw >= (slider.scrollWidth)*.98) {
                gradiant_right.classList.add ("hide")
            } else {
                gradiant_right.classList.remove ("hide")
            }
        }, false)
    }
}

function buttons_slider () {
    // Add functionality to slider buttons (slide to right or left)

    for (selector_id in sections_selector) {

        // Selectors
        let selector_buttons = sections_selector[selector_id] + " > header > div.buttons_slide > div.button-small"
        let selector_slider = sections_selector[selector_id] + " > div"

        // Elements
        let buttons = document.querySelectorAll (selector_buttons)
        let slider = document.querySelector (selector_slider)
        let button_left = buttons[0]
        let button_right = buttons[1]

        


        button_left.addEventListener ("click", function (e) {
            let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
            slider.scrollLeft -= (vw)*.8
        }, false)

        button_right.addEventListener ("click", function (e) {
            let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
            slider.scrollLeft += (vw)*.8
        }, false)

        
    
    }



    

}

add_links_to_articles()
create_slides()
update_gradiants_scroll()
buttons_slider()
