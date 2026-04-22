export function VisitUs() {
  return (
    <section className="Contact-us">
      <div className="container contact-grid">
        <div className="contact-left">
          <h4>We're here to help</h4>
          <p>
            Visit our Help Centre for answers to common questions or contact us
            directly.
          </p>

          <div className="contact-buttons">
            <button className="btn-light">Help Centre</button>
            <button className="btn-dark">Contact support</button>
          </div>
        </div>

        <div className="contact-col">
          <p className="heading">Indeed</p>
          <a href="#">About Indeed</a>
          <a href="#">Press</a>
          <a href="#">Security</a>
          <a href="#">Terms</a>
          <a href="#">Privacy Centre and ad choices</a>
          <a href="#">Accessibility at Indeed</a>
          <a href="#">Work at Indeed</a>
          <a href="#">Countries</a>
          <a href="#">Sitemap</a>
        </div>

        <div className="contact-col">
          <p className="heading">Employers</p>
          <a href="#">Post a job</a>
          <a href="#">Products</a>
          <a href="#">Pricing</a>
          <a href="#">Indeed Insights</a>
          <a href="#">FAQ</a>
        </div>

        <div className="contact-col">
          <p className="heading">Resources</p>
          <a href="#">How to hire employees</a>
          <a href="#">How to write job descriptions</a>
          <a href="#">Guide to hiring with Indeed</a>
          <a href="#">Interview questions guide</a>
          <a href="#">Indeed Events</a>
          <a href="#">Product updates</a>
        </div>
      </div>
    </section>
  );
}
