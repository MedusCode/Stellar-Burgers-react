import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from "react-dnd";
import styles from './cart.module.css';
import ConstructorCard from '../constructor-card/constructor-card'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { nanoid } from 'nanoid';
import whiteBun from '../../assets/images/whiteBun.png'
import { CHANGE_DRAGGING_POSSITION } from '../../services/actions/dragging';
import { addToConstructor } from '../../services/actions/burger-constructor';

const Cart = () => {
  const dispatch = useDispatch();
  const { bun, ingredients } = useSelector(store => ({
    bun: store.burgerConstructor.bun,
    ingredients: store.burgerConstructor.ingredients
  }))
  const { draggingIngredient, constructorDublicate, index } = useSelector(store => ({
    draggingIngredient: store.dragging.ingredient,
    constructorDublicate: store.dragging.constructorArray,
    index: store.dragging.previousIndex
  }))
  const [temporaryBun, setTemporaryBun] = React.useState({})
  const buns = useSelector(store => store.ingredients.bun)
  const cartContainerRef = React.useRef(null);


  const [{ingredientIsOver}, ingredientTarget] = useDrop({
    accept: "ingredient",
    collect: monitor => ({
      ingredientIsOver: monitor.isOver(),
    }),
    hover(id, monitor) {
      const sliceHeight = cartContainerRef.current.scrollHeight / constructorDublicate.length;
      const mouseYPossition = monitor.getClientOffset().y - cartContainerRef.current.offsetTop + cartContainerRef.current.scrollTop;
      let newIndex = Math.trunc(mouseYPossition / sliceHeight)
      newIndex = newIndex > 0 ? newIndex : 0;
      newIndex = newIndex < constructorDublicate.length ? newIndex : constructorDublicate.length - 1
      dispatch({
        type: CHANGE_DRAGGING_POSSITION,
        newIndex: newIndex
      });
    },
    drop(id) {
      dispatch(addToConstructor(draggingIngredient, index));
    }
  });

  const [{bunItem, upperBunIsOver}, upperBunTarget] = useDrop({
    accept: "bun",
    collect: monitor => ({
      upperBunIsOver: monitor.isOver(),
      bunItem: monitor.getItem()
    }),
    drop() {
      dispatch(addToConstructor(temporaryBun))
    }
  });

  const [{lowerBunIsOver}, lowerBunTarget] = useDrop({
    accept: "bun",
    collect: monitor => ({
      lowerBunIsOver: monitor.isOver(),
    }),
    drop() {
      dispatch(addToConstructor(temporaryBun))
    }
  });

  React.useEffect(() => {
    if (upperBunIsOver || lowerBunIsOver) {
      const draggingBun = buns.find(bun => bun._id === bunItem.id)
      setTemporaryBun(draggingBun)
    }
    (!upperBunIsOver && !lowerBunIsOver) && setTemporaryBun({})
  }, [upperBunIsOver, lowerBunIsOver])

  React.useEffect(() => {
    const sectionListSizing = () => {
      cartContainerRef.current.style.maxHeight = `${window.innerHeight - cartContainerRef.current.offsetTop - 292}px`;
    }

    window.addEventListener('resize', sectionListSizing);
    sectionListSizing()

    return () => {
      window.removeEventListener('resize', sectionListSizing);
    }
  }, [])


  return (
    <>
      <ul className={styles.cart}>
        <li className='ml-4 mr-4 pl-8' ref={upperBunTarget}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={temporaryBun._id ? `${temporaryBun.name} (верх)` : bun._id ? `${bun.name} (верх)` : 'Перетащите сюда булку'}
            price={temporaryBun._id ? temporaryBun.price : bun._id ? bun.price : ''}
            thumbnail={temporaryBun._id ? temporaryBun.image : bun._id ? bun.image : whiteBun}
          />
        </li>
        <div ref={ingredientTarget}>
          <div className={styles.container} ref={cartContainerRef}>
            {ingredients.length > 0 && !ingredientIsOver
              ? ingredients.map((item) => {
                  return (<ConstructorCard ingredient={item} key={item.nanoid} />)
                })
              : ingredients.length > 0
                ? constructorDublicate.map((item) => {
                    return (<ConstructorCard ingredient={item} key={item.nanoid} />)
                  })
                : ingredientIsOver
                  ? <ConstructorCard ingredient={draggingIngredient} key={draggingIngredient.nanoid} />
                  : <li className={`${styles.ingredient} ml-4 mr-4`}>
                      <div className={`${styles.empty} ml-8`}></div>
                    </li>
            }
          </div>
        </div>
        <li className='ml-4 mr-4 pl-8' ref={lowerBunTarget}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={temporaryBun._id ? `${temporaryBun.name} (низ)` : bun._id ? `${bun.name} (низ)` : 'Перетащите сюда булку'}
            price={temporaryBun._id ? temporaryBun.price : bun._id ? bun.price : ''}
            thumbnail={temporaryBun._id ? temporaryBun.image : bun._id ? bun.image : whiteBun}
          />
        </li>
      </ul>
    </>
  )
}

export default Cart;
