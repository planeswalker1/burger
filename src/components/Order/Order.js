import React from 'react';

import classes from './Order.module.css';

const order = (props) => {
  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    });
  }
  
  const ingredientOutput = ingredients.map(ingredient => {
    return <span 
      style={{
        border: '1px solid #ccc',
        display: 'inline-block',
        margin: '0 8px',
        textTransform: 'capitalize',
        padding: '5px'
      }}
      key={ingredient.name}>{ingredient.name} ({ingredient.amount}) </span>
  });

  return (
    <div className={classes.order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>Price: <strong>USD {Number(props.price).toFixed(2)}</strong></p>
    </div>
  );
};

export default order;