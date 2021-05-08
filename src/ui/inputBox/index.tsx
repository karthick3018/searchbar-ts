import React from "react";

type TInputProps = {
  handleOnKeyChange: (e:React.KeyboardEvent)=>void,
  handleChange: (e:React.ChangeEvent<HTMLInputElement>)=>void,
  value: string,
  placeholder: string
}

const InputBox = ({handleOnKeyChange,value,placeholder,handleChange}:TInputProps) => {
  return(
  <input
    onKeyUp={handleOnKeyChange}
    onChange={handleChange}
    value={value}
    placeholder={placeholder}
    autoFocus={true}
    autoCorrect="false"
  />
  )
  
}

export default InputBox;