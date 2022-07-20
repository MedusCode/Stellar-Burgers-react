import {FC, useState, useRef, useEffect} from 'react';
import styles from './cart.module.css';
import { useSelector } from '../../services/hooks/reduxHooks';
import ConstructorBunCard, { BunType } from '../constructor-bun-card/constructor-bun-card';
import CartElement from '../cart-element/cart-element';
import IIngredient from '../../types/ingredient';


const Cart: FC = () => {
  const [bun, setBun] = useState<IIngredient >({} as IIngredient);
  const elementsContainerRef = useRef<HTMLUListElement>(null);
  const constructorIngredients = useSelector(store => store.burgerConstructor.ingredients);
  const { draggingIngredientIndex, draggingType } =  useSelector(store => ({
    draggingIngredientIndex: store.dragging.index,
    draggingType: store.dragging.draggingType,
  }));

  useEffect(() => {
    const sectionListSizing = () => {
      if (elementsContainerRef.current) {
        elementsContainerRef.current.style.maxHeight = `${window.innerHeight - elementsContainerRef.current.offsetTop - 285}px`;
      }
    }

    window.addEventListener('resize', sectionListSizing);
    sectionListSizing()

    return () => {
      window.removeEventListener('resize', sectionListSizing);
    }
  }, [])

  return (
    <>
      <div className={styles.cart}>
        <ConstructorBunCard type={BunType.top} bun={bun} setBun={setBun} />
        <ul className={styles.ingredientsContainer} ref={elementsContainerRef}>
          {constructorIngredients.map((item: IIngredient, index: number) => (<CartElement index={index} key={item.nanoid} />))}
          {((draggingIngredientIndex >= 0 && draggingType === 'add') || constructorIngredients.length === 0)
              && <CartElement index={constructorIngredients.length} />}
        </ul>
        <ConstructorBunCard type={BunType.bottom} bun={bun} setBun={setBun} />
      </div>
    </>
  )
}

export default Cart;
