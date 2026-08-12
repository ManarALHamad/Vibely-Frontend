
import PostList from "./posts/PostList"



const Dashboard = (props) => {


    return (

        <main className="dashboard-page">

        <header className="dashboard-header">

        <div>
        
        
                       
        <h1>{props.user.username} 👋</h1>
                        
                    
        </div>

        </header>


        <section className="feed-section">

         <div className="feed-heading">

        <h2>For You</h2>
                
        </div>

        <PostList posts={props.posts} isLoading={props.isLoading} user={props.user} toggleLike={props.toggleLike} />
                   
     
            </section>

        </main>
    )
}

export default Dashboard