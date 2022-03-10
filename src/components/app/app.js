import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header'
import Constructor from '../constructor/constructor'
import OtherPage from '../other-page/other-page';
import { getIngredients } from '../../services/actions/ingredients'

const App = () => {
  const dispatch = useDispatch();
  const [activePage, setActivePage] = React.useState('Constructor');
  const [ingredientsData, setIngredientsData] = React.useState([]);

  React.useEffect(() => {
    dispatch(getIngredients())
  }, [])

  return (
    <>
          <AppHeader setActivePage={setActivePage} />
          <main className={`${styles.main} pr-5 pl-5`}>
            {activePage === 'Constructor'
              ? <Constructor ingredientsData={ingredientsData} />
              : <OtherPage />}
          </main>

    </>
  )
}

export default App;
