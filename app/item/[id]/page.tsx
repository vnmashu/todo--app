import ItemComponent from '@/components/Item'
import React from 'react'

type Props = {
  params: {
    id: string
  }
}

const Item = ({ params }: Props) => {
  const { id } = params

  if (!id) return null

  return (
    <ItemComponent id={id} />
  )
}

export default Item