'use client'
import React, { useEffect, useState } from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult
} from '@hello-pangea/dnd'
import Status from './Micro/Status'
import { demoData } from '@/lib/demoData'
import { generateRandomLightBGColor } from '@/lib/helper'
import { toast } from 'sonner'

type Props = {}

const Kanban = (props: Props) => {
  const [status, setStatus] = useState<KanbanType>()

  useEffect(() => {
    const localStatus = localStorage.getItem('status')
    if (localStatus) {
      if (Object.keys(JSON.parse(localStatus)).length === 0) {
        localStorage.setItem('status', JSON.stringify(demoData))
        setStatus(demoData)
      } else {
        setStatus(JSON.parse(localStatus))
      }
    } else {
      localStorage.setItem('status', JSON.stringify(demoData))
      setStatus(demoData)
    }


  }, [])

  const handleDragEnd = (result: DropResult) => {

    if (!result.destination || !result.source) return

    if (result.type === 'KANBAN') {
      const newStatus = Array.from(status as KanbanType)
      const [reorderedItem] = newStatus.splice(result.source.index, 1)
      newStatus.splice(result.destination.index, 0, reorderedItem)
      setStatus(newStatus)
      localStorage.setItem('status', JSON.stringify(newStatus))
      return
    }

    const {
      droppableId: sourceId,
      index: sourceIndex
    } = result.source

    const {
      droppableId: destinationId,
      index: destinationIndex
    } = result.destination

    const draggedItem = status?.find((item) => item.id === sourceId)?.items[sourceIndex]

    if (!draggedItem) return

    const newStatus = status?.map((item) => {
      if (item.id === sourceId) {
        item.items.splice(sourceIndex, 1)
      }
      if (item.id === destinationId) {
        item.items.splice(destinationIndex, 0, draggedItem)
      }
      return item
    })

    setStatus(newStatus)
    localStorage.setItem('status', JSON.stringify(newStatus))
  }

  const handleAddItem = (statusId: string, desc: string, title: string) => {
    const newStatus = status?.map((item) => {
      if (item.id === statusId) {
        item.items.push({
          title,
          description: desc,
          id: `${title.toLowerCase().split(' ').join('-')}-${new Date().getTime()}`
        })
      }
      return item
    })

    setStatus(newStatus)
    localStorage.setItem('status', JSON.stringify(newStatus))
  }

  const handleAddStatus = (title: string, triggerId: string) => {
    if (!status) return

    if (title.trim() === '') return

    if (!triggerId) return

    const indexOfTrigger = status?.findIndex((item) => item.id === triggerId)
    const newStatus = Array.from(status as KanbanType)
    const capitalzedTitle = title.trim().split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

    newStatus.splice(indexOfTrigger as number + 1, 0, {
      title: capitalzedTitle,
      items: [],
      color: generateRandomLightBGColor(),
      id: `${title.toLowerCase().split(' ').join('-')}-${new Date().getTime()}`
    })
    setStatus(newStatus)
    localStorage.setItem('status', JSON.stringify(newStatus))
  }

  const handleDeleteStatus = (id: string) => {
    if (!status) return

    if (status.length === 1) {
      toast.error('You cannot delete the last status')
      return
    }

    const newStatus = status?.filter((item) => item.id !== id)
    setStatus(newStatus)
    localStorage.setItem('status', JSON.stringify(newStatus))
  }

  return (
    <div className='w-full'>
      <DragDropContext
        key={'kanban'}
        onDragEnd={handleDragEnd}>
        <Droppable
          type='KANBAN'
          direction='horizontal'
          droppableId='kanban'>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className='w-full flex gap-[1rem]'>
              {
                status?.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id}
                    index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <Status
                          handleDeleteStatus={handleDeleteStatus}
                          handleAddItem={handleAddItem}
                          handleAddStatus={handleAddStatus}
                          draggableProps={provided} {...item} />
                      </div>
                    )}
                  </Draggable>
                ))
              }
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

    </div>
  )
}

export default Kanban