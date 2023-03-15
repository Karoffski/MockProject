import React from "react"

const Connected = () => {



    return(
        <>
            <p>Bonjour cher {localStorage.getItem('user')}</p>
        </>
    )

}

export default Connected;