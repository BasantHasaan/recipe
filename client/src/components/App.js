import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { Query }  from 'react-apollo';
import { GET_ALL_RECIPES } from '../queries';
import RecipeItem from './Recipe/RecipeItem';



const App = ()=>(


  <div className="App">
    <h1>Home</h1>
   
      <Query query={GET_ALL_RECIPES}>
    {({ loading, error, data }) => {
      console.log(GET_ALL_RECIPES)
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;
        console.log(data)
    return <ul>{data.getAllRecipes.map(recipe=>(
      <RecipeItem  key={recipe._id} {...recipe}/>
    )
     
    )}</ul>
        
        
       }}

    </Query>  
    </div>

)
// function App() {
//   return (
//     <div className="App">
//      Home
//     </div>
//   );
// }

export default App;
