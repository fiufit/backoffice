import { Outlet } from "react-router-dom";
import Header from "@features/Header";
import Footer from "@features/Footer";

export default function Main() {
    return (
        <>
            <Outlet />
        </>
    )
}