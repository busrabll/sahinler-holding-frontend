import React from "react";
import "./SideBar.css";
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SideBarOption from "./SideBarOption";

function SideBar() {

    let userId = 5;

    return (
        <div className="sideBar">

            <SideBarOption active Icon={HomeIcon} text={<Link className="link" to="/">Home</Link>} />
            <SideBarOption active Icon={PermIdentityIcon} text={<Link className="link" to={{ pathname: '/users/' + userId }}>Profile</Link>} />

        </div>
    );

}

export default SideBar;