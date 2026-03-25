interface FieldProps {
  type: string
}

const Field = ({type}: FieldProps) => {
  return (
    <input type={type} />
  )
}

export default Field