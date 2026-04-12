import { useCallback, useEffect, useState } from "react"

const useLocalStorage = (key: string, initialValue = '') => {
  const [value, setValue] = useState(() => localStorage.getItem(key) ?? initialValue)

  const setItem = (newValue: string) => {
    localStorage.setItem(key, newValue)
    setValue(newValue)
  }

  const handleStorage = useCallback((event: StorageEvent) => {
    if (event.key === key && event.storageArea === localStorage) {
      setValue(event.newValue || initialValue)
    }
  }, [key, initialValue])

  useEffect(() => {
    window.addEventListener('storage', handleStorage)

    return () => {
      window.removeEventListener('storage', handleStorage)
    }
  }, )

  return [value, setItem] as const
}

export default useLocalStorage