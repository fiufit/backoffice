import ManagementNavbar from "@components/ManagementNavbar";
import { Outlet } from "react-router-dom";

export default function Management() {
    return (
        <div id="section-managment" className="jumbotron fiufit-section">
            <div className="container">
                <div className="row justify-content-center">
                    <div id="management-main-navbar" className="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3"> <ManagementNavbar /> </div>
                    <div id="management-main-panel" className="col-12 col-sm-12 col-md-8 col-lg-9 col-xl-9"> <Outlet /> </div>
                </div>
            </div>
        </div> 
    )

}