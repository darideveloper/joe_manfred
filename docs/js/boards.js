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

// Mansory layout
const masonry_layout = (container_elem, items_elem, columns) => {
    container_elem.classList.add("board", 'columns-' + columns)
    let columns_elements = []

    for (let i=1; i <= columns; i++) {
        let column = document.createElement ('div')
        column.classList.add ('masonry-column', "column-" + (i))
        container_elem.appendChild (column)
        columns_elements.push (column)
    }

    for (let m = 0; m < Math.ceil (items_elem.length / columns); m++) {
        for (let n = 0; n < columns; n++) {
            item = items_elem [m * columns + n]

            if (item == undefined) {
                continue
            }

            columns_elements[n].appendChild(item)
        }
    }
}

let board = document.querySelector ("#board")
let columns = getComputedStyle(board).getPropertyValue('--columns')

masonry_layout (board, document.querySelectorAll (".article-container"), columns)

var w = window.innerWidth;

function update_page () {
    var new_w = window.innerWidth;
    
    let new_w_query = get_query_num(new_w)
    let w_query = get_query_num (w)

    console.log (w_query, new_w_query)

    if (w_query != new_w_query) {
        location.reload()
    }
}

function get_query_num (width) {
    query_num = 0
    if (width > 767) {
        query_num = 3
    } else if (width < 767 & width > 375) {
        query_num = 2
    } else {
        query_num = 1
    }
    return query_num
}

window.addEventListener("resize", update_page);