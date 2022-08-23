import React, { DetailedHTMLProps, FunctionComponent, HTMLAttributes, ReactNode } from 'react';
import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';
import style from './Layout.module.scss';

interface LayoutProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children: ReactNode;
}

export const Layout = ({children}:LayoutProps):JSX.Element => {
  return (
    <div className={style.wrapper}>
        <Header className={style.header}/>
        <div className={style.body}>
            {children}
        </div>
        <Footer className={style.footer}/>
    </div>
  )
}

export function withLayout <T extends Record<string, unknown>>(Component: FunctionComponent<T>) {
    return function withLayoutComponent (props: T):JSX.Element {
      return (
            <Layout>
                <Component {...props}/>
            </Layout>
      )
    }
}