import React from "react";
import s from "./Paginado.module.css"

/*
dogsPerPage--> 8
alldogs --> son todos los perros
paginado --> pageNumber => setCurrentPage(pageNumber)
*/

export default function Paginado ({dogsPerPage, allDogs, paginado, paginadoPrev,paginadoNext, currentPage}) {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(allDogs/dogsPerPage); i++){
        pageNumbers.push(i)
    }
    return (
        <nav>
            <div className = {s.pagination}>
                <div className={s.number} onClick={paginadoPrev} >«</div>
                {pageNumbers?.map(number => (
                    
                        <div className={ currentPage === number ? s.pageActual : s.number} onClick = {() => paginado(number)}>
                            {number}
                        </div>
                    
                ))} 
                <div className={s.number} onClick={paginadoNext} >»</div>
            </div>
        </nav>
    ) 
}