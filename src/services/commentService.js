const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/comments`

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


export {
    create,
}