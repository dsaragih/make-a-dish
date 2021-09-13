import React, { useEffect, useState } from 'react';

function Recipe(props) {

  const [recipe, setRecipe] = useState([]);


  useEffect(() => {
    const url = `https://api.edamam.com/api/recipes/v2/${props.match.params.id}?type=public&app_id=${process.env.REACT_APP_API_ID}&app_key=${process.env.REACT_APP_API_KEY}`;
    const getData = async () => {
      const resp = await fetch(url);
      const json = await resp.json()
      setRecipe(json['recipe']);
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="App">
      {recipe['label'] && (
        <div>
        <strong>{recipe['label']}</strong><br/>
        <img src={recipe['image']} className="img-fluid mx-auto d-block" alt={recipe['label']}/>
        <div className="mt-3">
          <div className="row d-flex justify-content-evenly">
            <div className="col">
              <strong>Source: </strong>{recipe['source']}<br/>
              <strong>Calories (kcal): </strong>{Math.floor(recipe['calories'])}<br/>
              <strong>Dish Type: </strong>{recipe['dishType'].join(', ')}<br/>
              <strong>Diet Labels: </strong>{recipe['dietLabels'].join(', ')}<br/>
              <strong>Meal Type: </strong>{recipe['mealType'].join(', ')}<br/>
            </div>
            <div className="col">
              <strong>Ingredients: </strong><br/>
              <ul>
                {recipe['ingredientLines'].map((ingredient, i) => {
                  return (
                    <li key={i}>
                      {ingredient}
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className="col">
              <strong>Health Labels: </strong><br/>
              <ul>
                {recipe['healthLabels'].map((label, i) => {
                  return (
                    <li key={i}>
                      {label}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
    </div>)}
    </div>
  );
}

export default Recipe;