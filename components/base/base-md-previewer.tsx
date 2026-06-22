'use client'

import MDEditor from '@uiw/react-md-editor'

/**
 * SETUP LOCAL INTERFACE
 */
interface Props {
  source: string
}

export default function BaseMDPreviewer({ source }: Props) {
  return (
    <MDEditor.Markdown
      source={source}
      style={{
        backgroundColor: 'transparent',
        whiteSpace: 'pre-wrap',
        color: 'inherit',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'inherit',
      }}
    />
  )
}
