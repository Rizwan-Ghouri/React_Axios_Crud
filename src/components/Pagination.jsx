import React from 'react'

const Pagination = ({ totalPost, postsPerPage, currentPage, setCurrentPage }) => {
    let pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPost/postsPerPage); i++) {
        pageNumbers.push(i);
    }
  return (
    <div>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className={currentPage === number ? "active" : ""}>
            <button onClick={() => setCurrentPage(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Pagination
