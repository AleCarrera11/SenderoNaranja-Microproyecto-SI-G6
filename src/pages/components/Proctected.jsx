import React, { use, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContex'


export default function Protected() {
    const navigate = useNavigate()


    const profileCOntext = use(UserContext)

    const { logged } = profileCOntext


    useEffect(() => {
        if (!logged) {
            navigate('/login')
        }


    }, [logged, navigate])



    return (
        <Outlet />
    )
}