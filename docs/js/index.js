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
                console.log(walk);
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
                    console.log (id, text)

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
                

                console.log (link)
                
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

add_links_to_articles()


// Open links in slide menu
link_home = document.querySelector (".home")
link_best = document.querySelector (".link.best")
link_all = document.querySelector (".link.all")
link_videos = document.querySelector (".link.videos")
link_contact = document.querySelector (".link.contact")

link_home.addEventListener("click", function () { redirect("index.html", 1000)}) 
link_best.addEventListener("click", function () {redirect ("board-best.html", 1000)})
link_all.addEventListener("click", function () {redirect ("board-all.html", 1000)})
link_videos.addEventListener("click", function () {redirect ("board-videos.html", 1000)})
link_contact.addEventListener("click", function () {redirect ("contact.html", 1000)})


create_slides()