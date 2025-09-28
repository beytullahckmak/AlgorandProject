import React from "react";
import "./developer.css";
import Logo from "../assets/loog.png"
import pp from "../assets/profile.png"

export default function DeveloperPage() {
  return (
    <section className="devpage">
      {/* Sol sidebar */}
      <aside className="devpage-sidebar">
        <div className="devpage-wallet">
          <img src={pp} height={30}/>
          <span className="devpage-wallet-text">0xA1g0h4ca7hoN</span>
        </div>
        <img src={Logo} height={150} width={150} />
      </aside>

      {/* Dikey ayırıcı */}
      <div className="devpage-divider" />

      {/* Sağ ana alan */}
      <main className="devpage-main">
        {/* Logo */}
        <div className="devpage-logo">
          <img src={Logo} height={50}/>
          <div className="devpage-logo-text">
            <span className="devpage-logo-title">blazr</span>
            <span className="devpage-logo-sub">social</span>
          </div>
        </div>

        {/* Sağ üst upload kutusu */}
        <button className="devpage-upload" aria-label="Upload">
          <a>upload</a>
        </button>

        {/* Profil satırı */}
        <div className="devpage-profile">
          <img src={pp}/>
          <span className="devpage-username">berkelfreud</span>
        </div>

        {/* Gri ana kart */}
        <section className="devpage-card">
          {/* Project name satırı */}
          <div className="devpage-field devpage-field--with-actions">
            <div className="devpage-thumb" />
            <input
              type="text"
              placeholder="Project Name"
              className="devpage-input"
            />
            <div className="devpage-actions">
              <span className="devpage-like">
                30 <span className="devpage-ico">👍</span>
              </span>
              <span className="devpage-dislike">
                30 <span className="devpage-ico">👎</span>
              </span>
            </div>
          </div>

          {/* İki boş satır */}
          <div className="devpage-field devpage-field--empty" />
          <div className="devpage-field devpage-field--empty" />
        </section>
      </main>
    </section>
  );
}
