// import React from 'react'
// import "./pagination.css"

// const Pagination = ({postPerPage, totalPost, paginate, currentPage}) => {
//     const pageNumber = []

//     for (let i = 1; i <= Math.ceil(totalPost/ postPerPage); i++) {
//         pageNumber.push(i)
//     }
//     return (
//         <nav style={{marginTop: '3%', paddingLeft: '3%'}}>
//             <ul className="pagination"> 
//             <a className={currentPage === 1 ? "disabled " : "page-link pg-link" } onClick={() => paginate(currentPage - 1)} >Prev</a>
//                 {
//                     pageNumber.map(num => (
//                         <li className="page-item">
                           
//                             <a onClick={() => paginate(num)} className={currentPage === num ?'pactive page-link' : 'page-link'} style={{cursor: 'pointer'}}>
//                                 {num}
//                             </a>
                           
//                         </li>
//                     ))
//                 } 
//                 <a className={currentPage < 2 ? "disabled" : "page-link pg-link"} onClick={() => paginate(currentPage + 1)}>Next</a>
//             </ul>
//         </nav>
//     )
// }

// export default Pagination
