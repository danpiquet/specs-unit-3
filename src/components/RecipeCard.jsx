import React from "react";
import { useNavigate } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  console.log(recipe);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/recipe/${recipe.recipe_id}`);
  };
  return (
    <div className="recipe-card-container">
      <img src={recipe.image_url} alt={recipe.recipe_name} />
      <h1>{recipe.recipe_name}</h1>
      <button onClick={handleClick} className="blue-btn">See More</button>
    </div>
  );
};

export default RecipeCard;
