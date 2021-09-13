import React, { useState } from 'react';
import UserDataService from '../services/user.js';
import { TextareaAutosize } from '@material-ui/core';

function EditRecipe (props) {
    const item = props.location.state.currentRecipe;
    const [title, setTitle] = useState(item.title);
    const [ingredients, setIngredients] = useState(item.ingredients);
    const [instructions, setInstructions] = useState(item.instructions);
    const [image, setImage] = useState(item.image);

    const handleEditRecipe = () => {
        const data = {
            recipe_id: item._id,
            title: title,
            user_id: props.user.id,
            ingredients: ingredients,
            instructions: instructions,
            image: image
        }
        
        setTitle('');
        setIngredients('')
        setInstructions('')
        setImage(null);
    
        UserDataService.updateRecipe(data)
        .then(res => {
          console.log(res.data);
          props.history.push(`/${props.user.name}/recipe`);
        })
        .catch(e => {
          console.error(e);
        })
    }

    return (
        <div className="row">
            <div className="col-lg-4 pb-1">
            <div className="card">
                <img src={image} width='600' height='300' className='card-img-top' alt={title}/>
                <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text" style={{whiteSpace: 'pre-line'}}>
                    <strong>Ingredients: </strong><br/>
                    {ingredients}
                </p>
                <p className="card-text" style={{whiteSpace: 'pre-line'}}>
                    <strong>Instructions: </strong><br/>
                    {instructions}
                </p>
                </div>
            </div>
            </div>
            <div className="col-lg-8">
              <div className="col">
                <strong>Edit Recipe Title</strong><br/>
                <TextareaAutosize aria-label="minimum height" style={{width: '100%'}} minRows={3} placeholder="Recipe Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
              </div>
              <div className="col">
                <strong>Edit Recipe Ingredients</strong><br/>
                <TextareaAutosize aria-label="minimum height" style={{width: '100%'}} minRows={3} placeholder="Recipe Ingredients" value={ingredients} onChange={(e) => setIngredients(e.target.value)}/>
              </div>
              <div className="col">
                <strong>Edit Recipe Instructions</strong><br/>
                <TextareaAutosize aria-label="minimum height" style={{width: '100%'}} minRows={3} placeholder="Recipe Instructions" value={instructions} onChange={(e) => setInstructions(e.target.value)}/>
              </div>
              <div className="col">
                <strong>Upload New Image (2:1)</strong>
                <p><input type="file"  accept="image/*" name="image" id="file"  onChange={(event) => setImage(URL.createObjectURL(event.target.files[0]))} text="upload"/></p>
                <p><img id="output" width="200" src={image} alt={title}/></p>
              </div>
              <div className="d-grid gap-2">
                <button className="btn btn-success mt-3" type="button" onClick={handleEditRecipe}>Confirm Edits</button>
              </div>
            </div>
        </div>
    )
}

export default EditRecipe;