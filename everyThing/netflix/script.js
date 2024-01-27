window.onload=()=>{
    getOriginals()
    getTtrendingsNow()
    getTopRated()
}


function fetchMovies(url,dom_element,path_type){
    fetch(url).then(response=>{
        if(response.ok){
            return response.json()
        }else{
            throw new error("something must have went wrong")
        }
    }).then(data=>{
        showMovies(data,dom_element,path_type)
    }).catch(error_data=>{
        console.log(error_data);
    })
}


showMovies=(movies,dom_element,path_type)=>{
    var moviesEl = document.querySelector(dom_element)
    for(var movi of movies.result){
        var imageElement = document.querySelector("img")
        imageElement.setAttribute('data-id',movie-id)
        imageElement.src = `https://image.tmdb.org/t/p/original${movie[path_type]}`
        imageElement.addEventListener("click",e=>{
            handleMoviesSelection(e)
        })
        moviesEl.appendChild(imageElement)
    }
}

function getOriginals(){
    
}