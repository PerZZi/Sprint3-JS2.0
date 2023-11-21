const conteCards = document.getElementById("cartas")

const url = `https://moviestack.onrender.com/api/movies`
const apiKey = "0ff70d54-dc0b-4262-9c3d-776cb0f34dbd"
let movies


const options = {
    headers: {
        "x-api-key": apiKey
    }
}
fetch(url, options)
    .then(pelis => pelis.json())
    .then(data => {
        movies = data.movies
        imprimirTemplate(movies, conteCards, crearCards)

        //filtro nombre
        const selec = document.getElementById("elegir")
        const textoPeli = document.getElementById("textoGenero")

        textoPeli.addEventListener("keyup", () => {
            const filtroTitulo = filtrarPorNombre(movies, textoPeli.value)
            const filtroGenero = filtrarPorGenero(filtroTitulo, selec.value)
            imprimirTemplate(filtroGenero, conteCards, crearCards)
            console.log()
        });


        function filtrarPorNombre(listado, titulos) {
            const filtro = listado.filter(movie => movie.title.toLowerCase().startsWith(titulos.toLowerCase()))
            return filtro
        }
        filtrarPorNombre(movies, "the nun")

        //filtro genero
        const generos = movies.map(genero => genero.genres).flat()
        const listaGeneros = new Set(generos)


        function createSelector(generosFiltrados) {
            return `<option value=${generosFiltrados}>${generosFiltrados}</option>`
        }
        imprimirTemplate(listaGeneros, selec, createSelector)

        function filtrarPorGenero(listaPeliculas, genero) {
            if (genero === "") {
                return listaPeliculas;
            }

            const filtroDeGenero = listaPeliculas.filter(movie => movie.genres.includes(genero));
            return filtroDeGenero;

        }

        selec.addEventListener("input", () => {
            const filtroGenero = filtrarPorGenero(movies, selec.value);
            const filtroTitulo = filtrarPorNombre(filtroGenero, textoPeli.value)
            imprimirTemplate(filtroTitulo, conteCards, crearCards);

        })

        function agregarFavoritos() {

            const arti = document.querySelectorAll(".art")
            const botonA = document.querySelectorAll(".add")
            const botonR = document.querySelectorAll(".remove")
        
            const local = JSON.parse(localStorage.getItem("like")) || []
           
            botonA.addEventListener("click", () =>{
                local=JSON.parse(localStorage.getItem("like")) || []
                const conteneFavo = arti[index].dataset.id;
                const comprobarLocal = local.some(item => item.id === conteneFavo)
                console.log(conteneFavo)
                if(!comprobarLocal){
                    local.push({id: conteneFavo})
                    console.log(local)
                }
                else{
                    if(comprobarLocal){
                        local = local.filter(item=>item.id !==conteneFavo)
                    }
                }
                localStorage.setItem("like", JSON.stringify(local))
            })
        }
        
    })
    .catch(error => console.error(error))

//
function crearCards(objeto) {
    let urlImage = `https://moviestack.onrender.com/static/${objeto.image}`
    return `<article data-id=${objeto.id} class="art h-[450px] min-w-[300px] w-1/5 border-2 border-black rounded-lg bg-white flex flex-col gap-5 px-5 pb-5">
    <img class="pt-3 h-[200px]" src="${urlImage}" alt="">
    <h2 class="text-black text-center">${objeto.title}</h2>
    <p class="text-black text-center line-clamp-3">${objeto.overview}...</p>
    <a class="flex justify-center p-1 rounded-lg bg-violet-800 text-white" href="details.html?id=${objeto.id}">Details</a>
    <button data-accion="add" data-id="${objeto.id}" class="add p-1 bg-green-600 rounded-lg text-white">Add to Favorites</button>
</article>`
}

function imprimirTemplate(lista, contenedor, fn) {
    let template = ""
    for (const generoIterado of lista) {
        template += fn(generoIterado)
    }
    contenedor.innerHTML = template
}

// sprint 3

let favoritas = []

conteCards.addEventListener("click",(event) =>{


    const dataset = event.target.dataset
    
    if(dataset.accion == "add"){
        if(!favoritas.includes(dataset.id)){
            favoritas.push(dataset.id)
            localStorage.setItem("favoritas", JSON.stringify(favoritas))
        }
        else{
            favoritas.splice(favoritas.indexOf(dataset.id), 1)
            localStorage.setItem("favoritas", JSON.stringify(favoritas))
        }
        localStorage.setItem('favoritas', JSON.stringify(favoritas));
            }
            console.log(favoritas)


        })
    
    

