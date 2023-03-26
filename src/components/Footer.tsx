export default function Footer() {

    return (

      <footer className="text-lg-start">
        <section>
          <div className="container">

            <div className="row">

              <div className="col-md-6 col-lg-6 col-xl-6 mx-auto mb-6">
                <h6 className="fw-bold mb-4 footer-brand"><span className='footer-brand-karla'>Fiufit</span> <small>©<span className='footer-brand-date'> {new Date().getFullYear()}</span></small></h6>
              </div>

              <div className="col-md-6 col-lg-6 col-xl-6 mx-auto mb-6">
                <h6 id="text-footer-derechos-reservados" className='footer-text'>Todos los derechos reservados.</h6>
              </div>

            </div>
          </div>
        </section>
      </footer>

    )
    
}