async function get_json () {
    // Get images json data from file

    let data
    data = fetch ("./js/data.json") 
        .then(function(resp) {
            return resp.json()
        })
    console.log (data)
    return (data)
}

async function get_elements (selector) {
    // Return all elements for specific css selector
    
    elements = document.querySelectorAll(selector);
    return elements
}

async function replice (data, data_item, selector, html, filter, aditional = "", attrib = "") {
    // repleace best asrticles images

    console.log (filter)

    let info = []

    elements = await get_elements (selector)

    // Extract specific info from data file
    for (let i = 0; i < data.length; i++) {

        console.log (data[i][filter])

        if (data[i][filter]) { 

            if (aditional != "") {
                info_item = String(aditional + data[i][data_item])
            } else {
                info_item = String(data[i][data_item])
            }
            
            info.push (info_item)
        }
    }

    // Loop for each element to replice data
    for (let i = 0; i < elements.length; i++) {
        if (html == true) {
            elements[i].innerHTML= info[i]
        } else {
            elements[i].setAttribute(attrib, info[i])
        }
    }
    
}


async function repleace_images (response) {
    // get data en replice each image from each section

    const data = await get_json()

    // Replace best section
    // let selector_best_images = "#section-best .articles-container .article-container article figure img"
    // await replice (data, "url", selector_best_images, html=false, filter="best", aditional="imgs/small/", attrib="src")

    // let selector_best_text = "#section-best .articles-container .article-container article h3"
    // await replice (data, "name", selector_best_text, html=true, filter="best")

    // Replace all section
    let selector_all_images = "#section-all .articles-container .article-container article figure img"
    await replice (data, "url", selector_all_images, html=false, filter="all", aditional="imgs/small/", attrib="src")

    let selector_all_text = "#section-all .articles-container .article-container article h3"
    await replice (data, "name", selector_all_text, html=true, filter="all")

    // let selector_all = "#section-all .articles-container .article-container article figure img"
    // all_images = await get_elements(selector_all)

    // let selector_videos = "#section-videos .articles-container .article-container article figure img"
    // videos_images = await get_elements(selector_videos)

    
    // replice_all (data, all_images)
}

repleace_images ()