
import '../VideoUpload/VideoUpload.scss';
import uploadThumbnail from '../../assets/Images/Upload-video-preview.jpg'
import { Link, useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { ApiService } from '../../api/ApiService';

interface CommentErrorState {
    [key: string]: boolean
    titleError: boolean
    descriptionError: boolean
    fileError: boolean
}

const VideoUpload = () => {

    const apiService = new ApiService();

    const queryClient = useQueryClient();
    const [newTitle, setTitle] = useState("");
    const [newDescription, setDescription] = useState("");
    const [newImage, setNewImage] = useState(null);
    const [file, setFile] = useState(null);
    const [fileDataUrl, setFileDataUrl] = useState(null); //tracks data url for uploaded image file
    const [filename, setFilename] = useState("Select an Image"); //tracks file name of uploaded file
    const [uploadErrorState, setUploadErrorState] = useState<CommentErrorState>({
        titleError: false,
        descriptionError: false,
        fileError: false
    });

    document.title = 'Upload';

    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let formComplete: boolean = true;

        const localUploadStateErr = {
            titleError: false,
            descriptionError: false,
            fileError: false
        }

        if (newTitle.length <= 0) {
            localUploadStateErr.titleError = true;
            formComplete = false;
        } 
        if (newDescription.length <= 0) {
            localUploadStateErr.descriptionError = true;
            formComplete = false;
        }

        if (file === null) {
            localUploadStateErr.fileError = true;
            formComplete = false;
        } 

        setUploadErrorState(localUploadStateErr);

        if (formComplete) {

            const newVideo = {
                file: file,
                title: newTitle,
                description: newDescription
            };

            const formData = new FormData();
            formData.append('file', newImage); // Append the file to the FormData object
            formData.append('title', newTitle);
            formData.append('description', newDescription);

            try {
                await apiService.postVideo(newVideo);
            } catch (error) {
                console.error('Error adding Video:', error);
            }
            
            // call invalidateQueries tell React Query to mark the query with the key 'videos' as stale.
            // is no longer up to date due to the addition of a new video.
            // When a query becomes stale, React Query will automatically initiate
            // a refetch for that query the next time it's accessed. This ensures that 
            // the data is refreshed, and the new video is included in the list of videos.
            queryClient.invalidateQueries(['videos']);

            setTitle("");
            setDescription("");
            setFile(null)
            // navigate/route home
            navigate("/")
        } else {
            // Couldn't reload 
            return;
        }
    }

    const handleTitleUpload = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    const handleDescriptionUpload = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setDescription(event.target.value)
    }

    const handleImageChange = (event) => {
        const uploadedFile = event.target.files[0];
        setNewImage(uploadedFile);
        setFile(uploadedFile);
    }

    useEffect(() => {
        let fileReader, isCancel = false;
        if (file) {
            fileReader = new FileReader();
            fileReader.onload = (event) => {
                //onload event occurs when the file is finished loading / fileReader is done reading the file
                const { result } = event.target;
                if (result && !isCancel) {
                    setFileDataUrl(result); //sets the file data url to the result; which allows the image element to set source to this url
                    // setFilename(file.name); //sets file name so that it is displayed once the is loaded
                }
            };
            fileReader.readAsDataURL(file); //FileReader object starts reading the file; once complete, onload above is called
        }
        return () => {
            //cleanup function; return stmnt needed if component is unmounted before loading is finished
            isCancel = true; //first sets isCancel to true to ensure the onload function above does not set the file data url
            if (fileReader && fileReader.readyState === 1) {
                //checks to see if fileReader object created and if its state is in the loading state
                fileReader.abort(); //if the above two are true, aborts the file read
            }
        };
    }, [file]);

    return (
        <>
            <section className="form__section">
                <h1 className="form__section-title"> Upload Video </h1>
                <form encType="multipart/form-data" action='submit' className="form__section-form"  onSubmit={handleSubmit} id="uploadForm">

                    <div className="form__section-thumbnail-container">
                        <h3 className="form__section-title-secondary"> VIDEO THUMBNAIL </h3>
                        <img className="form__section-thumbnail" src={fileDataUrl ? fileDataUrl : uploadThumbnail} />
                        <div className="form__section__upload-container">

                            <label
                                className={`form__section__file-input ${uploadErrorState.fileError ? "form__section__file--error": ""}`}
                            > 
                                {filename} 
                            </label>
                            <input
                                onChange={handleImageChange}
                                type='file'
                                id='file'
                                name='file'
                                accept="image/*" 
                                // accept='.jpg, .jpeg, .png'
                            />
                        </div>
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