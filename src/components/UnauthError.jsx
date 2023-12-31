import Nav from "./Nav";

export default function UnauthError() {
  return (
    <>
      <Nav />
      <div className="row mt-5">
        <div className="col mb-4">
          <h1 className="text-center">
            <strong>Register or Login to see content</strong>
          </h1>
        </div>
      </div>
    </>
  );
}
