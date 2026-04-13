export default function ErrorPage() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>😵 Oops!</h1>
      <p>Something went wrong.</p>
      <button onClick={() => window.location.href = "/"}>
        Go Home
      </button>
    </div>
  );
}