import Nav from "./Nav";

export default function AuthError() {
  return (
    <>
      <Nav />
      <div className="row mt-5">
        <div className="col mb-4">
          <h1 className="text-center">
            <strong>You are already logged in</strong>
          </h1>
        </div>
      </div>
    </>
  );
}
