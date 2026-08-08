const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`

const index = async () => {

  const res = await fetch(BASE_URL)

  const data = await res.json()

  if (!res.ok) {
    throw new Error(`${res.status}: ${data.message}`)
  }

  return data
}

const show = async (id) => {

  const res = await fetch(`${BASE_URL}/${id}`)

  const data = await res.json()

  if (!res.ok) {
    throw new Error(`${res.status}: ${data.message}`)
  }

  return data
}

const create = async (formData) => {

  const token = localStorage.getItem('token')

  const res = await fetch(BASE_URL, {

    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },

    body: JSON.stringify(formData),

  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(`${res.status}: ${data.message}`)
  }

  return data
}

const deletePost = async (id) => {

  const token = localStorage.getItem('token')

  const res = await fetch(`${BASE_URL}/${id}`, {

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

const update = async (id, formData) => {

  const token = localStorage.getItem('token')

  const res = await fetch(`${BASE_URL}/${id}`, {

    method: 'PUT',

    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },

    body: JSON.stringify(formData)

  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(`${res.status}: ${data.message}`)
  }

  return data
}

export {
  index,
  show,
  create,
  deletePost,
  update
}