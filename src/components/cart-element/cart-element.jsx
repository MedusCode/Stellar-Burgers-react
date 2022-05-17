import React from "react";
import styles from './cart-element.module.css';
import PropTypes from "prop-types";
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from "react-dnd";
import ConstructorCard from '../constructor-card/constructor-card';
import { CHANGE_DRAGGING_INDEX } from '../../services/actions/dragging';

const CartElement = ({ index }) => {
  const dispatch = useDispatch();
  const [ingredient, setIngredient] = React.useState(null);
  const [cardStyle, setCardStyle] = React.useState('')
  const constructorIngredients = useSelector(store => store.burgerConstructor.ingredients);
  const { temporaryIngredients, draggingIngredientIndex, draggingType } = useSelector(store => ({
    temporaryIngredients: store.dragging.ingredients,
    draggingIngredientIndex: store.dragging.index,
    draggingType: store.dragging.draggingType,
  }));

  const [{ isOver }, ingredientTarget] = useDrop({
    accept: "ingredient",
    collect: monitor => ({
      isOver: monitor.isOver(),
    })
  });

  React.useEffect(() => {
    isOver && draggingIngredientIndex !== index && dispatch({type: CHANGE_DRAGGING_INDEX, index: index});
  }, [isOver])

  React.useEffect(() => {
    index === draggingIngredientIndex && isOver && setCardStyle(styles.over)
    index === draggingIngredientIndex && !isOver && draggingType === 'add' && setCardStyle(styles.notOver)
    index !== draggingIngredientIndex && setCardStyle('')
  }, [isOver, draggingIngredientIndex])

  React.useEffect(() => {
    if (draggingIngredientIndex >= 0) setIngredient(temporaryIngredients[index])
    else setIngredient(constructorIngredients[index])
  }, [draggingIngredientIndex, setIngredient])

  return (
    <div ref={ingredientTarget} className={cardStyle}>
      { ingredient
        ? <ConstructorCard ingredient={ingredient} isOver={index === draggingIngredientIndex} />
        : <li className={`${styles.ingredient} ml-4 mr-4 mt-2 mb-2`}>
            <div className={`${styles.empty} ml-8`}></div>
          </li>
      }
    </div>
  )
}

CartElement.propTypes = {
  index: PropTypes.number.isRequired
}

export default CartElement;
