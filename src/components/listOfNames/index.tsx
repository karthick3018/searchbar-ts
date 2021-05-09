import React from 'react';

interface ListTypes {
  id: number,
  isFavorite: boolean,
  name: string,
}

type TListItem = {
  friendList : ListTypes[],
  handleAddToFavorite: (index:number) => void,
  handleDelete : (id:number) => void
}


const ListItems = ({friendList,handleAddToFavorite,handleDelete}:TListItem) => {
  return (
    <>
    {friendList?.map(((eachFriend,index)=>(
      <p key={eachFriend?.id}>{eachFriend?.name} <span onClick={()=>handleAddToFavorite(index)}>F</span> <span onClick={()=>handleDelete(eachFriend?.id)}>D</span></p>
    )))} 
    {friendList?.length === 0 && <p>No Such friend found ! Press 'Enter' to add in the list</p>}
    </>
  )
}

export default ListItems;
