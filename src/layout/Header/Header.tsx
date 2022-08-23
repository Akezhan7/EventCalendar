import React, { DetailedHTMLProps, HTMLAttributes, useContext } from 'react'
import style from './Header.module.scss';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import User from './user.png';
import { StoreContext } from '../../store.context';
import { observer } from 'mobx-react-lite'

interface HeaderProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Header = observer (({...props}:HeaderProps):JSX.Element => {
  const router = useNavigate ();
  const {authStore} = useContext (StoreContext);
  const auth = authStore.isAuth();
  return (
      <div {...props}>
        <div className={style.wrapper}>
          <div className={style.logo}>LOGO</div>
          <div className={style.nav}>NavList</div>
          <div className={style.info}>
            {auth
              ? <>
                  <div className={style.user}><img src={User} alt="user" /><span>{authStore.user.username}</span></div>
                  <div className={style.exit} onClick={() => authStore.logout()}>
                    <span>Выйти</span>
                  </div>
                </>
              : <>
                  <div className={style.exit} onClick={() => router('/login')}>
                    <span>Войти</span>
                  </div>
                </>
            }
          </div>
        </div>
      </div>
  )
})