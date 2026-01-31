import React from 'react'

const ICContributors = ({ className }: { className?: string }) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' className={className}>
      <path fill='#FFD11A' d='M12 18a6 6 0 1 0 6-6h-6v6Zm0-12a6 6 0 1 0-6 6h6V6Z' />
      <path
        fill='#404040'
        fillRule='evenodd'
        d='M18 0a6 6 0 0 0-6 6v6h6a6 6 0 0 0 0-12Zm3 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6 24a6 6 0 0 0 6-6v-6H6a6 6 0 0 0 0 12Zm3-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
        clipRule='evenodd'
      />
    </svg>
  )
}

export default ICContributors
