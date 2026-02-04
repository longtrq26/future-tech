import React from 'react'
import FooterCTA from './cta'
import FooterLegal from './legal'
import FooterNav from './nav'

const Footer = () => {
  return (
    <footer className='flex w-full flex-col'>
      <FooterCTA />
      <FooterNav />
      <FooterLegal />
    </footer>
  )
}

export default Footer
