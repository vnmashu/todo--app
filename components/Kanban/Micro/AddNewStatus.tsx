'use client'

import React, { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Plus } from 'lucide-react'

type Props = {
  handleAddStatus: (title: string) => void
}

const AddNewStatus = (props: Props) => {
  const [title, setTitle] = useState('')
  const [open, setOpen] = useState(false)
  return (
    <Sheet
      onOpenChange={(open) => {
        setOpen(open)
      }}
      open={open}>

      <Plus onClick={() => {
        setOpen(true)
      }} className='cursor-pointer text-black/30' />

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add New Status</SheetTitle>
          <SheetDescription>
            Add a new status to your kanban board
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={e => {
          e.preventDefault()
          props.handleAddStatus(title)
          setOpen(false)

        }} className='flex flex-col gap-[1rem]'>
          <input
            value={title}
            autoComplete='off'
            onChange={(e) => setTitle(e.target.value)}
            className='w-full focus:outline-none mt-[1rem] h-[3rem] border rounded-md px-[1rem] text-black/70'
            placeholder='Title'
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

export default AddNewStatus