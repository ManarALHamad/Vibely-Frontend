const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`

const index = async (formData) => {
    try {
        const res = await fetch(`${BASE_URL}/users`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        const data = await res.json()
        

        if (data.err) {
            console.log(data.err)
            throw new Error(data.err)
        }

        return data
    } catch (err) {
        throw new Error(err)
    }
}

//toggleFollow

const toggleFollow = async(userId) => {
    
    const token = localStorage.getItem('token')

     const res = await fetch(
        `${BASE_URL}/${userId}/follow`,
    {
    method: 'PUT',
    headers: {
       Authorization: `Bearer ${token}`
            }
        }
    )
    const data = await res.json()

    if (!res.ok) {
        throw new Error(`${res.status}: ${data.message}`)
    }

    return data
}


export {
    index,
    toggleFollow,
}