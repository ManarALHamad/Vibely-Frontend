
import { useEffect } from 'react'
import * as userService from '../services/userService'


const Dashboard = (props) =>{


  
useEffect(() => {

const fetchUsers = async () =>{

 try {
        const fetchedUsers = await userService.index()
        console.log(fetchedUsers)
        

    } catch (err) {
        console.log(err)
        
    }

}

if(props.user) {

    fetchUsers()
}

}, [props.user])


return (

    <>
    
    <h1>Hi 👋 {props.user.username}</h1>
    <p>this is your website 💟</p>
    
    </>
)




}

export default Dashboard 