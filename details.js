
const url1 = `https://moviestack.onrender.com/api/movies`
const apiKey1 = "0ff70d54-dc0b-4262-9c3d-776cb0f34dbd"


const options1 = {
    headers: {
        "x-api-key": apiKey1
    }
}
fetch(url1, options1)
    .then(pelis => pelis.json())
    .then(data => {
        let movies = data.movies

        const search = location.search
        const params = new URLSearchParams(search)

        const id = params.get(`id`)

        const contenedorPeli = document.getElementById("contePeli")
        const peliculas = movies.find(peli => peli.id == id)

        function crearPeli(objeto) {
            return `<div class=""><img class="pt-3 h-[300px]" src="https://moviestack.onrender.com/static/${objeto.image}" alt=""> <table class=" h-[100px] w-[400px] border-[2px] bg-white border-black text-center justify-center">
            <tr>
                <td>original lenguage</td>
                <td>${objeto.original_language}</td>
            </tr>
            <tr>
                <td>release data</td>
                <td>${objeto.release_date}</td>
            </tr>
            <tr>
                <td>runtime</td>
                <td>${objeto.runtime}</td>
            </tr>
            <tr>
                <td>status</td>
                <td>${objeto.status}</td>
            </tr>
        </table>
        </div>
        <section class="flex flex-col gap-3 w-[450px]">
        <h2 class="text-white">${objeto.title}</h2>
        <h3 class="text-white">${objeto.tagline}</h3>
        <h4 class="text-white">${objeto.genres}</h4>
        <p class="text-white">${objeto.overview}</p>
        <table class="h-[100px] w-[400px] bg-white border-[2px] border-black text-center">
            <tr>
                <td>vote average</td>
                <td>${objeto.vote_average}</td>
            </tr>
            <tr>
                <td>budget</td>
                <td>${objeto.budget}</td>
            </tr>
            <tr>
                <td>revenue</td>
                <td>${objeto.revenue}</td>
            </tr>
        </table>`

        }
        contenedorPeli.innerHTML = crearPeli(peliculas)
    })
