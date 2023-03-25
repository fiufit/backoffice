import Header from "../html/Header";
import Footer from "../html/Footer";

export default function Error400() {

    return (
        <div className="App">
            <Header />
            <main>
            <section id="error-400" className="jumbotron error-40x">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <img src={import.meta.env.VITE_ERROR_IMG_SHIBA} alt="" className="img-welcome" />
                        </div>
                        <div id="error-400-message" className="col-md-6 align-middle error-40x-message">No es posible acceder al sitio que estás buscando, revisa que no haya errores de ortografía.</div> 
                    </div>
                </div>
            </section>
            </main>
            <Footer />
        </div>
    )
    
}