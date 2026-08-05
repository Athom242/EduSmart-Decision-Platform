import { useState } from 'react'


import { Outlet } from 'react-router-dom'

import Header from './components/Headers'
import Footer from './components/Footer'

import styles from './styles/App.scss'

  
const App = React.FC = ()=>{
  return (
    <div className={styles.appLayout}>

        <Header/>
            <main>
                <Outlet/>
            </main>
        <Footer/>

    </div>
  )
}

export default App
