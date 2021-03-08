import React, {useEffect, useState} from "react";
import axios from 'axios'
import '../style/CreateAlbum.scss'
import {
    useParams
} from "react-router-dom";

const CreateSong = (props) => {
    let { id } = useParams();
    const [name, setName] = useState('')
    const [sequence, setSequence] = useState('')

    const handleSubmit = () => {
        axios.post(`https://erp.api.hubup.cloud/t/album/${id}/song`, {name, sequence})
    }

    return(
        <section className='create-album'>
            <h1>Add songs to album {id}</h1>
                    <form className='form-wrapper'>
                        <label>
                            Name :
                            <input type="text" name="name" onChange={(event) => setName(event.target.value) }/>
                        </label>
                        <label>
                             Sequence :
                            <input type="text" name="sequence" onChange={(event) => setSequence(event.target.value) }/>
                        </label>
                        <button onClick={()=> handleSubmit()}>Send</button>
                    </form>
        </section>
)
}

export default CreateSong