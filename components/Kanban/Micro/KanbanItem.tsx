'use client'

import React from 'react'
import { GripVertical, EditIcon } from 'lucide-react'
import { DraggableProvided } from '@hello-pangea/dnd'
import { useRouter } from 'next/navigation'

type Props = {}

const KanbanItem = (props: {
  title: string,
  draggableProps?: DraggableProvided,
  id: string
}) => {
  const router = useRouter()
  return (
    <div className='h-[7vh] border  justify-betweenw-full px-[5%] flex items-center shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-md bg-white'>
      <p className='w-full font-medium truncate text-black/70 text-start'>{
        props.title
      }</p>
      <div className='flex items-center gap-[1rem]'>
        <EditIcon
          onClick={() => router.push(`/item/${props.id}`)}
          className='cursor-pointer text-black/30' />
        <div {...props.draggableProps?.dragHandleProps}>
          <GripVertical
            className='text-black/30'
          />
        </div>
      </div>
    </div>
  )
}

export default KanbanItem