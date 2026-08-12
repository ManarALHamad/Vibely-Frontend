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
        windowBorder: "#F2B6C6",
        tabIcon: "#D94F70",
        menuIcons: "#9B6B79",
        textDark: "#2B1E24",
        textLight: "#FFFFFF",
        link: "#D94F70",
        action: "#D94F70",
        inactiveTabIcon: "#B89AA3",
        error: "#D93025",
        inProgress: "#D94F70",
        complete: "#2E9E61",
        sourceBg: "#FFF0F5"
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
