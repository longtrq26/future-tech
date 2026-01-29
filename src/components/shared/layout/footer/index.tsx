import React from 'react'
import FooterLegal from './legal'
import FooterNav from './nav'

const Footer = () => {
  return (
    <footer className='container flex w-full flex-col border-t border-dark-15'>
      <FooterNav />
      <FooterLegal />
    </footer>
  )
}

export default Footer
