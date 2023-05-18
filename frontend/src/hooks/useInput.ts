import { useState, ChangeEvent } from 'react'

type TypeElements = HTMLInputElement | HTMLTextAreaElement

const useInput = <T extends TypeElements>(initialValue: string) => {
  const [value, setValue] = useState<string>(initialValue)

  const handleChange = (event: ChangeEvent<T>) => {
    setValue(event.target.value)
  }

  return [value, handleChange, setValue] as const
}

export { useInput }
