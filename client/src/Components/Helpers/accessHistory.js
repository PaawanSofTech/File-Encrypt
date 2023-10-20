import React, { useEffect, useState } from 'react'

const accessHistory = (address) => {
    const [history, sethistory] = useState(null);
    axios.get(`http://localhost:4000/${address}`)
    .then(res => sethistory(res.data))
    .catch(err => console.log(err))
    return history;
}

export default accessHistory
