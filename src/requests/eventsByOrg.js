import axios from 'axios'

const { REACT_APP_BASE_URL } = process.env

const BASE_URL = REACT_APP_BASE_URL

// get all events by organization, with nested regsitration, reviews, attendees

const getEventsByOrg = async (orgId) => {
  const token = localStorage.getItem('token_org')
  const res = await axios(`${BASE_URL}/organizations/${orgId}/events`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res.data
}


const createEvent = async (formInputs) => {
  const token = localStorage.getItem('token_org')
  const orgId = localStorage.getItem('org_id')
  const res = await axios(`${BASE_URL}/organizations/${orgId}/events`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: formInputs // formInput is an object 
  })
  return res.data
}

export default { getEventsByOrg, createEvent }