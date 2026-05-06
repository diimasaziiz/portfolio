'use client'

import dynamic from 'next/dynamic'

const BaseMDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
})

export default BaseMDEditor
