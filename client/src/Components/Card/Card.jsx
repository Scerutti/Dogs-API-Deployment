import React from 'react'
import {Link} from "react-router-dom"
import perrito from  "../../img/fondodetail.jpeg"
import s from "./Card.module.css"
import { getDetail} from "../../Redux/Actions/index"
import{useDispatch} from "react-redux"



function Card({name, image,temperament, temperaments, minWeight, maxWeight, minHeight, maxHeight, id}){
    const dispatch = useDispatch()
    return (
        <Link  className={s.link} to={'/dogs/' + id} onClick={ ()=> dispatch(getDetail(id)) } >
            <div className={s.card} >
                <h1 className={s.nombre}>  {name} </h1>
                <img className={s.img}  src= {image}  onError={e => {e.target.src=perrito;}} alt= "img not found" width="400px" height="250px" />         
                <h5  className={s.temperament}  >Temperament:<br/> {temperaments}{Array.isArray(temperament)? temperament.join(', ' ) : temperament}</h5>             
                <h5 className={s.weight} >Min Height: {minHeight} cm - Max Height: {maxHeight} cm</h5>
                <h5 className={s.weight}>Min Weight: {minWeight} kg - Max Weight: {maxWeight} kg</h5>
            </div>
        </Link>   
    )
}
export default Card
