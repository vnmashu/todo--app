'use client'

import React, { useEffect, useState } from 'react'
import { toast } from "sonner"
import Select from 'react-select'
import { useRouter } from 'next/navigation'


type Props = {
  id: string
}

const ItemComponent = ({ id }: Props) => {
  const [item, setItem] = useState<Item | null>(null)
  const [status, setStatus] = useState<Status[]>([])
  const router = useRouter()

  useEffect(() => {
    const status = localStorage.getItem('status')

    if (!status) return

    const parsedStatus: KanbanType = JSON.parse(status)
    let statusArray: Status[] = []

    parsedStatus.forEach((status) => {

      let statusObj: Status = {
        title: status.title,
        id: status.id,
        selected: false,
      }
      status.items.forEach((item) => {
        if (item.id === id) {
          setItem(item)
          statusObj.selected = true
        }
      })

      statusArray.push(statusObj)
    })

    setStatus(statusArray)

  }, [id])

  const selectedStatus = status.find((status) => status.selected)

  const handleSelectChange = (value: string) => {

    // Get the status from local storage
    const localStatus = localStorage.getItem('status')

    // If status is not found, return
    if (!localStatus) return toast.error('Status not found')

    // Parse the status
    const parsedStatus: KanbanType = JSON.parse(localStatus)

    // Find the from status
    const fromStatus = parsedStatus.find((status) => status.id === selectedStatus?.id)

    // Find the to status
    const toStatus = parsedStatus.find((status) => status.id === value)

    // If from or to status is not found, return
    if (!fromStatus || !toStatus) return toast.error('Status not found')

    // Find the item index
    const itemIndex = fromStatus.items.findIndex((item) => item.id === id)

    // If item is not found, return
    if (itemIndex === -1) return toast.error('Item not found')

    // Get the item
    const item = fromStatus.items[itemIndex]

    // Remove the item from from status
    fromStatus.items.splice(itemIndex, 1)

    // Add the item to to status
    toStatus.items.push(item)

    // Set the status to local storage
    localStorage.setItem('status', JSON.stringify(parsedStatus))

    // Update the status state
    const newStatus = status.map((status) => {
      if (status.id === fromStatus.id) {
        status.selected = false
      }
      if (status.id === toStatus.id) {
        status.selected = true
      }
      return status
    })

    setStatus(newStatus)

    toast.success('Item moved successfully')
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()

    if (!item) return toast.error('Item not found')

    const localStatus = localStorage.getItem('status')

    if (!localStatus) return toast.error('Status not found')

    const parsedStatus: KanbanType = JSON.parse(localStatus)

    const itemStatus = parsedStatus.find((status) => status.id === selectedStatus?.id)

    if (!itemStatus) return toast.error('Status not found')

    const itemIndex = itemStatus.items.findIndex((item) => item.id === id)

    if (itemIndex === -1) return toast.error('Item not found')

    itemStatus.items[itemIndex] = item

    localStorage.setItem('status', JSON.stringify(parsedStatus))

    toast.success('Item updated successfully')

    router.push('/')
  }

  const handleDelete = () => {
    if (!item) return toast.error('Item not found')

    const localStatus = localStorage.getItem('status')

    if (!localStatus) return toast.error('Status not found')

    const parsedStatus: KanbanType = JSON.parse(localStatus)

    const itemStatus = parsedStatus.find((status) => status.id === selectedStatus?.id)

    if (!itemStatus) return toast.error('Status not found')

    const itemIndex = itemStatus.items.findIndex((item) => item.id === id)

    if (itemIndex === -1) return toast.error('Item not found')

    itemStatus.items.splice(itemIndex, 1)

    localStorage.setItem('status', JSON.stringify(parsedStatus))

    toast.success('Item deleted successfully')

    router.push('/')
  }

  return (
    <div className='w-full min-h-[100vh] flex flex-col gap-[1rem] items-center justify-center'>
      <h2 className='text-2xl font-medium text-black/70'>Item Detail</h2>
      {
        item ? (
          <form onSubmit={handleSave} className='w-[29vw] h-fit bg-white p-[1rem] rounded-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'>
            <label
              htmlFor='title'
              className='font-medium text-black/70'>Title</label>
            <input
              name='title'
              className='w-full border border-black/30 focus:outline-none rounded-md px-[1rem] py-[0.5rem]  mb-[1rem]'
              type='text'
              value={item.title}
              onChange={(e) => {
                setItem({ ...item, title: e.target.value })
              }}
            />
            <label
              htmlFor='description'
              className='font-medium text-black/70'>Description</label>
            <textarea
              name='description'
              className='w-full min-h-[10rem] border border-black/30 focus:outline-none rounded-md px-[1rem] py-[0.5rem]  mb-[1rem]'
              value={item.description}
              onChange={(e) => {
                setItem({ ...item, description: e.target.value })
              }}
            />

            <label
              htmlFor='status'
              className='font-medium text-black/70'>Status</label>
            <Select
              styles={{
                control: (styles) => ({
                  ...styles,
                  borderColor: 'rgba(0, 0, 0, 0.3)',
                  boxShadow: 'none',
                  '&:hover': { borderColor: 'rgba(0, 0, 0, 0.3)' }
                })
              }}
              value={{
                label: selectedStatus?.title,
                value: selectedStatus?.id
              }}
              onChange={(option) => {
                if (typeof option?.value === 'string') {
                  handleSelectChange(option.value)
                }
              }}
              options={status.map((status) => ({
                label: status.title,
                value: status.id
              }))}
            />
            <div className='w-full gap-[1rem] flex items-center justify-center'>
              <button
                type='submit'
                className='w-[50%] mt-[1rem] h-[3rem] bg-primary rounded-md text-white font-medium'
              >
                Save
              </button>
              <button
                onClick={handleDelete}
                type='button'
                className='w-[50%] mt-[1rem] h-[3rem] bg-red-500 rounded-md text-white font-medium'
              >
                Delete
              </button>
            </div>
          </form>
        ) : (
          <p>
            Item not found
          </p>
        )
      }
    </div>
  )
}

export default ItemComponent