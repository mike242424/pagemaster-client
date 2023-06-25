export default function Spinner() {
  return (
    <div className="d-flex justify-content-center">
      <div
        className="spinner-border"
        role="status"
        style={{
          marginTop: "150px",
          width: "20rem",
          height: "20rem",
          color: "#50a2c6",
        }}
      >
        <span className="sr-only"></span>
      </div>
    </div>
  );
}
