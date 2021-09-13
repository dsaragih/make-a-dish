import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DataServiceAppend from '../services/recipes';
import fetchData from "../http-edamam";
import { diet, health, cuisineType, mealType, dishType } from './options';
 
function RecipeList() {

  const [recipes, setRecipes] = useState([]);
  const [searchFood, setSearchFood] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [searchMealType, setMealType] = useState('')
  const [searchDishType, setSearchDishType] = useState('');
  const [searchDiet, setDiet] = useState('');
  const [healthLabel, setHealthLabel] = useState('');
  const [nextPage, setNextPage] = useState('');
  

  const onChangeSearchFood = e => {
    const searchFood = e.target.value;
    setSearchFood(searchFood);
  }

  const onChangeCuisine = (e, newVal) => {
    setCuisine(newVal);
  }

  const onChangeMealType = (e, newVal) => {
    setMealType(newVal);
  }

  const onChangeDishType = (e, newVal) => {
    setSearchDishType(newVal);
  }

  const onChangeDiet = (e , newVal)=> {
    setDiet(newVal);
  }

  const onChangeHealthLabel = (e, newVal) => {
    setHealthLabel(newVal);
  }

  const queryData = async () => {
    let url;

    url = DataServiceAppend.getFood(searchFood)
    
    url = DataServiceAppend.getCuisine(cuisine);

    url = DataServiceAppend.getMealType(searchMealType);

    url = DataServiceAppend.getDishType(searchDishType);

    url = DataServiceAppend.getDiet(searchDiet);

    url = DataServiceAppend.getHealth(healthLabel);
    console.log(url)
    const data = await fetchData(url);
    setNextPage(data._links.next.href);
    setRecipes(data['hits'].map(x => x['recipe']))
  }

  const getNextPage = async () => {
    const data = await fetchData(nextPage);
    setNextPage(data._links.next.href)
    setRecipes(data['hits'].map(x => x['recipe']))
  }

  const extractRecipeURI = (uri) => {
    // From https://dev.to/benjaminadk/parse-user-input-for-urls-timestamps--hashtags-3dh4
    
    const matches = uri.match(/(?:\s|^)?#[A-Za-z0-9]+(?:\s|$)/g);
    return matches[0].slice(1);
  }

  return (
    <div className="App">
      <div className="row pb-1">
        <div className="col-lg-6">
          <div>Food</div>
          <TextField style={{marginTop: 10}} fullWidth={true} size="small" variant="outlined" placeholder="Search for food e.g. chicken" value={searchFood} onChange={onChangeSearchFood}/>
        </div>
        <div className="col-lg-6" >
          <div>Cuisine</div>
          <Autocomplete
          
          options={cuisineType}
          size="small"
          style={{ marginTop: 10}}
          renderInput={(params) => <TextField {...params} label="Type to search cuisines" variant="outlined" />}
          value={cuisine}
          onChange={onChangeCuisine}
          />
        </div>
        <div className="col-lg-6">
          <div>Meal Type</div>
          <Autocomplete
          
          options={mealType}
          size="small"
          style={{ marginTop: 10}}
          renderInput={(params) => <TextField {...params} label="Type to search meal types" variant="outlined" />}
          value={searchMealType}
          onChange={onChangeMealType}
          />
        </div>
        <div className="col-lg-6">
          <div>Dish Type</div>
          <Autocomplete
          
          options={dishType}
          size="small"
          style={{ marginTop: 10 }}
          renderInput={(params) => <TextField {...params} label="Type to search dish types" variant="outlined" />}
          value={searchDishType}
          onChange={onChangeDishType}
          />
        </div>
        <div className="col-lg-6">
          <div>Diet Type</div>
          <Autocomplete
          
          options={diet.map(type => {
            type = type.replace('-', ' ');
            return type.charAt(0).toUpperCase() + type.slice(1);
          })}
          size="small"
          style={{ marginTop: 10}}
          renderInput={(params) => <TextField {...params} label="Type to search diet types" variant="outlined" />}
          value={searchDiet}
          onChange={onChangeDiet}
          />
        </div>
        <div className="col-lg-6">
          <div>Health Labels</div>
          <Autocomplete
          
          options={health.map(type => {
            type = type.replaceAll('-', ' ');
            return type.charAt(0).toUpperCase() + type.slice(1);
          })}
          size="small"
          style={{ marginTop: 10}}
          renderInput={(params) => <TextField {...params} label="Type to search health labels" variant="outlined" />}
          value={healthLabel}
          onChange={onChangeHealthLabel}
          />
        </div>  
        <div className="d-grid gap-2" style={{marginTop: 20, marginBottom: 20}}>
          <button className="btn btn-success btn-lg" type="button" onClick={queryData}>Search</button>
        </div>     
      </div>
      <div className="row">
        {recipes.map((recipe) => {
          return (
            <div className="col-lg-4 pb-1">
              <div className="card">
                <img src={recipe['image']} className='card-img-top' alt={recipe['label']}/>
                <div className="card-body">
                  <h5 className="card-title">{recipe['label']}</h5>
                  <p className="card-text">
                    <strong>Source: </strong>{recipe['source']}<br/>
                    <strong>Calories (kcal): </strong>{Math.floor(recipe['calories'])}<br/>
                    <strong>Dish Type: </strong>{recipe['dishType'].join(', ')}<br/>
                    <strong>Ingredients: </strong><br/>
                    <ul>
                      {recipe['ingredientLines'].length > 8 ? (
                        recipe['ingredientLines'].slice(0, 8).map((ingredient, i) => {
                          if (i < 7) {
                            return (
                              <li key={i}>
                                {ingredient}
                              </li>
                            )
                          } else {
                            return <li key={i}>
                              <strong>... click below to show more</strong>
                              </li>
                          }
                        })
                      ) :
                      recipe['ingredientLines'].map((ingredient, i) => {
                        return (
                          <li key={i}>
                            {ingredient}
                          </li>
                        )
                      })}
                    </ul>
                  </p>
                  <a href={`/recipes/${extractRecipeURI(recipe['uri'])}`} class="btn btn-primary">Show more</a>
                </div>
              </div>
            </div>
          );
        })}
        {Boolean(recipes.length) && (
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <button className="btn btn-secondary me-md-2 mb-2" onClick={getNextPage}>Next Page &rarr;</button>
        </div>
        )}
      </div>
    </div>
  );
}

export default RecipeList;