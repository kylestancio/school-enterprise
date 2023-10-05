'use client'

import React, { useEffect } from 'react'
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { Room } from '@prisma/client'
import { type UseFormReturn } from 'react-hook-form'


export default function RoomCombobox({
  rooms,
  selectedValue,
  form
}:{
  rooms?: Room[]
  selectedValue: string,
  form: UseFormReturn<Room|any|undefined>
}) {

  const dataset = rooms ? rooms.map((room)=>{
    return {
      label: room.code,
      value: room.id, 
    }
  }) : []

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  useEffect(()=>{
    setValue(selectedValue)
  },[selectedValue])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          { value
            ? dataset.find((data) => data.value === value)?.label
            : "Select room"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search" />
          <CommandEmpty>No room found.</CommandEmpty>
          <CommandGroup>
            {dataset.map((data) => (
              <CommandItem
                key={data.value}
                value={data.value}
                onSelect={(currentValue) => {
                  if (currentValue === value){
                    setValue("")
                    form.setValue("room", null)
                  }else{
                    setValue(currentValue)
                    form.setValue("room", currentValue)
                  }
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === data.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {data.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
