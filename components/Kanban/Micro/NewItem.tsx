'use client'

import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

type Props = {
  handleAddItem: (desc: string, title: string) => void
}

const NewItem = ({ handleAddItem }: Props) => {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState({
    title: '',
    description: '',
  })
  return (
    <Sheet
      onOpenChange={(open) => {
        setOpen(open)
      }}
      open={open}>
      <button onClick={() => {
        setOpen(true)
      }} className='w-full flex gap-[0.7vw] items-center'>
        <Plus className='text-black/30' />
        <p className='text-black/30'>New</p>
      </button>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add New Item</SheetTitle>
          <SheetDescription>
            Add a new item to your kanban board
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={e => {
          e.preventDefault()
          handleAddItem(data.description, data.title)
          setData({
            title: '',
            description: '',
          })
          setOpen(false)
        }} className='flex flex-col gap-[1rem]'>
          <input
            value={data.title}
            autoComplete='off'
            onChange={(e) => setData({ ...data, title: e.target.value })}
            className='w-full focus:outline-none mt-[1rem] h-[3rem] border rounded-md px-[1rem] text-black/70'
            placeholder='Title'
          />
          <textarea
            value={data.description}
            autoComplete='off'
            onChange={(e) => setData({ ...data, description: e.target.value })}
            className='w-full focus:outline-none border rounded-md p-[1rem] text-black/70'
            placeholder='Description'
          />
          <button
            type='submit'
            className='w-full h-[3rem] bg-primary rounded-md text-white font-medium'
          >
            Add
          </button>
        </form>
      </SheetContent>
    </Sheet>

  )
}


export default NewItem