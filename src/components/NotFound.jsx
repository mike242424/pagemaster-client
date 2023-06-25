import Nav from "./Nav";

export default function NotFound() {
  return (
    <>
      <Nav />
      <div className="row mt-5 text-center">
        <div className="col mb-4">
          <h1>
            <strong>404 Not Found</strong>
          </h1>
          <h2>This is not the page you are looking for</h2>
        </div>
      </div>
    </>
  );
}
