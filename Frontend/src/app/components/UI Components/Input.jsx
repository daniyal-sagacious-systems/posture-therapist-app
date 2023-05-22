import React from 'react'
import TextField from '@mui/material/TextField';


const Input = (props) => {
  return (
    <>
     <TextField fullWidth id="outlined-basic" label={props.label} variant="outlined" sx={props.sx}
     value={props.value} onChange={props.onChange} name={props.name} type={props.type} size="small"/>
    </>

  )
}

export default Input