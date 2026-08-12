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

    console.log("Uploaded", result.info)

    props.setMediaUrl(result.info.secure_url)
    props.setMediaType(result.info.resource_type)
    }

    }
     )

    }, [])


}


export default UploadWidget 
