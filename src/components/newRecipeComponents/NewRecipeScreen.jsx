import React from "react";
import { Formik } from "formik";
import "./NewRecipe.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./NewRecipe.css";

const NewRecipeScreen = () => {
  const [ingredients, setIngredients] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const navigate = useNavigate();

  const addIngredients = () => {
    setIngredients([...ingredients, { name, quantity }]);
    console.log(ingredients);
    setName("");
    setQuantity("");
  };

  const initialValues = {
    type: "",
    recipeName: "",
    imageURL: "",
    prepTime: "",
    cookTime: "",
    serves: "",
    ingredients: [],
    instructions: "",
  };

  const onSubmit = (values) => {
    values.ingredients = ingredients;
    axios
      .post("https://recipes.devmountain.com/recipes", values)
      .then((res) => {
        console.log(res.data);
        navigate(`/recipe/${res.data[0][0].recipe_id}`);
      })
      .catch((err) => console.log(err));
  };

  const ingredientsDisplay = ingredients.map((ing) => {
    return (
      <li className="bullets">
        {ing.quantity} {ing.name}
      </li>
    );
  });
  console.log(ingredientsDisplay);
  return (
    <section id="add-form-container">
      <h1>Tell us about your Recipe!</h1>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values, handleChange, handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit} className="new-recipe-form">
              <div className="name-image-container">
                <input
                  placeholder="Name"
                  value={values.recipeName}
                  onChange={handleChange}
                  name="recipeName"
                />
                <input
                  placeholder="Image URL"
                  value={values.imageURL}
                  onChange={handleChange}
                  name="imageURL"
                />
              </div>
              <div id="radio-container">
                <span className="radio-button">
                  <input
                    type="radio"
                    value="Cook"
                    onChange={handleChange}
                    name="type"
                  />
                  <label>Cook</label>
                </span>
                <span className="radio-button">
                  <input
                    type="radio"
                    value="Bake"
                    onChange={handleChange}
                    name="type"
                  />
                  <label>Bake</label>
                </span>
                <span className="radio-button">
                  <input
                    type="radio"
                    value="Drink"
                    onChange={handleChange}
                    name="type"
                  />
                  <label>Drink</label>
                </span>
              </div>

              <div className="prep-cook-serves-container">
                <input
                  placeholder="Prep Time"
                  value={values.prepTime}
                  onChange={handleChange}
                  name="prepTime"
                />
                <input
                  placeholder="Cook Time"
                  value={values.cookTime}
                  onChange={handleChange}
                  name="cookTime"
                />
                <input
                  placeholder="Serves"
                  value={values.serves}
                  onChange={handleChange}
                  name="serves"
                />
              </div>

              <div id="add-display-ingredients">
                <div id="ingredient-inputs-container">
                  <input
                    placeholder="Ingredient"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div id="ingredients-container">
                  <ul>{ingredientsDisplay}</ul>
                </div>
              </div>
              <button className="orange-btn" type="button" onClick={() => addIngredients()}>
                Add Another
              </button>

              <textarea
              id="form-text-area"
                placeholder="What are the instructions?"
                value={values.instructions}
                onChange={handleChange}
                name="instructions"
              ></textarea>

              <button className="blue-btn" type="submit">Save</button>
            </form>
          );
        }}
      </Formik>
    </section>
  );
};

export default NewRecipeScreen;
