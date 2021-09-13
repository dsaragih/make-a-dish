import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import UserDataService from '../services/user.js';
import { TextareaAutosize } from '@material-ui/core';


function CreateRecipe(props) {

  const initialRecipeList = {
    recipeArray: [],
    totalRecipes: 0
  }

  const [recipeList, setRecipeList] = useState(initialRecipeList);
  const [newTitle, setNewTitle] = useState('');
  const [newIngredients, setNewIngredients] = useState('');
  const [newInstructions, setNewInstructions] = useState('');
  const [newImage, setNewImage] = useState(null);

  const getRecipeList = () => {
    UserDataService.getRecipes(props.user.name)
    .then(res => {
      console.log(res.data)
      setRecipeList(res.data);
    })
    .catch(e => {
      console.error(e);
    });
  }

  useEffect(() => {
    getRecipeList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddRecipe = () => {
    console.log(newIngredients, newInstructions)
    const data = {
      title: newTitle,
      name: props.user.name,
      user_id: props.user.id,
      ingredients: newIngredients,
      instructions: newInstructions,
      image: newImage
    }
    
    setNewTitle('');
    setNewIngredients('')
    setNewInstructions('')
    setNewImage(null);

    UserDataService.createRecipe(data)
    .then(res => {
      console.log(res.data);
      getRecipeList();
    })
    .catch(e => {
      console.error(e);
    })
  }

  return (
    <div className="App">
      {recipeList && props.user && (
        <div>
          <h4>{`${props.user.name}'s Recipes`}</h4>
          <h5>Items in List: {recipeList.totalRecipes}</h5><br/>    
          <div className="container">
            <h5>Recipe List</h5>
            <div className="row">
            {recipeList.recipeArray.length > 0 ? (
              recipeList.recipeArray.map((item, i) => {
                return(
                  <div className="col-lg-4 pb-1">
                    <div className="card">
                      <img src={item.image} width='600' height='300' className='card-img-top' alt={item.title}/>
                      <div className="card-body">
                        <h5 className="card-title">{item.title}</h5>
                      <Link className="mt-3 ml-end" to={{
                        pathname: "recipe/" + item._id + "/edit",
                        state: {
                          currentRecipe: item
                        }
                      }} aria-label="Edit your recipe" style={{backgroundColor: "transparent", border: "none", outline: "none", float: "right"}}> 
                      <img src="https://icons-for-free.com/iconfiles/png/512/edit+document+edit+file+edited+editing+icon-1320191040211803620.png" style={{height: 20, width: 18, marginRight: 10}} alt="Edit your recipe"/>
                      </Link>
                        {item.ingredients.split(' ').length > 200 ? (
                          <p className="card-text" style={{whiteSpace: 'pre-line'}}>
                            {item.ingredients.slice(0, 200)}
                          </p>
                        ) : (
                          <p className="card-text" style={{whiteSpace: 'pre-line'}}>
                            <strong>Ingredients: </strong><br/>
                            {item.ingredients}
                          </p>
                        )}
                      <Link className="mt-3 ml-end" to={{
                        pathname: "recipe/" + item._id,
                        state: {
                          currentRecipe: item
                        }
                      }} aria-label="Edit your recipe" style={{backgroundColor: "transparent", border: "none", outline: "none", float: "right"}}> 
                        Show more
                      </Link>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
            <div className="col-sm-4">
              <p>No items in recipe list.</p>
            </div>
            )}
          </div>
          </div>
          <br/>
          <hr/>
            <h5>Add a Recipe to List</h5>
            <div className="row mb-4">
              <div className="col-lg-1">
                <strong>Date Added</strong><br/>
                {(new Date()).toISOString().substring(0, 10)}
              </div>
              <div className="col">
                <strong>Add Recipe Title</strong><br/>
                <TextareaAutosize aria-label="minimum height" style={{width: '100%'}} minRows={3} placeholder="Recipe Title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)}/>
              </div>
              <div className="col">
                <strong>Add Recipe Ingredients</strong><br/>
                <TextareaAutosize aria-label="minimum height" style={{width: '100%'}} minRows={3} placeholder="Recipe Ingredients" value={newIngredients} onChange={(e) => setNewIngredients(e.target.value)}/>
              </div>
              <div className="col">
                <strong>Add Recipe Instructions</strong><br/>
                <TextareaAutosize aria-label="minimum height" style={{width: '100%'}} minRows={3} placeholder="Recipe Instructions" value={newInstructions} onChange={(e) => setNewInstructions(e.target.value)}/>
              </div>
              <div className="col-lg-2">
                <strong>Upload Image (2:1)</strong>
                <p><input type="file"  accept="image/*" name="image" id="file"  onChange={(event) => setNewImage(URL.createObjectURL(event.target.files[0]))} text="upload"/></p>
                <p><img id="output" width="200" src={newImage} alt={newTitle}/></p>
              </div>
              <div className="col-lg-2 position-relative">
                <button className="btn btn-primary btn-sm position-absolute top-50 start-50" type="button" onClick={handleAddRecipe}>Add Recipe to List</button>
              </div>
            </div>
        </div>
        )}
    </div>
  );
}

export default CreateRecipe;