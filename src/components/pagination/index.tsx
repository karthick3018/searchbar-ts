import React from 'react';
import './index.css';

type TpaginationProps= {
  totalList: number,
  currentPage: number,
  namesPerPage: number,
  handlePaginationChange: (event:React.MouseEventHandler<HTMLLIElement>)=>void,
}

const Pagination = ({totalList,currentPage,namesPerPage,handlePaginationChange}:TpaginationProps) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalList/ namesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <>
    {pageNumbers?.length ?
      <div className="pagination-wrapper">
      { pageNumbers?.map((eachPageNumber:number)=>{
        return(
          <li
          key={eachPageNumber}
          id={eachPageNumber+''}
          onClick={(event:any)=>handlePaginationChange(event)}
          className="list-items"
          >
          {eachPageNumber}
          </li>
        )})}
    </div>:''}
    </>
  )
}

export default Pagination;