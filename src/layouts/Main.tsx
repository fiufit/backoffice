import { Outlet } from "react-router-dom";
import Header from "../components/html/Header";
import Footer from "../components/html/Footer";

export default function Main() {
    return (
        <div className="App">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}