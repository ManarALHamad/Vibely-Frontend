import { useEffect, useRef } from 'react'

const UploadWidget = (props) => {


    const cloudinaryRef = useRef()
    const widgetRef = useRef()

    useEffect(() => {

    cloudinaryRef.current = window.cloudinary

    widgetRef.current = cloudinaryRef.current.createUploadWidget(

    {
    cloudName: "p16cweqr",
    uploadPreset: "vibely_uploads",
    sources: ["local"],
    resourceType: "auto"
     },

    (error, result) => {

     if (!error && result.event === "success") {

   
    props.handleUpload (

        result.info.secure_url,
        result.info.resource_type


    )



    }

    }
     )

    }, [])

return (

    <button onClick={() => widgetRef.current.open()} >Upload</button>
)




}


export default UploadWidget 
