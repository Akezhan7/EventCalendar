import React, { DetailedHTMLProps, HTMLAttributes } from 'react'
import style from './Footer.module.scss';
import cn from 'classnames';

interface FooterProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Footer = ({...props}:FooterProps):JSX.Element => {
  return (
      <div {...props}>
        Footer
      </div>
  )
}