import React from "react";
import "./SideBar.css";
import HomeIcon from '@mui/icons-material/Home';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SideBarOption from "./SideBarOption";

function SideBar() {
    return (
        <div className="sideBar">

            <SideBarOption active Icon={HomeIcon} text="Home" />
            <SideBarOption Icon={PermIdentityIcon} text="Profile" />

        </div>
    );

}

export default SideBar;