import CreateAdminForm from "@components/management/CreateAdminForm";
import EditAdminForm from "@components/management/EditAdminForm";
import SearchBarAdmins from "@components/management/SearchBarAdmins";

export default function Admins() {

    return (
        <div className="management-section">
            <h1 className="management-section-title">Panel de administradores</h1>
            <hr />
            <div className="management-section-content">
                <div id="management-section-admin-creation">
                    <h2>Creación</h2>
                    <CreateAdminForm />
                </div>
                <hr />
                <div id="management-section-admin-edition">
                    <h2>Edición</h2>
                    <SearchBarAdmins />
                    <EditAdminForm />
                </div>
            </div>
        </div> 
    )
    
}