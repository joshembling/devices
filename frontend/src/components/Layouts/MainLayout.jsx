import React from 'react'
import Navigation from './Navigation'

const MainLayout = ({ children }) => {
    return (
        <>
            <Navigation />
            <main>
                <div className="container-xl">{children}</div>
            </main>
        </>
    )
}

export default MainLayout
