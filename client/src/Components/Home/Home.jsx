import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { getAllDogs, getTemperaments, filterByTemperaments, filterCreated, orderByName, orderByWeight } from '../../Redux/Actions';
import Paginado from '../Paginado/Paginado.jsx';
import Card from '../Card/Card.jsx'
import SearchBar from '../SearchBar/SearchBar.jsx';
import s from "./Home.module.css"
import carga from "../../img/loading-11.gif"




function Home() {

    const dispatch = useDispatch()
    const allDogs = useSelector((state) => state.dogs)

    //paginado
    const [currentPage, setCurrentPage] = useState(1)
    const dogsPerPage = 8
    const numbersOfLastDog = currentPage * dogsPerPage//1  * 8 = 8
    const numberOfFirtsDog = numbersOfLastDog - dogsPerPage// 8 - 8 = 0
    const currentDog = allDogs.slice(numberOfFirtsDog, numbersOfLastDog)
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
      
    }
    /*
                        dogsPerPage={dogsPerPage}
                        allDogs={allDogs.length}
                        paginado={paginado}
    */
    
    useEffect(() => {
        dispatch(getAllDogs())
        dispatch(filterByTemperaments())
        dispatch(getTemperaments())
    }, [dispatch])

    
    const temperaments = useSelector((state) => state.temperaments)
    const [temperament, setTemperament] = useState("All")

    function handleClick(e) {
        e.preventDefault();
        dispatch(getAllDogs());
        setBreeds('all');
        setOrdenPorPeso("");
        setOrden("");
        setTemperament("All")
        setCurrentPage(1)

    }

    function handleSelect(e) {
        e.preventDefault()
        dispatch(filterByTemperaments(e.target.value))
        setTemperament(e.target.value)
        setCurrentPage(1)
    }


    
    const [totalTodos, setBreeds] = useState('all')
    function handleFilterCreated(e) {
        e.preventDefault()
        dispatch(filterCreated(e.target.value))
        setBreeds(e.target.value)
        setCurrentPage(1)

    }


   
    const [ ordenNormal , setOrden] = useState('')
    function handleSort(e) {
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(e.target.value)
        setOrdenPorPeso("")
    }


    //ordenPorPeso -> guardar el valor seleccionado
    const [ ordenPorPeso , setOrdenPorPeso ] = useState('')
    function handleSortWeight(e) {
        e.preventDefault()
        dispatch(orderByWeight(e.target.value))
        setCurrentPage(1)
        setOrdenPorPeso(e.target.value)
        setOrden("")
    }

    function paginadoPrev(){
        if (currentPage>1)setCurrentPage(currentPage -1)
    }

    function paginadoNext(){
        let lastPage = Math.ceil(allDogs.length / dogsPerPage)
        if(currentPage < lastPage) setCurrentPage(currentPage +1)
    }

    return (
        <div className={s.fondo}>
            <div className={s.nav}>
                <button className={s.botonreload} onClick={e => handleClick(e)}> Reload dogs </button>
                <SearchBar />

            </div>

            <div className={s.h1} >
                <Link  className={s.link}  to='/dogs/create'> <h2> Create a breed </h2> </Link>
            </div>
            <div>

                <br />

                <div>
                    <span className={s.textofiltro} > Filter by weight  </span>

                    <select value={ordenPorPeso} className={s.textofiltroselect} onChange={e => handleSortWeight(e)}>
                        <option value=""> ----- </option>
                        <option value="asc"> Lightest </option>
                        <option value="desc"> Heaviest</option>
                    </select>

                    <span className={s.textofiltro} > Filter by order </span>
                    <select value={ordenNormal} className={s.textofiltroselect}  onChange={e => handleSort(e)}>
                        <option value=""> --- </option>
                        <option value="az"> A-Z</option>
                        <option value="za"> Z-A </option>
                    </select>


                    <span className={s.textofiltro} > Filter by breed </span>

                    <select value={totalTodos} className={s.textofiltroselect} onChange={e => handleFilterCreated(e)}>
                        <option value="all">All</option>
                        <option value="created">Created</option>
                        <option value="api"> Existentes</option>
                    </select>


                    <span className={s.textofiltro}> Filter by temperament </span>
                    <select  className={s.textofiltroselect}  value={temperament} onChange={(e) => handleSelect(e)}>
                        <option value="All"> All </option>
                        {temperaments.map((temp, index) => (
                            <option onClick={(e) => handleClick(e)} key={index}>
                                {temp.name}
                            </option>
                        ))}

                    </select>

                </div> 
                <br/>

                <div style={{display:"flex",flexWrap:"wrap"}}>
                {currentDog.length === 0 ? <img className={s.imagen} alt= {"Loading"} src={carga}/>: 

                        currentDog?.map((el,index) => {
                            //console.log(el)
                            return (
                                        <Card
                                            key={index}
                                            id={el.id}
                                            name={el.name}
                                            image={el.image ? el.image : el.image}
                                            maxWeight={el.maxWeight}
                                            minWeight={el.minWeight}
                                            minHeight={el.minHeight}
                                            maxHeight={el.maxHeight}
                                            temperament={el.temperament}
                                            temperaments={el.temperaments?.map((t) => t.name).join(', ')}
                                        />
                            )
                        })
                        }
                </div>
                
                    <div className={s.pag} >
                    <Paginado
                        dogsPerPage={dogsPerPage}
                        allDogs={allDogs.length}
                        paginado={paginado}
                        paginadoPrev={paginadoPrev}
                        paginadoNext={paginadoNext}
                    />
                </div>

            </div>
        </div>
    )
}

export default Home
