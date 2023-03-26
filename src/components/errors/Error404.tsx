import Header from "@components/Header";
import Footer from "@components/Footer";

export default function Error404() {

    return (
        <div className="App">
            <Header />
            <main>
            <section id="error-404" className="jumbotron error-40x">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <img src="" alt="" className="img-welcome" />
                        </div>
                        <div id="error-404-message" className="col-md-6 align-middle error-40x-message">Upss... Parece que no hay nada por aquí.</div> 
                    </div>
                </div>
            </section>
            </main>
            <Footer />
        </div>
    )
    
}