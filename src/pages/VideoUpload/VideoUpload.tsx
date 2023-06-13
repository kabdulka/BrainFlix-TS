
import '../VideoUpload/VideoUpload.scss';
import uploadThumbnail from '../../assets/Images/Upload-video-preview.jpg'
import { Link, useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';
import { NewVideo } from '../../modules/types';


interface CommentErrorState {
    [key: string]: boolean
    titleError: boolean
    descriptionError: boolean
}

const VideoUpload = () => {
    
    const [newTitle, setTitle] = useState("")
    const [newDescription, setDescription] = useState("")
    const [uploadErrorState, setUploadErrorState] = useState<CommentErrorState>({
        titleError: false,
        descriptionError: false
    })

    // const API_URL = process.env.REACT_APP_API_URL;
    const API_URL = "http://localhost:5500";
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

    document.title = 'Upload';

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let formComplete: boolean = true;

        const localUploadStateErr = {
            titleError: false,
            descriptionError: false
        }

        if (newTitle.length <= 0) {
            localUploadStateErr.titleError = true;
            formComplete = false;
        } 
        if ( newDescription.length <= 0) {
            localUploadStateErr.descriptionError = true;
            formComplete = false;
        } 

        setUploadErrorState(localUploadStateErr);

        if (formComplete) {

            const newVideoObj = {
                title: newTitle,
                description: newDescription
            };
    
            postVideo(newVideoObj)
           
            setTitle("");
            setDescription("");
            // navigate/route home
            navigate("/")
        } else {
            return;
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
                            <input 
                                value={newTitle} 
                                onChange={handleTitleUpload} 
                                className={`form__section-title-input ${uploadErrorState.titleError ? "form__section-title--error": ""}`}
                                name="formTitle" 
                                placeholder="Add a title to your video"/>
                        </div>

                        <div className="form__section-description">
                            <label className="form__section-description-label" htmlFor="formDescription"> ADD A VIDEO DESCRIPTION </label>
                            <textarea 
                                value={newDescription} 
                                onChange={handleDescriptionUpload} 
                                className={`form__section-description-input ${uploadErrorState.descriptionError ? "form__section-description--error": ""}`}

                                name="formDescription" 
                                placeholder="Add a description of your video"/>
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