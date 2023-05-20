import React, {useState} from 'react'

const useToken = () => {
    const getToken =() =>{
        const tokenString: string = sessionStorage.getItem('token') || ""
        return tokenString
    }

    const [token, setToken] = useState(getToken())
    const saveToken = (userToken: any ) => {
        sessionStorage.setItem('token', JSON.stringify(userToken))
        setToken(userToken.token)
      }
      return {
        setToken: saveToken,
        token
      }
    }

export default useToken
