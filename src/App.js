import React, {useEffect, useState} from 'react';
import Recipe from './recipe';
import './App.css';


const App = () =>{
  const APP_ID = '2212ac86';
  const APP_KEY = 'c15684e291aa4073912e4c99dec07227';

    const [recipes,setRecepes] = useState([]);
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState('chicken');
  

    useEffect(() => {
       getRecipie();
    },[query]);

    const getRecipie = async () => {
      const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
        );
      const data  = await response.json();
      setRecepes(data.hits)

    }

    const updateSearch = e =>{
      setSearch(e.target.value)
    }

    const getSearch = e => {
      e.preventDefault();
      setQuery(search);
      setSearch("")
    }


  return (
  <div className="App">
    <form onSubmit={getSearch} className="search-form">
      <input type='text' className="search-bar" value={search} onChange={updateSearch}></input>
      <button className="search-button" type="submit">Search</button>
    </form>
    {recipes.map(recipe =>  (


      <Recipe 
      key={recipe.recipe.label} 
       title={recipe.recipe.label} 
       calories={recipe.recipe.calories} 
       image={recipe.recipe.image}
       ingredients={recipe.recipe.ingredients}
       />
    )
      
      )};
  </div>
    
    
    );

};



export default App;
