import React from 'react';
import './index.css';
import TrashIcon from './trash.svg';
import StarIcon from './star.svg'
import SelectedStar from './selectedStar.svg'

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
    <div className="list-wrapper">
    {friendList?.map(((eachFriend)=>(
      <div className="flex-wrapper list" key={eachFriend?.id}>
        <div>
          <p className="name-text">{eachFriend?.name} </p>
          <span className="friend-text">is your friend </span>
        </div>
       <div className="flex-wrapper">
        <span onClick={()=>handleAddToFavorite(eachFriend?.id)}>
        <figure className={`icon-figure ${eachFriend?.isFavorite ? 'favorite':''}`}>
            <img src={eachFriend?.isFavorite?SelectedStar:StarIcon} alt="favorite" />
          </figure>
        </span>
        <span onClick={()=>handleDelete(eachFriend?.id)}>
          <figure className="icon-figure">
            <img src={TrashIcon} alt="trash"/>
          </figure>
        </span>  
      </div> 
      </div>
    )))} 
    {friendList?.length === 0 && <p className="not-found">No Such friend found ! Press 'Enter' to add in the list</p>}
    </div>
  )
}

export default ListItems;
