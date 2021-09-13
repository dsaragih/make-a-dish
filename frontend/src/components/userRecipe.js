import React from 'react';

function UserRecipe (props) {
    const item = props.location.state.currentRecipe;

    return (
        <div>
        <h4>{item.title}</h4><br/>
        <img src={item.image} className="img-fluid mx-auto d-block" alt={item.title} width="800" height="800"/>
        <br/>
        <div className="mt-3 mb-3">
          <div className="row d-flex justify-content-evenly">
            <div className="col-4">
              <strong>Ingredients: </strong><br/>
              {item.ingredients}
            </div>
            <div className="col-4">
              <strong>Instructions: </strong><br/>
              {item.instructions}
            </div>
          </div>
        </div>
        </div>
    )
}

export default UserRecipe;