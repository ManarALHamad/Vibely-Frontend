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
    resourceType: "auto",

    styles: {
      palette: {
      window: "#FFF7FB",
      windowBorder: "#00a6fbff",
      tabIcon: "#00A6FB",
      menuIcons: "#0582CA",
      textDark: "#FFFFFF",
      textLight: "#FFFFFF",
      link: "#00A6FB",
      action: "#0582CA",
      inactiveTabIcon: "#6F8D9C",
      error: "#FF4D6D",
      inProgress: "#00A6FB",
      complete: "#2ECA8B",
      sourceBg: "#003554"
      }
    }
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
