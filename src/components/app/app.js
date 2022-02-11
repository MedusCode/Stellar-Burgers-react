import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header'
import Constructor from '../constructor/constructor'
import OtherPage from '../other-page/other-page';
import InfoPage from '../info-page/info-page';

const apiUrl = 'https://norma.nomoreparties.space/api/ingredients';

const App = () => {
  const [activePage, setActivePage] = React.useState('Constructor');
  const [ingredientsData, setIngredientsData] = React.useState([]);
  const [status, setStatus] = React.useState({isLoading: false, hasError: false});
  const [filteredData, setFilteredData] = React.useState({
    bun: [],
    sauce: [],
    main: []
  })

  React.useEffect(() => {
    const getData = () => {
      setStatus({isLoading: true, hasError: false})
      fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
          const bun = [];
          const sauce = [];
          const main = [];

          data.data.forEach((ingredient) => {
            ingredient.type === 'bun' && bun.push(ingredient)
            ingredient.type === 'sauce' && sauce.push(ingredient);
            ingredient.type === 'main' && main.push(ingredient);
          })

          setIngredientsData(data.data);
          setFilteredData({bun, sauce, main});
          setStatus({isLoading: false, hasError: false})
        })
        .catch(e => {
          setStatus({hasError: true, isLoading: false});
        });
    }

    getData();
  }, [])

  return (
    <>
      {!status.isLoading && !status.hasError ?
        <>
          <AppHeader setActivePage={setActivePage} />
          <main className={`${styles.main} pr-5 pl-5`}>
            {activePage === 'Constructor'
              ? <Constructor filteredData={filteredData} ingredientsData={ingredientsData} />
              : <OtherPage />}
          </main>
        </>
        : status.isLoading
          ? <InfoPage>Загрузка...</InfoPage>
          : <InfoPage info='Попробуйте перезапусть страницу.'>Произошла ошибка :(</InfoPage>
      }
    </>
  )
}



export default App;
