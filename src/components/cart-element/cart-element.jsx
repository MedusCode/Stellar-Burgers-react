import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import styles from './cart-element.module.css';
import ConstructorCard from '../constructor-card/constructor-card';
import { useDrop } from "react-dnd";
import { CHANGE_DRAGGING_POSSITION } from '../../services/actions/dragging';

const CartElement = ({ index }) => {
  const dispatch = useDispatch();
  const [ingredient, setIngredient] = React.useState({});
  const constructorIngredients = useSelector(store => store.burgerConstructor.ingredients);
  const { temporaryIngredients, draggingIngredientIndex } = useSelector(store => ({
    temporaryIngredients: store.dragging.ingredients,
    draggingIngredientIndex: store.dragging.index,
  }));

  React.useEffect(() => {
    if (draggingIngredientIndex >= 0) setIngredient(temporaryIngredients[index])
    else setIngredient(constructorIngredients[index])
  }, [draggingIngredientIndex, setIngredient])

  const [{ isOver }, ingredientTarget] = useDrop({
    accept: "ingredient",
    collect: monitor => ({
      isOver: monitor.isOver(),
    })
  });

  React.useEffect(() => {
    isOver && draggingIngredientIndex !== index && dispatch({type: CHANGE_DRAGGING_POSSITION, index: index});
  }, [isOver])

  return (
    <div ref={ingredientTarget} className={index === draggingIngredientIndex ? isOver ? styles.dragging : styles.draggingg : ''}>
      { ingredient
        ? <ConstructorCard ingredient={ingredient} isHidden={index === draggingIngredientIndex} />
        : <li className={`${styles.ingredient} ml-4 mr-4 mt-2 mb-2`}>
            <div className={`${styles.empty} ml-8`}></div>
          </li>
      }
    </div>
  )
}

export default CartElement;
