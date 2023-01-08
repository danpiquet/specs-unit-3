import React from "react";
import { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import RecipeCard from "../RecipeCard";

const RecipeContainer = ({ recipes }) => {
  const [search, setSearch] = useState("");

  const searchDisplay = recipes
    .filter((recipe) => {
      if (recipe.recipe_name.toLowerCase().includes(search.toLowerCase()))
        return recipe;
    })
    .map((recipe) => {
      return <RecipeCard recipe={recipe} />;
    });

  return (
    <div id="home-screen-container">
      <span id="search-bar" >
        <BiSearchAlt2 className="search-input-field" size="2em" color="#DA7635" />
        <input className="search-input-field"
          type="text"
          value={search}
          placeholder="Search for a Recipe"
          onChange={(e) => setSearch(e.target.value)}
        />
      </span>
      <div id="all-recipes-container">{searchDisplay}</div>
    </div>
  );
};

export default RecipeContainer;
