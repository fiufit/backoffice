export default function Home() {

    return (
        <section id="home" className='home-section text-center jumbotron vertical-center'>
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                        <img src="img/home-phone.png" id="img-welcome" className="d-md-none d-sm-none d-none d-none d-lg-block" alt="" />
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">                    
                        <p className="msg-welcome">¡No esperes más!</p>
                        <p className="msg-sub-welcome">Comienza tu entrenamiento ahora <span className="msg-sub-welcome-free">gratis.</span></p>
                        <a id="linkWelcomeDownload" className="nav-link" href="#">Descargar</a>
                    </div>
                </div>
            </div>
        </section>
    )
    
}