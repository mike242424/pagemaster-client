import backgroundImage from "../assets/images/books.jpg";
import Nav from "../components/Nav";

export default function HomePage() {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          height: "100vh",
          width: "100vw",
        }}
      >
        <Nav />
        <div className="container text-center text-light">
          <div className="row mt-5">
            <h1 className="mb-5">
              <strong>
                <span className="title_1 fade-in">P</span>
                <span className="title_1 fade-in">a</span>
                <span className="title_1 fade-in">g</span>
                <span className="title_1 fade-in">e</span>
                <span className="title_1 fade-in">M</span>
                <span className="title_1 fade-in">a</span>
                <span className="title_1 fade-in">s</span>
                <span className="title_1 fade-in">t</span>
                <span className="title_1 fade-in">e</span>
                <span className="title_1 fade-in">r</span>
              </strong>
            </h1>
            <h3 className="title_2 fade-in">Unlock the Magic of Books</h3>
          </div>
        </div>
      </div>
    </>
  );
}
