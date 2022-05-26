import React, {useState, useRef} from "react";
import Movie from "./Movie";


export default function MovieList() {
    const [movies, setMovies] = useState([{
        id: 1,
        title: "Malmö"
    }]);

    // Tar input och lägger i variabler
    const inputTitle = useRef();

   
    // Först kontrolleras input så det inte är tomt, om tomt skickas prompt
    function addItem(event){
        
        event.preventDefault();

        if (inputTitle.current.value === "") {
            alert("Du måste ange en titel för att kunna spara filmen");
            return false;
        }
    
        
        const newId = movies.length > 0 ? movies[movies.length - 1].id + 1 : 1;
        // setMovies skickar in datan till movies
        setMovies([...movies, {
            id: newId,
            title: inputTitle.current.value     
        }]);
        // Rensar fälten efter att filmen är tillagd
        inputTitle.current.value = "";
    }
    // När användaren klickar på sortera efter betyg så körs funktionen nedan.
    function sortbyGrade() {
        let sortedMovies = [...movies];
        sortedMovies.sort(function(a,b){
            return parseInt(b.grade)  - parseInt(a.grade);
           }) 
        setMovies(sortedMovies);     
    }
    // När användaren klickar på att sortera efter bokstavsordning så körs funktionen nedan.
    function sortbyAscending() {
        let movieToSort = [...movies];
        const sortedItems = movieToSort.sort((a,b) => a.title.localeCompare(b.title))
        setMovies(sortedItems);    
    }
    /* 
    Sparar alla filmer som inte matchar ID:et till filmen som är klickad på.
    På så vis försvinner filmen bort från listan.
    */
    function deleteItem(id) {
        setMovies(movies.filter((item) => item.id !== id));

    }


    /*
    Returnerar html-elementen med inputfält och för varje film i "movies"
    skapas ett li-element med tillhörande stjärnor och ta bort knapp.
    */
    return (
        <div>
            <form onSubmit={addItem}>
            <input className="form-control" placeholder="Ange filmtitel här" ref={inputTitle} it="title"></input>
       
            
            <input type="submit" className="btn btn-success mt-3" value="Spara film"></input>
            </form>

            <ul className="list-group">

                { movies.map(movie => <Movie key={movie.id} item={movie} deleteItem={deleteItem} grade={movie.grade} />)}
                
     
            </ul>
            <button id="order-alphabetic" className="btn btn-primary" onClick={() => sortbyAscending()}>
                Alfabetisk ordning
            </button>
            <button id="order-grade" className="btn btn-primary" onClick={() => sortbyGrade()}>
                Betygsordning
            </button>
        </div>
    )
}


