import React, { useContext } from 'react'
import { BrowserRouter, Link, Route, Routes, Navigate } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../../router';
import { v4 as uuidv4 } from 'uuid';
import { StoreContext } from '../../store.context';
import { observer } from 'mobx-react-lite'
const AppRouter = observer(() => {
    const {authStore} = useContext (StoreContext);
    const auth = authStore.auth;
  return (
    <>
        <Routes>
            {
                auth
                    ?<>
                        {privateRoutes.map (route =>
                            <Route key={uuidv4()} path={route.path} element={<route.element/>}/>
                        )}
                        <Route path="*" element={<Navigate to ="/" />}/>
                     </>
                    :<>
                        {publicRoutes.map (route =>
                            <Route key={uuidv4()} path={route.path} element={<route.element/>}/>
                        )}
                        <Route path="*" element={<Navigate to ="/login" />}/>
                     </>
            }
        </Routes>
    </>
  )
})

export default AppRouter