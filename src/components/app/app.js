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

  const checkResponse = (res) => {
    if (res.ok) return res.json();
    return Promise.reject(res.status);
  }

  React.useEffect(() => {
    const getData = () => {
      setStatus({isLoading: true, hasError: false})
      fetch(apiUrl)
        .then(checkResponse)
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
        .catch(error => {
          setStatus({hasError: true, isLoading: false, errorCode: error});
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
          : <InfoPage info='Попробуйте перезапустить страницу.'>Произошла ошибка: {status.errorCode} :(</InfoPage>
      }
    </>
  )
}

export default App;
