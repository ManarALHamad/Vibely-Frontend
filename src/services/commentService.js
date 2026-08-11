const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/comments`


const index = async () => {

    const token = localStorage.getItem('token')

     const res = await fetch(BASE_URL, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const data = await res.json()

    if (!res.ok) {
        throw new Error(`${res.status}: ${data.message}`)
    }

    return data


}


const create = async (postId, formData) => {

    const token = localStorage.getItem("token")

    const res = await fetch(BASE_URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            ...formData,
            post: postId,
        }),

    })

       const data = await res.json()

    if (!res.ok) {
        throw new Error(`${res.status}: ${data.message}`)
    }

    return data
}

const deleteComment = async (commentId) => {

    const token = localStorage.getItem('token')

    const res = await fetch(`${BASE_URL}/${commentId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const data = await res.json()

    if (!res.ok) {
        throw new Error(`${res.status}: ${data.message}`)
    }

    return data
}


export {
    create,
    deleteComment,
    index,
}