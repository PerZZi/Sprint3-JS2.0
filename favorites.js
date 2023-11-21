
let allMovies

const url = "https://moviestack.onrender.com/api/movies"
const api = "0ff70d54-dc0b-4262-9c3d-776cb0f34dbd"
const options = {
    headers: {
        "x-api-key": api
    }
}


fetch(url, options)
    .then(pelis => pelis.json())
    .then(data => {
        let favoritas = JSON.parse(localStorage.getItem('favoritas')) || []
        let contenedorfav = document.getElementById("contenedorFavo")
        movies = data.movies.filter(movie =>
        favoritas.includes(movie.id))
        contenedorfav.innerHTML += crearTemplate(movies)
        allMovies = data.movies



        contenedorfav.addEventListener("click", (event) => {
            const idboton = event.target.dataset.id
            console.log(idboton)
            if (idboton) {
                if (!favoritas.includes(idboton)) {
                    favoritas.push(idboton)
                    localStorage.setItem('favoritas', JSON.stringify(favoritas));
                }
                else {
                    favoritas.splice(favoritas.indexOf(idboton), 1)
                    localStorage.setItem('favoritas', JSON.stringify(favoritas));
                }
                const pelis2 = allMovies.filter(movie => favoritas.includes(movie.id))
                contenedorfav.innerHTML = crearTemplate(pelis2)
            }
        })

    })

    .catch(error => console.error(error))

//funciones generales
function datosPeli(objeto) {
    let urlImage1 = `https://moviestack.onrender.com/static/${objeto.image}`
    return `<article class="h-[350px] min-w-[300px] w-1/5 border-2 border-black rounded-lg bg-white flex flex-col gap-5 px-5 pb-5 items-center">
            <img class="pt-3 h-[200px]" src="${urlImage1}" alt="">
            <h2 class="text-black text-center">${objeto.title}</h2>
            <button data-accion="borrar" data-id="${objeto.id}" class="add p-1 bg-red-800 rounded-lg text-white">Remove</button>
        </article>` }

function crearTemplate(listaMovies) {
    let template = ""
    for (const movie of listaMovies) {
        template += datosPeli(movie)
    }
    console.log(template)
    return template
}