import React from 'react';

interface ListTypes {
  id: number,
  isFavorite: boolean,
  name: string,
}

type TListItem = {
  friendList : ListTypes[]
}

const ListItems = ({friendList}:TListItem) => {
  return (
    <>
    {friendList?.map((eachFriend=>(
      <p key={eachFriend?.id}>{eachFriend?.name}</p>
    )))} 
    </>
  )
}

export default ListItems;
