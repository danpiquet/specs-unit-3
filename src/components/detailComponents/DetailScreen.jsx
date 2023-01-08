import React from "react";
import salmon from "../../assets/salmon.jpg";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const DetailScreen = () => {
  const { id } = useParams();
  const [recipeDetail, setRecipeDetail] = useState({});

  const getRecipeDetail = () => {
    axios
      .get(`https://recipes.devmountain.com/recipes/${id}`)
      .then((res) => setRecipeDetail(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getRecipeDetail();
  }, []);

  return (
    <section>
      <div
        style={{
          background: `linear-gradient(
          190deg,
          rgba(0, 0, 0, 0.8),
          rgba(0, 0, 0, 0.8)),
          url(${recipeDetail.image_url})`,
          backgroundSize: "cover",
        }}
      >
        <div id="detail-banner-container">
          <h1>{recipeDetail.recipe_name}</h1>
        </div>
      </div>

      <div className="recipe-ingredients-instructions-container">
        <div className="recipe-ingredients-container">
          <div>
            <h1>Recipe</h1>
            <p>Prep Time: {recipeDetail.prep_time}</p>
            <p>Cook Time: {recipeDetail.cook_time}</p>
            <p>Serves: {recipeDetail.serves}</p>
            <br />
          </div>

          <div>
            <h1>Ingredients</h1>
            <ul>
              {recipeDetail.ingredients &&
                recipeDetail.ingredients.map((ing, index) => {
                  return (
                    <h4>
                      {ing.quantity} {ing.ingredient}
                    </h4>
                  );
                })}
            </ul>
          </div>
        </div>

        <div className="instructions-container">
          <div>
            <h1>Instructions</h1>
            <p style={{ whiteSpace: "pre-wrap" }}>
              {recipeDetail.instructions &&
                JSON.parse(recipeDetail.instructions)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailScreen;
