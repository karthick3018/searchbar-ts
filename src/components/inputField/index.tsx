import React,{useReducer} from 'react';
import ListItems from '../listOfNames';
import InputBox from '../../ui/inputBox';
import {Data} from '../../common/data';

type Actions =
  | { type: 'SEARCH_INITIATED', searchQuery: string }
  | { type: 'INSERT_NAME', name: string }
  | { type: 'ON_INPUT_CHANGE', value: string }
  | { type: 'RESET'}

interface ListTypes {
    id: number,
    isFavorite: boolean,
    name: string,
}
  
interface IState {
    friendList: ListTypes[],
    searchValue : string
}

const initialState: IState = { friendList: Data, searchValue:''};

const reducer: React.Reducer<IState, Actions> = (state, action) => {
  switch (action.type) {
    case 'SEARCH_INITIATED':
      return { ...state };
      
    case 'INSERT_NAME':
      const insertedValue = handleNewInsertion(state?.friendList,action.name);
      return {...state, friendList:insertedValue,searchValue:'' }

    case 'ON_INPUT_CHANGE':
       return {...state, searchValue:action.value }

    case 'RESET':  
    return {...state, friendList:Data,searchValue:'' }

    default:
      throw new Error();
  }
}

const handleNewInsertion = (friendList:Array<ListTypes>,name:string) => {
   let updatedState = [...friendList];
   let newName = {
     name: name,
     isFavorite: false,
     id : friendList?.length
   }
   updatedState.push(newName);
   return updatedState;
}


const InputField:React.FC= () => {
  const [state, dispatch] = useReducer<React.Reducer<IState, Actions>>(reducer, initialState);

  const handleOnKeyChange = (e:React.KeyboardEvent) => {
    if(e.key === "Enter"){
      e.preventDefault();
      dispatch({ type: 'INSERT_NAME', name: state?.searchValue })
    }
  }

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    if(e?.target?.value)
    dispatch({ type: 'ON_INPUT_CHANGE', value: e?.target?.value })
    else
    dispatch ({type:'RESET'})
  }

  return(
    <>
    <InputBox
     handleChange ={handleChange}
     handleOnKeyChange = {handleOnKeyChange}
     value ={state?.searchValue}
     placeholder="Enter your friend's  name"
    />
    <ListItems
     friendList ={state?.friendList}
    />
    </>
  )
}

export default InputField;