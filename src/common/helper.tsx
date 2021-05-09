
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

export const addNameToFavorite = ({friendList,index}:TaddNameToFavorite) => {
  let updatedList = [...friendList];
  updatedList[index].isFavorite =  !updatedList[index].isFavorite;
  return updatedList;
}

export const deleteName = ({friendList,id}:TdeleteName) => {
  return friendList.filter(eachName=>eachName.id !== id);
}