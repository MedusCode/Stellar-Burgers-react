import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header'
import Constructor from '../constructor/constructor'
import OtherPage from '../other-page/other-page';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import { CLOSE_MODAL } from '../../services/actions/modal'
import { getIngredients } from '../../services/actions/ingredients'

const App = () => {
  const dispatch = useDispatch();
  const { isModalOpened, modalType } = useSelector(store => ({
    isModalOpened: store.modal.isOpen,
    modalType: store.modal.type
  }));
  const activePage = useSelector(store => store.app.activePage)

  const closeCommonModal = () => {
    dispatch({type: CLOSE_MODAL})
  }

  React.useEffect(() => {
    dispatch(getIngredients())
  }, [])

  return (
    <>
      <AppHeader />
      <main className={`${styles.main} pr-5 pl-5`}>
        {activePage === 'Constructor'
          ? <Constructor />
          : <OtherPage />}
      </main>
      {isModalOpened && (modalType === 'ingredient'
        ? <Modal title='Детали ингредиента' onClose={closeCommonModal}><IngredientDetails /></Modal>
        : <Modal onClose={closeCommonModal}><OrderDetails /></Modal>)
      }
    </>
  )
}

export default App;
