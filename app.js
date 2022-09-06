const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1"

const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query="

const IMGPATH = "https://image.tmdb.org/t/p/w1280"
const mainEL = document.getElementById('main')
const formEl = document.getElementById('form')
const searchEl = document.getElementById('search')

getMovies(APIURL)


async function getMovies(url) {
    const response = await fetch(url)
    const responseData = await response.json()
    console.log(responseData);
    showMovies(responseData.results)

}

function showMovies(movies) {

    // clear main first
    mainEL.innerHTML = ''


    movies.forEach(movie => {
        const { poster_path, title, vote_average, overview } = movie
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')
        movieEl.innerHTML = `
            <img src="${IMGPATH + poster_path}" alt="${title}" srcset="">
            <div class="movie-info">
                <h3 class="movie-title">${title}</h3>
                <span class="${getClassColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
            <h3>Overview: </h3>
            ${overview}</div>
        `

        mainEL.appendChild(movieEl)
    });
}

function getClassColor(vote) {
    if (vote >= 8) {
        return 'green'

    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

formEl.addEventListener('submit', (event) => {
    event.preventDefault()
    const searchTerm = searchEl.value;

    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm)

        searchEl.value = ''
    }
})