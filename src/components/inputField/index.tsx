import React,{useEffect,useReducer} from 'react';
import ListItems from '../listOfNames';
import InputBox from '../../ui/inputBox';
import {Data} from '../../common/data';
import {useDebounce} from '../../common/useDebounceHook';
import * as helper from '../../common/helper';

type Actions =
  | { type: 'SEARCH_RESULTS', updatedList: ListTypes[] }
  | { type: 'ADD_FAVORITE', updatedList: ListTypes[] }
  | { type: 'DELETE_NAME', updatedList: ListTypes[] }
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
    defaultFriendList : ListTypes[],
    searchValue : string
}

const initialState: IState = { 
  defaultFriendList: helper.sortTheNamesBasedOnFavorites(Data), 
  friendList: helper.sortTheNamesBasedOnFavorites(Data),
  searchValue:''
};

const reducer: React.Reducer<IState, Actions> = (state, action) => {
  switch (action.type) {
    case 'INSERT_NAME':
      const updatedListAfterAddingName = handleNewInsertion(state?.defaultFriendList, action?.name);
      return {
        ...state, 
        friendList: updatedListAfterAddingName, 
        defaultFriendList: updatedListAfterAddingName, 
        searchValue: '' 
      }

    case 'ON_INPUT_CHANGE':
      return {...state, searchValue: action?.value }

    case 'SEARCH_RESULTS':
      return { ...state, friendList: action?.updatedList };

    case 'ADD_FAVORITE':
      return { ...state, friendList: action?.updatedList ,defaultFriendList: action?.updatedList  };

    case 'DELETE_NAME':
      return { ...state, friendList: action?.updatedList ,defaultFriendList: action?.updatedList };

    case 'RESET':  
      return {...state, friendList: Data, searchValue:'' }

    default:
      throw new Error();
  }
}

const handleNewInsertion = (friendList:Array<ListTypes>,name:string) => {
   let updatedState = [...friendList];
   let newName = {
     name: name,
     isFavorite: false,
     id : friendList?.length + 1
   }
   updatedState.push(newName);
   return updatedState;
}

const handleNameSearch = (defaultFriendList:Array<ListTypes>,name:string) => {
  return defaultFriendList?.filter(eachFriend => eachFriend.name.toLowerCase().includes(name.toLowerCase()));
}


const InputField:React.FC= () => {

  const [state, dispatch] = useReducer<React.Reducer<IState, Actions>>(reducer, initialState);
  const debouncedValue: string = useDebounce(state?.searchValue, 300);

  useEffect(() => {
    if(debouncedValue){
     const filteredData = handleNameSearch(state?.defaultFriendList,debouncedValue);
     dispatch({ type: 'SEARCH_RESULTS', updatedList: filteredData })
    }
  }, [debouncedValue])


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

  const handleAddToFavorite = (index:number) => {
    let updatedList = helper.addNameToFavorite({friendList: state?.friendList,index});
    updatedList = helper.sortTheNamesBasedOnFavorites(updatedList);
    dispatch({ type: 'ADD_FAVORITE', updatedList })
  }

  const handleDelete = (id:number) => {
    let updatedList = helper.deleteName({friendList: state?.friendList,id})
    dispatch({ type: 'DELETE_NAME', updatedList })
  }

  return(
    <>
    <InputBox
     handleChange ={handleChange}
     handleOnKeyChange = {handleOnKeyChange}
     value ={state?.searchValue}
     placeholder="Enter your friend's name"
    />
    <ListItems
     friendList ={state?.friendList}
     handleAddToFavorite = {handleAddToFavorite}
     handleDelete ={handleDelete}
    />
    </>
  )
}

export default InputField;