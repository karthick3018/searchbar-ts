
interface ListTypes {
  id: number,
  isFavorite: boolean,
  name: string,
}

type TupdateProps = {
  friendList : ListTypes[],
  id: number
}


export const sortTheNamesBasedOnFavorites = (friendList:Array<ListTypes>) => {
 let sortedValues =  friendList?.sort((name1:ListTypes, name2:ListTypes)=> {
    return (name1?.isFavorite === name2?.isFavorite)? 0 : name1?.isFavorite? -1 : 1;
});
return sortedValues;
}

export const paginationLogic = (friendList:Array<ListTypes>,currentPage:number,namesPerPage:number) => {
  const indexOfLastName = currentPage * namesPerPage;
  const indexOfFirstName = indexOfLastName - namesPerPage;
  const currentNames = friendList?.slice(indexOfFirstName, indexOfLastName);
  return currentNames
}

export const addNameToFavorite = ({friendList,id}:TupdateProps) => {
  let updatedList = [...friendList];
  let index = updatedList.findIndex(eachItem => eachItem.id === id);
  updatedList[index].isFavorite =  !updatedList[index].isFavorite;
  return updatedList

}

export const deleteName = ({friendList,id}:TupdateProps) => {
  return friendList.filter(eachName=>eachName.id !== id);
}