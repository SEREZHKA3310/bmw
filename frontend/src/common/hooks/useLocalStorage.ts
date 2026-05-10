import { useEffect, useState } from "react"

const useLocalStorage = (key: string, initialValue = '') => {
  const [value, setValue] = useState(() => localStorage.getItem(key) ?? initialValue)

  const setItem = (newValue: string) => {
    localStorage.setItem(key, newValue)
    setValue(newValue)
  }

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === key && event.storageArea === localStorage) {
        setValue(event.newValue || initialValue)
      }
    }

    window.addEventListener('storage', handleStorage)

    return () => {
      window.removeEventListener('storage', handleStorage)
    }
  }, [key, initialValue])

  return [value, setItem] as const
}

export default useLocalStorage