function moviesArray() {
    // Make a request to fetch movie
    fetch(" http://localhost:3000/films")
        .then(res => res.json())
        .then(moviesArray => {
            displayMovieTitles(moviesArray)
            dispalyMovieOne(moviesArray[0])
        })
}
moviesArray()

function displayMovieTitles(moviesarray) {
    let ul = document.getElementById("films")
    ul.innerHTML = ""
    moviesarray.map(movie => {
        let li = document.createElement("li")
        let btn = document.createElement("button")
        btn.textContent = "DELETE"
        btn.addEventListener("click", () => handleDelete(movie))
        btn.className = "btn"
        li.className = "film item"
        li.addEventListener("click", () => handleClick(movie))
        li.textContent = `${movie.title}`
        li.append(btn)
        ul.appendChild(li)
    })

}

function dispalyMovieOne(data) {
    let img = document.getElementById("poster")
    img.src = data.poster

    let h1 = document.getElementById("title")
    h1.textContent = data.title
    let div = document.getElementById("runtime")
    div.textContent = `${data.runtime} `
    let p = document.getElementById("film-info")
    p.textContent = data.description
    let span = document.getElementById("showtime")
    span.textContent = data.showtime
    let span2 = document.getElementById("ticket-num")
    span2.textContent = data.capacity - data.tickets_sold
    let btn = document.getElementById("buy-ticket");
    btn.removeEventListener("click", handleTicket);
    btn.addEventListener("click", () => handleTicket(span2, data));

}

function handleClick(data) {
    let img = document.getElementById("poster")
    img.src = data.poster
    let h1 = document.getElementById("title")
    h1.textContent = data.title
    let div = document.getElementById("runtime")
    div.textContent = `${data.runtime}`
    let p = document.getElementById("film-info")
    p.textContent = data.description
    let span = document.getElementById("showtime")
    span.textContent = data.showtime
    let span2 = document.getElementById("ticket-num")
    span2.textContent = data.capacity - data.tickets_sold
    let btn = document.getElementById("buy-ticket");
    btn.removeEventListener("click", handleTicket);
    btn.addEventListener("click", () => handleTicket(span2, data));

}

function handleTicket(span2, data) {
    // console.log(data.tickets_sold)
    let count = parseInt(span2.textContent);
    if (count > 0) {
        count -= 1;
        span2.textContent = count;
    }
    else if (count == 0) {
        span2.textContent = "SOLD OUT"
    }
    console.log(data.id)
}

// Function to handle the deletion of a movie
function handleDelete(movie) {
    fetch(` http://localhost:3000/films/${movie.id}`, {
        method: "DELETE"
    })
        .then(res => res.json)
}


