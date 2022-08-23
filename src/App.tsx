import React, { useContext, useEffect } from 'react'
import AppRouter from './components/AppRouter/AppRouter'
import { withLayout } from './layout/Layout';
import './App.css';
import { observer } from 'mobx-react-lite';
import { StoreContext } from './store.context';
import IUser from './interfaces/user.interface';


const App = observer(() => {
  const {authStore} = useContext (StoreContext);
  useEffect (() => {
    if (localStorage.getItem ('auth')) {
      authStore.user = {username: localStorage.getItem ('username' || '')} as IUser;
      authStore.auth = true;
    }
  }, [])
  return (
    <>
      <AppRouter/>
    </>
  )
})

export default withLayout(App);