import React from "react";
import s from "./Paginado.module.css"

/*
dogsPerPage--> 8
alldogs --> son todos los perros
paginado --> pageNumber => setCurrentPage(pageNumber)
*/

export default function Paginado ({dogsPerPage, allDogs, paginado, paginadoPrev,paginadoNext}) {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(allDogs/dogsPerPage); i++){
        pageNumbers.push(i)
    }
    return (
        <nav>
            <ul className = {s.pagination}>
                <li className={s.prevnext} onClick={paginadoPrev} >«</li>
                {pageNumbers?.map(number => (
                    <li key={number}>
                        <div className={s.number} onClick = {() => paginado(number)}>
                            {number}
                        </div>
                    </li>
                ))} 
                <li className={s.prevnext} onClick={paginadoNext} >»</li>
                </ul>
        </nav>
    ) 
}