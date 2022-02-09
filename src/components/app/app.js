import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header'
import Constructor from '../constructor/constructor'
import OtherPage from '../other-page/other-page';

const App = () => {
  const [activePage, setActivePage] = React.useState('Constructor');

  return (
    <>
      <AppHeader setActivePage={setActivePage}/>
      <main className={`${styles.main} pr-5 pl-5`}>
        {activePage === 'Constructor' ? <Constructor /> : <OtherPage />}
      </main>
    </>
  )
}
export default App;
