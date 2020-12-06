import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/home.css'

const Home = () => {   
    const [moviesList, setMoviesList] = useState([]);
    const [moviePoster, setMoviePoster] = useState("");
    const [movieTitle, setMovieTitle] = useState("No movie selected");
    const [movieNote, setMovieNote] = useState("10");
    const [movieOverview, setMovieOverview] = useState("");
    const [bool, setBool] = useState(false);
    
    const apiKey = "a653d44082e0cd4ed14ab543f3cc7dae";
    const tmdb = "https://api.themoviedb.org/3";
    const popularUrl = "/discover/movie?sort_by=popularity.desc";
    const actorUrl = "/search/person?query="
    const titleUrl = "/search/movie?query=";
    const actorMoviesUrl = "/discover/movie?with_cast="
    
    function toggleMovie(movie){
        setMoviePoster("https://image.tmdb.org/t/p/w300/"+movie.poster_path)
        setMovieTitle(movie.title);
        setMovieNote(movie.vote_average);
        setMovieOverview(movie.overview);
    }
    
    function Search(){
        const [input, setInput] = useState({});
        const handleSubmit = () => {
            setBool(true);
        }
        
        const handleInputChange = (event) => {
            event.persist();
            
            setInput(input => ({...input, [event.target.name]: event.target.value}))
        }
        
        return {
            handleSubmit,
            handleInputChange,
            input
        }
    }
    
    let {input, handleInputChange, handleSubmit, setInput} = Search();
    
    useEffect(() => {
        const fetchData = async () => {
            axios.get(tmdb+popularUrl+"&api_key="+apiKey).then(function (res) {
                setMoviesList(res.data.results)})
            };
            fetchData();
        }, [])
        
        useEffect(() => {
            const fetchData = async () => {
                if(input.type==="actor"){
                    axios.get(tmdb+actorUrl+input.data+"&api_key="+apiKey).then(function (res) {
                        axios.get(tmdb+actorMoviesUrl+res.data.results[0].id+"&api_key="+apiKey).then(function (res){
                            setMoviesList(res.data.results)
                        })
                    })
                    
                } else {
                    axios.get(tmdb+titleUrl+input.data+"&api_key="+apiKey).then(function (res) {
                        setMoviesList(res.data.results)})
                    }
                };
                if(bool && input){
                    console.log("wtf")
                    fetchData();
                    setBool(false)
                }
            }, [bool])
            
            return (
                <div>
                <div className="searchBar">
                <input type="text" placeholder="search" name="data" onChange={handleInputChange} required value={input.data}></input>
                <select className="searchType" name="type" onChange={handleInputChange} required value={input.type}>
                <option value="title">Title</option>
                <option value="actor">Actor</option>
                </select>
                <button value="Submit" onClick={()=>handleSubmit()}>Search</button>
                </div>
                <div>
                {moviesList.map(movie =>
                    <div className="moviesList" key={movie.id}>
                    <div className="movieTitle" onClick={() => toggleMovie(movie)}>{movie.title}</div>
                    {(movie.title === movieTitle) && (
                        <div className="movieDetails">
                        <img className="moviePoster" src={moviePoster}></img>
                        <div>Title: {movieTitle}</div>
                        <div>{movieNote}/10</div>
                        <div>{movieOverview}</div>
                        </div>
                        )}
                        </div>
                        )}
                        </div>
                        </div>
                        );
                    }
                    
                    export default Home;