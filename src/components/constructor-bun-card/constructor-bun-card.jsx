import React from 'react';
import styles from './constructor-bun-card.module.css';
import PropTypes from "prop-types";
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from "react-dnd";
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { addBunToConstructor } from '../../services/actions/burger-constructor';
import whiteBun from '../../assets/images/whiteBun.png';

const ConstructorBunCard = ({ type, bun, setBun }) => {
  const dispatch = useDispatch();
  const caption = type === 'top' ? '(верх)' : '(низ)'
  const actualBun = useSelector(store => store.burgerConstructor.bun)
  const allBuns = useSelector(store => store.ingredients.bun)

  const [{temporaryBun, isOver}, bunTarget] = useDrop({
    accept: "bun",
    collect: monitor => ({
      isOver: monitor.isOver(),
      temporaryBun: monitor.getItem()
    }),
    drop() {
      actualBun !== bun && dispatch(addBunToConstructor(bun))
    }
  });

  React.useEffect(() => {
    isOver && setBun(allBuns.find(bun => bun._id === temporaryBun.id))
    !isOver && setBun(actualBun)
  }, [isOver, actualBun])

  return (
    <div className={`${bun._id !== actualBun._id ? styles.over : ''} ml-4 mr-4 pl-8`} ref={bunTarget}>
      <ConstructorElement
        type={type}
        isLocked={true}
        text={bun._id ? `${bun.name} ${caption}` : 'Перетащите сюда булку'}
        price={bun._id ? bun.price : ''}
        thumbnail={bun._id ? bun.image : whiteBun}
      />
    </div>
  )
}

ConstructorBunCard.propTypes = {
  type: PropTypes.string.isRequired,
  bun: PropTypes.object.isRequired,
  setBun: PropTypes.func.isRequired,
}

export default ConstructorBunCard;
