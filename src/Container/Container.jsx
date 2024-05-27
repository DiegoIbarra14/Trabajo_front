import AdminNavbar from 'components/Navbars/AdminNavbar'
import Sidebar from 'components/Sidebar/Sidebar'
import React from 'react'
import AdminFooter from "../components/Footers/AdminFooter"
import { Outlet } from 'react-router-dom'
import "../Container/Container.css";
const Container = (props) => {
    const mainContent = React.useRef(null);
    return (
        <div>
            <Sidebar
                rutas={props.rutas}
                logo={{
                    innerLink: "/admin/index",
                    imgSrc: require("../assets/img/brand/argon-react.png"),
                    imgAlt: "...",
                }}
            />

            <div className="main-content" ref={mainContent}>
                <AdminNavbar {...props} />
                <div className=''>
                    <Outlet />

                </div>

            </div>

          
        </div>

    )
}

export default Container
