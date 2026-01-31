import React from 'react'

const ICNews = ({ className }: { className?: string }) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 30 30' className={className}>
      <path
        fill='#FFD11A'
        d='M17.356 20.65h-4.683V30h4.683v-9.35Zm0-20.65h-4.683v9.35h4.683V0Zm3.29 12.657v4.683h9.35v-4.683h-9.35ZM0 12.661v4.683h9.35v-4.683H0Z'
      />
      <path
        fill='#404040'
        d='m20.654 17.326-3.311 3.312 6.611 6.611 3.312-3.311-6.612-6.612ZM6.055 2.727 2.743 6.04l6.612 6.611 3.311-3.311-6.611-6.612Zm11.277 6.626 3.312 3.312 6.61-6.612-3.31-3.311-6.612 6.611ZM2.734 23.952l3.312 3.311 6.611-6.611-3.311-3.312-6.612 6.612Z'
      />
    </svg>
  )
}

export default ICNews
