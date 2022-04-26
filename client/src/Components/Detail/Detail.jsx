import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../Redux/Actions";
import { useEffect } from "react";
import { useParams } from "react-router";
import s from "./Detail.module.css";
import perrito from  "../../img/fondodetail.jpeg"
import carga from "../../img/loading-11.gif"



export default function Detail(props) {
    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(() => {
        dispatch(getDetail(id));
    },[dispatch,id]) //eslint-disable-line

    const detailDog = useSelector((state) => state.detail)
    //console.log(detailDog)
    
    // if(detailDog.length && detailDog[0].createdInDataBase){
    //     detailDog[0].temperament = detailDog[0].temperament ? detailDog[0].temperament : ""
    // }

    return (
        <div className={s.fondo} >
            <div className={s.fullcontainer}>
                {      
                    detailDog.length === 0 ? <img src={carga} alt={"Loading"} /> :
                        detailDog.length > 0 &&
                        <div className={s.container}>
                            <h2>  {detailDog[0].name}</h2>
                            <img className={s.image}src={detailDog[0].image} onError={e => {e.target.src=perrito;}}  alt='img not found' width="400px" height="250px" />
                            <h2 className={s.temperament}>Temperaments:</h2><p className={s.descriptions}>{detailDog[0].createdInDataBase? detailDog[0].temperaments.map(el => el.name ).join(', '): detailDog[0].temperament?.split(', ').map(e => e ).join(', ')}  </p>
                            <div className={s.divcontainer}>
                                <h2 className={s.title} >Weight:</h2><p  className={s.descriptions}  >{detailDog[0].minWeight} kgs -  {detailDog[0].maxWeight} kgs </p>
                            </div>
                            <div className={s.divcontainer}>
                                <h2 className={s.title} >Height:</h2> <p  className={s.descriptions} > {detailDog[0].minHeight} cm - {detailDog[0].maxHeight} cm   </p> 
                            </div>
                            <div className={s.divcontainer} >
                                <h2 className={s.title} >Life Span: </h2> <p  className={s.descriptions} > {detailDog[0].life_span} </p> 
                            </div>
                            <a href='/home'><button  className={s.button}>Return home</button></a>
                        </div>
                }
            
            </div>
        </div>

    )

}
