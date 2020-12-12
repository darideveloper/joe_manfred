
async function get_json () {
    let data
    data = fetch ("./js/data.json") 
        .then(function(resp) {
            return resp.json()
        })
    return (data)
}

async function get_elements (selector) {
    // Return all elements for specific css selector
    elements = document.querySelectorAll(selector);
    return elements
}

function replice_best (data, elements) {
    // repleace besta rticles
    let urls = []

    for (let i = 0; i < data.length; i++) {
        if (data[i]["best"]) { 
            urls.push (String("imgs/small/" + data[i]["url"]))
        }
    }

    for (let i = 0; i < elements.length; i++) {
        elements[i].setAttribute("src", urls[i])
    }

}

function replice_all (data, elements) {
    // repleace besta rticles
    let urls = []

    for (let i = 0; i < data.length; i++) {
        urls.push (String("imgs/small/" + data[i]["url"]))
    }

    for (let i = 0; i < elements.length; i++) {
        elements[i].setAttribute("src", urls[i])
    }

}


async function repleace_images (response) {
    const data = await get_json()

    let selector_best = "#section-best .articles-container .article-container article figure img"
    best_images = await get_elements(selector_best)

    let selector_all = "#section-all .articles-container .article-container article figure img"
    all_images = await get_elements(selector_all)

    let selector_videos = "#section-videos .articles-container .article-container article figure img"
    videos_images = await get_elements(selector_videos)

    replice_best (data, best_images)
    replice_all (data, all_images)


}

repleace_images ()
