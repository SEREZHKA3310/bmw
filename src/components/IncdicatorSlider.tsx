import { useState, useMemo } from "react"
import { Text } from '@gravity-ui/uikit'

const Indicator = ({ indicator } ) => {
  const [value, setValue] = useState('1')
  const color = useMemo(() => {
    if (value === '1') {
      return 'red'
    }
    else if (value === '2') {
      return 'orange'
    }
    else if (value === '3') {
      return 'yellow'
    }
    else if (value === '4') {
      return 'lightgreen'
    }
    else if (value === '5') {
      return 'green'
    }
  }, [value])

  return (
      <Text variant='header-1' style={{display: "flex", padding: 15, justifyContent: "space-between", alignItems: "center"}}>
        <p style={{width: 400}}>{indicator.name}</p>
        {<input type="range" min={1} max={5} step={1} value={value} style={{accentColor: color, width: 500 }} onChange={(ev) => setValue(ev.currentTarget.value)}/>}
        {<input type="number" min={1} max={5} step={1} value={value} style={{width: 60, height: 60, borderRadius: 12, border: '1px solid black', textAlign: "center", fontSize: 16 }} onChange={(ev) => setValue(ev.currentTarget.value)}/>}
      </Text>
  )
}


export default Indicator