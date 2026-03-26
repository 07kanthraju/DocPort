import Link from "next/link";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  .home-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: #faf9f7;
    font-family: 'DM Sans', sans-serif;
    color: #1c1917;
    text-align: center;
    padding: 40px 24px;
  }

  .home-wordmark {
    font-family: 'Lora', Georgia, serif;
    font-size: 13px;
    font-weight: 400;
    color: #b5afa6;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 48px;
  }

  .home-page h1 {
    font-family: 'Lora', Georgia, serif;
    font-size: clamp(32px, 5vw, 48px);
    font-weight: 500;
    letter-spacing: -0.02em;
    line-height: 1.15;
    color: #1c1917;
    margin: 0 0 16px;
    max-width: 520px;
  }

  .home-page h1 em {
    font-style: italic;
    color: #7a736b;
  }

  .home-tagline {
    font-size: 14px;
    font-weight: 300;
    color: #a39e96;
    letter-spacing: 0.01em;
    margin: 0 0 48px;
  }

  .home-tagline span {
    display: inline-block;
    margin: 0 6px;
    color: #d0c9c0;
  }

  .home-actions {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  .btn-primary {
    padding: 11px 28px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13.5px;
    font-weight: 500;
    letter-spacing: 0.02em;
    color: #fff;
    background: #3d3530;
    border: none;
    border-radius: 7px;
    cursor: pointer;
    text-decoration: none;
    transition: background 0.15s, transform 0.1s;
    display: inline-block;
  }

  .btn-primary:hover  { background: #2c2420; }
  .btn-primary:active { transform: scale(0.99); }

  .btn-ghost {
    padding: 11px 28px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13.5px;
    font-weight: 400;
    letter-spacing: 0.02em;
    color: #3d3530;
    background: transparent;
    border: 1px solid #d0c9c0;
    border-radius: 7px;
    cursor: pointer;
    text-decoration: none;
    transition: border-color 0.15s, background 0.15s, transform 0.1s;
    display: inline-block;
  }

  .btn-ghost:hover {
    border-color: #3d3530;
    background: #f5f2ee;
  }

  .btn-ghost:active { transform: scale(0.99); }

  .home-footer {
    position: absolute;
    bottom: 32px;
    font-size: 12px;
    color: #c8c2ba;
    font-weight: 300;
    letter-spacing: 0.01em;
  }
`;

export default function Home() {
  return (
    <>
      <style>{styles}</style>
      <div className="home-page">
        <div className="home-wordmark">DocPort</div>

        <h1>
          Appointments,<br />
          <em>made simple.</em>
        </h1>

        <p className="home-tagline">
          Doctor <span>·</span> Insurance <span>·</span> Patient
        </p>

        <div className="home-actions">
          <Link href="/login">
            <span className="btn-primary">Sign in</span>
          </Link>
          <Link href="/signup">
            <span className="btn-ghost">Create account</span>
          </Link>
        </div>

        <p className="home-footer">DocPort &copy; {new Date().getFullYear()}</p>
      </div>
    </>
  );
}