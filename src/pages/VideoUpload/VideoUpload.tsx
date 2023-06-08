
import '../VideoUpload/VideoUpload.scss';
import uploadThumbnail from '../../assets/Images/Upload-video-preview.jpg'
import { Link, useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';
import { NewVideo } from '../../modules/types';


const VideoUpload = () => {

    // const API_URL = process.env.REACT_APP_API_URL;
    const API_URL = "http://localhost:9000";
    const navigate = useNavigate();

    const postVideo = (newVideo: NewVideo) => {
        const postVideoUrl = `${API_URL}/videos/`;
        axios
        .post(postVideoUrl, newVideo)
        .then( () => {
        })
        .catch(err => {
          console.log("could not post a new video ", err);
        })
      }

    const [newTitle, setTitle] = useState("")
    const [newDescription, setDescription] = useState("")

    document.title = 'Upload';

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (newTitle.length < 2 || newDescription.length < 2) {
            alert("enter more than 2 letters")
        } else {
            const newVideoObj = {
                title: newTitle,
                description: newDescription
            };

            postVideo(newVideoObj)
           
            setTitle("");
            setDescription("");
            // navigate will route to home
            navigate("/")
        }


    }

    const handleTitleUpload = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    const handleDescriptionUpload = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setDescription(event.target.value)
    }

    return (
        <>
            <section className="form__section">
                <h1 className="form__section-title"> Upload Video </h1>
                <form className="form__section-form" onSubmit={handleSubmit} id="uploadForm">

                    <div className="form__section-thumbnail-container">
                        <h3 className="form__section-title-secondary"> VIDEO THUMBNAIL </h3>
                        <img className="form__section-thumbnail" src={uploadThumbnail} />
                    </div>
                
                    <div className="form__section-input">
                        <div className="form__section-title-text">
                            <label  className="form__section-title-label" htmlFor="formTitle"> TITLE YOUR VIDEO </label>
                            <input value={newTitle} onChange={handleTitleUpload} className="form__section-title-input" name="formTitle" placeholder="Add a title to your video"/>
                        </div>

                        <div className="form__section-description">
                            <label className="form__section-description-label" htmlFor="formDescription"> ADD A VIDEO DESCRIPTION </label>
                            <textarea value={newDescription} onChange={handleDescriptionUpload} className="form__section-description-input" name="formDescription" placeholder="Add a description of your video"/>
                        </div>
                    </div>

                    

                </form>

                <div className="form__section-update">

                    <button form='uploadForm' type="submit" className="form__section-publish">
                        PUBLISH
                    </button>

                    <Link to="/" className="form__section-cancel"> 
                        CANCEL
                    </Link>

                </div>

            </section>


        </>
    );
}

export default VideoUpload;