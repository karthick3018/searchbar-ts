import React,{useEffect,useReducer} from 'react';
import ListItems from '../listOfNames';
import Pagination from '../pagination';
import InputBox from '../../ui/inputBox';
import {Data} from '../../common/data';
import {useDebounce} from '../../common/useDebounceHook';
import * as helper from '../../common/helper';
import './index.css';

type Actions =
  | { type: 'SEARCH_RESULTS', updatedList: ListTypes[] }
  | { type: 'ADD_FAVORITE', updatedList: ListTypes[] }
  | { type: 'DELETE_NAME', updatedList: ListTypes[] }
  | { type: 'INSERT_NAME', name: string }
  | { type: 'ON_INPUT_CHANGE', value: string }
  | { type: 'ON_PAGE_CHANGE', page: number }
  | { type: 'RESET'}

interface ListTypes {
    id: number,
    isFavorite: boolean,
    name: string,
}
  
interface IState {
    friendList: ListTypes[],
    defaultFriendList : ListTypes[],
    searchValue : string,
    currentPage: number,
    namesPerPage : number
}

const initialState: IState = { 
  defaultFriendList: helper.sortTheNamesBasedOnFavorites(Data), 
  friendList: helper.sortTheNamesBasedOnFavorites(Data),
  searchValue:'',
  currentPage: 1,
  namesPerPage: 4
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
      return { ...state, friendList: action?.updatedList,currentPage:1 };

    case 'ADD_FAVORITE':
      return { ...state, friendList: action?.updatedList ,defaultFriendList: action?.updatedList  };

    case 'DELETE_NAME':
      return { ...state, friendList: action?.updatedList ,defaultFriendList: action?.updatedList };

    case 'ON_PAGE_CHANGE':
      return { ...state, currentPage: action.page };

    case 'RESET':  
      return {...state, friendList: state?.defaultFriendList, searchValue:'',currentPage: 1, namesPerPage: 4 }

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
     let filteredData = handleNameSearch(state?.defaultFriendList,debouncedValue);
     filteredData = helper.sortTheNamesBasedOnFavorites(filteredData);
     dispatch({ type: 'SEARCH_RESULTS', updatedList: filteredData })
    }
  }, [debouncedValue])


  const handleOnKeyChange = (e:React.KeyboardEvent) => {
    if(e.key === "Enter" && state?.searchValue){
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

  const handleAddToFavorite = (id:number) => {
    let updatedList = helper.addNameToFavorite({friendList: state?.friendList,id});
    dispatch({ type: 'ADD_FAVORITE', updatedList })
  }

  const handleDelete = (id:number) => {
    let updatedList = helper.deleteName({friendList: state?.friendList,id})
    dispatch({ type: 'DELETE_NAME', updatedList })
  }

  const handlePaginationChange = (event:any) => {
    dispatch({ type: 'ON_PAGE_CHANGE', page: +event?.target?.id })
  }

  return(
    <>
    <div className="input-box-wrapper">
     <InputBox
       handleChange ={handleChange}
       handleOnKeyChange = {handleOnKeyChange}
       value ={state?.searchValue}
       placeholder="Enter your friend's name"
     />
    </div>
    <ListItems
     friendList ={helper?.paginationLogic(state?.friendList,state?.currentPage,state?.namesPerPage)}
     handleAddToFavorite = {handleAddToFavorite}
     handleDelete ={handleDelete}
    />
    <Pagination 
     totalList = {state?.friendList?.length}
     currentPage = {state?.currentPage}
     namesPerPage ={state?.namesPerPage}
     handlePaginationChange = {handlePaginationChange}
    />
    </>
  )
}

export default InputField;