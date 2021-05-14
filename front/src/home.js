import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/home.css'

const Home = () => {   
    const [moviesList, setMoviesList] = useState([]);
    const [movieObject, setMovieObject] = useState({});
    const [moviePoster, setMoviePoster] = useState("");
    const [bool, setBool] = useState(false);
    
    const apiKey = process.env.REACT_APP_APIKEY;
    const tmdb = "https://api.themoviedb.org/3";
    const popularUrl = "/discover/movie?sort_by=popularity.desc";
    const actorUrl = "/search/person?query="
    const titleUrl = "/search/movie?query=";
    const actorMoviesUrl = "/discover/movie?with_cast="

    console.log(process.env)
    
    function toggleMovie(movie){
        setMovieObject(movie);
        setMoviePoster("https://image.tmdb.org/t/p/w300/"+movie.poster_path);
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
                    {(movie.title === movieObject.title) && (
                        <div className="movieDetails">
                        <img className="moviePoster" src={moviePoster}></img>
                        <div>poster: {movieObject.poster}</div>
                        <div>Title: {movieObject.title}</div>
                        <div>{movieObject.vote_average}/10</div>
                        <div>{movieObject.overview}</div>
                        </div>
                        )}
                        </div>
                        )}
                        </div>
                        </div>
                        );
                    }
                    
                    export default Home;