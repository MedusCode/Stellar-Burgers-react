import {FC, useEffect} from 'react';
import styles from './constructor-bun-card.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { ConnectDropTarget, useDrop } from "react-dnd";
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { addBunToConstructor } from '../../services/actions/burger-constructor';
import whiteBun from '../../assets/images/whiteBun.png';
import IIngredient from '../../types/ingredient'

export enum BunType {
  top = 'top',
  bottom = 'bottom'
}

interface IConstructorBunCard {
  type: BunType;
  bun: IIngredient;
  setBun: (ingredient: IIngredient) => void;
}

const ConstructorBunCard: FC<IConstructorBunCard> = ({ type, bun, setBun }) => {
  const dispatch = useDispatch();
  const caption: string = type === BunType.top ? '(верх)' : '(низ)'
  const actualBun = useSelector((store: any) => store.burgerConstructor.bun)
  const allBuns = useSelector((store: any) => store.ingredients.bun)

  const [{temporaryBun, isOver}, bunTarget]: [{isOver: boolean, temporaryBun: {id: string}}, ConnectDropTarget] = useDrop({
    accept: "bun",
    collect: monitor => ({
      isOver: monitor.isOver(),
      temporaryBun: monitor.getItem()
    }),
    drop() {
      actualBun !== bun && dispatch(addBunToConstructor(bun))
    }
  });

  useEffect(() => {
    isOver && setBun(allBuns.find((bun: IIngredient) => bun._id === temporaryBun.id))
    !isOver && setBun(actualBun)
  }, [isOver, actualBun])

  return (
    <div className={`${bun._id !== actualBun._id ? styles.over : ''} ml-4 mr-4 pl-8`} ref={bunTarget}>
      <ConstructorElement
        type={type}
        isLocked={true}
        text={bun._id ? `${bun.name} ${caption}` : 'Перетащите сюда булку'}
        price={bun._id ? bun.price : 0}
        thumbnail={bun._id ? bun.image : whiteBun}
      />
    </div>
  )
}

export default ConstructorBunCard;
