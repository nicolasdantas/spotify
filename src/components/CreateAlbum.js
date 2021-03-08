import React, {useState} from "react";
import axios from 'axios'
import '../style/CreateAlbum.scss'

const CreateAlbum = () => {

    const [author, setAuthor] = useState('')
    const [releaseYear, setReleaseYear] = useState('')
    const [title, setTitle] = useState('')

    const handleSubmit = () => {


        let axiosInstance = axios.create({
            baseURL:"https://erp.api.hubup.cloud",
        })


        axiosInstance.post('/t/album/', {author:author, releaseYear:releaseYear, title:title})
            .then((response) => {
                console.log(response.data);
            })
    }

    return(
        <section className='create-album'>
            <h1>Create an album</h1>
                    <div className='form-wrapper'>
                        <label>
                            Author :
                            <input type="text" name="author" onChange={(event) => setAuthor(event.target.value) }/>
                        </label>
                        <label>
                             Release year :
                            <input type="text" name="release-year" onChange={(event) => setReleaseYear(event.target.value) }/>
                        </label>
                        <label>
                            Title :
                            <input type="text" name="title" onChange={(event) => setTitle(event.target.value) }/>
                        </label>
                        <button onClick={()=> handleSubmit()} >Send</button>
                    </div>
        </section>
)
}

export default CreateAlbum