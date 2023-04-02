import { Table } from "react-bootstrap";
import Pagination from 'react-bootstrap/Pagination';

export default function EditAdminForm() {

    let active = 1;
    let items = [];
    for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active}>
            {number}
            </Pagination.Item>,
        );
    }

    return (
        <div>
            <Table striped className='admins-table'>
                <thead className='admins-table-head thead-light'>
                </thead>
                <tbody className='admins-table-body'>
                    <tr>
                        <td className='admins-item'>Juan Perez</td>
                        <td className="admins-table-body-list-delete"><a href="#" className="admins-table-link-delete">eliminar</a></td>
                    </tr>
                    <tr>
                        <td className='admins-item'>Juan Perez</td>
                        <td className="admins-table-body-list-delete"><a href="#" className="admins-table-link-delete">eliminar</a></td>
                    </tr>
                    <tr className='admins-table-tr-last-row'>
                        <td className='admins-item'>Juan Perez</td>
                        <td className="admins-table-body-list-delete"><a href="#" className="admins-table-link-delete">eliminar</a></td>
                    </tr>
                    <tr className='admins-table-tr-last-row'>
                        <td className='admins-item'>Juan Perez</td>
                        <td className="admins-table-body-list-delete"><a href="#" className="admins-table-link-delete">eliminar</a></td>
                    </tr>
                    <tr className='admins-table-tr-last-row'>
                        <td className='admins-item'>Juan Perez</td>
                        <td className="admins-table-body-list-delete"><a href="#" className="admins-table-link-delete">eliminar</a></td>
                    </tr>
                    <tr>
                        <td className='admins-item'>Juan Perez</td>
                        <td className="admins-table-body-list-delete"><a href="#" className="admins-table-link-delete">eliminar</a></td>
                    </tr>
                    <tr>
                        <td className='admins-item'>Juan Perez</td>
                        <td className="admins-table-body-list-delete"><a href="#" className="admins-table-link-delete">eliminar</a></td>
                    </tr>
                    <tr className='admins-table-tr-last-row'>
                        <td className='admins-item'>Juan Perez</td>
                        <td className="admins-table-body-list-delete"><a href="#" className="admins-table-link-delete">eliminar</a></td>
                    </tr>
                    <tr className='admins-table-tr-last-row'>
                        <td className='admins-item'>Juan Perez</td>
                        <td className="admins-table-body-list-delete"><a href="#" className="admins-table-link-delete">eliminar</a></td>
                    </tr>
                    <tr className='admins-table-tr-last-row'>
                        <td className='admins-item'>Juan Perez</td>
                        <td className="admins-table-body-list-delete"><a href="#" className="admins-table-link-delete">eliminar</a></td>
                    </tr>
                </tbody>
            </Table>

            <div id="admin-edition-pagination">
                <Pagination>{items}</Pagination>
            </div>
        </div>
    );
}