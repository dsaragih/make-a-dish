import React, { useState } from 'react'
import { Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Cart from './components/cart';
import Login from './components/login';
import RecipeList from './components/recipe-list';
import Recipe from './components/recipe';
import CreateRecipe from './components/createRecipe';

function App() {

  const [user, setUser] = useState(null);

  const login = (user=null) => {
    setUser(user);
  }

  const logout = () => {
    setUser(null);
  }

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand" style={{marginLeft: '1rem'}}>
          Make A Dish
        </a>
        <div className="navbar-expand navbar-dark bg-dark">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to={"/recipes"} className="nav-link">
                Recipes
              </Link>
            </li>
            <li className="nav-item">
              <Link to={user ? `/${user.name}/cart` : '/login'} className="nav-link">
                Cart
              </Link>
            </li>
            <li className="nav-item">
              <Link to={user ? `/${user.name}/recipe` : '/login'} className="nav-link">
                Create Recipe
              </Link>
            </li>

            <li className="nav-item" >
              { user ? (
              <a onClick={logout} className="nav-link" style={{cursor:'pointer'}}>
                Logout {user.name}
              </a>
            ) : (            
            <Link to={"/login"} className="nav-link">
              Login
            </Link>
            )}
            </li>
            <li className="nav-item position-absolute end-0" id="edamam-badge" data-color="black">
            </li>
          </ul>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/recipes"]} component={RecipeList} />
          <Route 
            path="/:id/cart"
            render={(props) => (
              <Cart {...props} user={user} />
            )}
          />
          <Route 
            path="/:id/recipe"
            render={(props) => (
              <CreateRecipe {...props} user={user} />
            )}
          />
          <Route 
            path="/recipes/:id"
            render={(props) => (
              <Recipe {...props} user={user} />
            )}
          />
          <Route 
            path="/login"
            render={(props) => (
              <Login {...props} login={login} />
            )}
          />
        </Switch>
      </div>
    </div>
  );
}

export default App;