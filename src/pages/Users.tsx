import SearchBarUsers from "@components/management/SearchBarUsers";
import UserEditionCards from "@components/management/UserEditionCards";

export default function Users() {

    return (
        <div className="management-section">
            <h1 className="management-section-title">Panel de usuarios</h1>
            <hr />
            <div className="management-section-content">
                <SearchBarUsers />
                <UserEditionCards />
            </div>
        </div> 
    )
    
}