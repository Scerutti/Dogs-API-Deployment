import React, { useState, useEffect } from 'react';
import { createDog, getTemperaments } from '../../Redux/Actions';
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import s from './CreateDog.module.css'



function validate(input) {
    let errors = {};
    let expression = /^[a-zA-Z ]+$/gm;
    if (!input.name) {
        errors.name = 'Name is required'
    } else if (parseInt(input.name)) {
        errors.name = 'Name is invalid, write a text'
    }else if (!expression.test(input.name) ){
        errors.name = 'Special Charactes are not supported'
    }
    if (!input.image) {
        errors.image = "Image required"
    }
    if (!input.life_span) {
        errors.life_span = 'Life span is required'
    } else if (input.life_span < 1 || input.life_span > 20) {
        errors.life_span = 'Write a number beetwen 1 - 20'   
    }
    if (!input.minWeight) {
        errors.minWeight = 'Minimum weight is required'
    } else if (Number(input.minWeight) <= 0 || Number(input.minWeight >= 100)) {
        errors.minWeight = 'Write a number beetwen 0 - 100'    
    }
    if (!input.maxWeight) {
        errors.maxWeight = 'Maximum weight is required'
    } else if (Number(input.maxWeight) <= 0 || Number(input.maxWeight < Number(input.minWeight) || Number(input.maxWeight > 100))) {
        errors.maxWeight = 'Write a number beetwen 0- 100'
    }
    if (!input.minHeight) {
        errors.minHeight = 'Minimum height is required'
    } else if (Number(input.minHeight) <= 0 || Number(input.minHeight) >= 100) {
        errors.minHeight = 'Write a number beetwen 0 - 100'
    }
    if (!input.maxHeight) {
        errors.maxHeight = 'Minimum height is required'
    } else if (Number(input.maxHeight) <= 0 || Number(input.maxHeight) < Number(input.minHeight) || Number(input.maxHeight) > 100) {
        errors.maxHeight = 'Write a number beetwen 0- 100'
    }
    if (!input.temperament.length){
        errors.temperament="Select at least 1 temperament"
    }
    return errors
}


export default function PostDog() {
    const dispatch = useDispatch();
    const history = useHistory();       //Utilizo el hook de historial para hacer un manejo correcto del mismo al momento de renderizar
    const temperaments = useSelector((state) => state.temperaments)

    const [errors, setErrors] = useState("")

    const [input, setInput] = useState({
        name: "",
        life_span: "",
        minWeight: "",
        maxWeight: "",
        minHeight: "",
        maxHeight: "",
        image: "",
        temperament: []
    });

    //Handle
    function handleChange(e) {      //verificacion ante un cambio de eventos
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }
    

    function handleSelect(e) {      //manejo del select de temperamenteos
        if (input.temperament.includes(e.target.value)) {
            alert("Already in the list");
        } else {
            setInput({
                ...input,
                temperament: [...input.temperament, {id: e.target.value.split(",")[0], name: e.target.value.split(",")[1]}]
            })
        }
    }

    const handleDelete = (e) => {       //handle para eliminar un temperamento agregado por error
        setInput({
            ...input,
            temperament: input.temperament.filter(el => el !== e)
        })
    }

    function handleSubmit(e) {      //manejo ante submit de una nueva breed
        if (input.name && input.life_span && input.minWeight && input.maxWeight && input.minHeight && input.maxHeight && input.image && input.temperament && input.temperament.length>0){
            e.preventDefault();
            dispatch(createDog({
                ...input, 
                temperament: input.temperament.map( t => Number(t.id) )
            }))
            // console.log({
            //     ...input, 
            //     temperament: input.temperament.map( t => Number(t.id) )
            // })


            alert("Success! Your dog was created")
            setInput({
                name: "",
                life_span: "",
                minWeight: "",
                maxWeight: "",
                minHeight: "",
                maxHeight: "",
                image: "",
                temperament: []
            })
            history.push("/home")

        }else {
            alert("Incomplete Data")
            e.preventDefault();
        } 
 


    }

    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])
    
    //console.log(input.temperament)

    //Form
    return (
        <div className={s.fondo}>
            <div className={s.titulo} >
                <span className={s.titulotexto}>
                    CREATE YOUR OWN BREED OF DOG
                </span>
            </div>
            <div className={s.center}>
                <form onSubmit={e => { handleSubmit(e) }}>
                    <div >
                        <label className={s.label}>Breed: </label>
                        <input
                            placeholder="Bread name"
                            type="text"
                            value={input.name}
                            name="name"
                            onChange={(e) => handleChange(e)} />
                            <div className={s.h2e}>
                            {errors.name && (
                                <p className='error'>{errors.name}</p>
                            )}
                        </div>
                    </div>
                    <br />
                    <div>
                        <label className={s.label} >Picture: </label>
                        <input
                            placeholder='URL'
                            type="url"
                            value={input.image}
                            name="image"
                            onChange={(e) => handleChange(e)} />
                        <div className={s.h2e} >
                            {errors.image && (<p className='error'>{errors.image}</p>)}

                        </div>
                    </div>
                    <br />
                    <div>
                        <label className={s.label} >Min weight: </label>
                        <input
                            type="number"
                            min="0"
                            placeholder='Minimum weight'
                            value={input.minWeight}
                            name="minWeight"
                            onChange={(e) => handleChange(e)}
                        />
                        <div className={s.h2e} >
                            {errors.minWeight && (<p className='error'>{errors.minWeight}</p>)}
                        </div>
                    </div>
                    <br />
                    <div>
                        <label className={s.label} >Max weight: </label>
                        <input
                            type="number"
                            min="0"
                            placeholder="Maximum weight"
                            value={input.maxWeight}
                            name="maxWeight"
                            onChange={(e) => handleChange(e)} />
                        <div className={s.h2e} >
                            {errors.maxWeight && (<p className='error'>{errors.maxWeight}</p>)}
                        </div>
                    </div>
                    <br />
                    <div>
                        <label className={s.label} >Min height: </label>
                        <input
                            type="number"
                            min="0"
                            placeholder="Minimum height"
                            value={input.minHeight}
                            name="minHeight"
                            onChange={(e) => handleChange(e)} />
                        <div className={s.h2e}  >
                            {errors.minHeight && (<p className='error'>{errors.minHeight}</p>)}
                        </div>
                    </div>
                    <br />
                    <div>
                        <label className={s.label} >Max height: </label>
                        <input
                            type="number"
                            min="0"
                            placeholder="Maximum height"
                            value={input.maxHeight}
                            name="maxHeight"
                            onChange={(e) => handleChange(e)} />
                        <div className={s.h2e}  >
                            {errors.maxHeight && (<p className='error'>{errors.maxHeight}</p>)}
                        </div>
                    </div>
                    <br />
                    <div>
                        <label className={s.label} >Life span: </label>
                        <input
                            type="number"
                            min="0"
                            placeholder="Dog's life span"
                            value={input.life_span}
                            name="life_span"
                            onChange={(e) => handleChange(e)} />
                        <div className={s.h2e}  >
                            {errors.life_span && (<p className='error'>{errors.life_span}</p>)}
                        </div>
                    </div>
                    <br />
                    <label className={s.conteinTemp} >Temperaments: </label>
                    <select  onChange={(e) => handleSelect(e)}>
                        {temperaments?.map((el,i) => (<option value={`${el.id},${el.name}`} key={el.id}
                        >{el.name}</option>))}
                    </select>
                         {errors.temperament && (
                            <p className = 'error'>{errors.temperament}</p>
                        )}  
                    <div className={s.tempcontrol} >
                        {input.temperament.map((el,i ) =><button type='reset'  onClick={() => handleDelete(el)} className={s.x} > {el.name} X </button>)}
                    </div>
                    <div>
                        <button className={s.button} type='submit'> Create breed </button>
                    </div>
                </form>
                <Link to="/home"> <button className={s.btn}> Go Back </button></Link>

            </div>
        </div>
    )
}

