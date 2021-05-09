
interface ListTypes {
  id: number,
  isFavorite: boolean,
  name: string,
}

type TaddNameToFavorite = {
  friendList : ListTypes[],
  index: number
}

type TdeleteName= {
  friendList : ListTypes[],
  id: number
}

export const sortTheNamesBasedOnFavorites = (friendList:Array<ListTypes>) => {
 let sortedValues =  friendList?.sort((name1:ListTypes, name2:ListTypes)=> {
    return (name1?.isFavorite === name2?.isFavorite)? 0 : name1?.isFavorite? -1 : 1;
});
return sortedValues;
}

export const addNameToFavorite = ({friendList,index}:TaddNameToFavorite) => {
  let updatedList = [...friendList];
  updatedList[index].isFavorite =  !updatedList[index].isFavorite;
  return updatedList;
}

export const deleteName = ({friendList,id}:TdeleteName) => {
  return friendList.filter(eachName=>eachName.id !== id);
}