import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import algoLogo from "../assets/algorand_logo_mark_black.svg";
import Logo from "../assets/loog.png";
import crazy from "../assets/crazy.png";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // 🔹 soft görünümlü font-awesome oklar
import DeflyConnect from "../DeflyConnect";
import investor from "../assets/investor.jpeg";
import developer from "../assets/developer.jpeg"



const HomePage = () => {
  const navigate = useNavigate();
  const [swap, setSwap] = useState(false); // 🔹 false: algo önde, true: blazr önde

  const handleSwap = () => setSwap((s) => !s);

  return (
    <div className="page">
      {/* Üst NAV */}
      <header className="nav">
        <div className="nav-left">blazr</div>
        <nav className="nav-center">
          <a className="pill" href="#howto">how to use</a>
          <a className="pill" href="/developer">for projects</a>
          <a className="pill" href="/">homepage</a>
          <a className="pill" href="/investor">algoinvest</a>
        </nav>
        <div className="nav-right">
          <DeflyConnect />
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          {/* Sol: Logo + blazr */}
          <div className="hero-brand">
            <img src={Logo} alt="blazr logo" className="hero-logo" />
            <div className="brand-giant">blazr</div>
          </div>

          {/* Sağ: İKİ KART – animasyonlu yer değiştirme */}
          <div className={`card-stack v2 ${swap ? "swap" : ""}`}>
            {/* ALGO kart (içerik sabit), konumu swap sınıfı ile değişir */}
            <div className="card card-algo">
              <div className="thumb">
                <img src={algoLogo} alt="Algorand" />
              </div>
              <div className="card-title">algorand</div>

              <p className="card-desc">
                Builders of the most powerful and sustainable blockchain.
              </p>

              <div className="arrow-row">
                <button className="arrow-btn" onClick={handleSwap}>
                  <FaArrowLeft />
                </button>
                <button className="arrow-btn" onClick={handleSwap}>
                  <FaArrowRight />
                </button>
              </div>
            </div>

            {/* BLAZR kart (içerik sabit), konumu swap sınıfı ile değişir */}
            <div className="card card-blazr">
              <div className="thumb thumb-soft">
                <img src={crazy} alt="blazr" />
              </div>
              <div className="card-title">blazr</div>
              <p className="card-desc">
                Fast, low-cost, and fun — Blazr makes decentralized investing accessible to everyone.
              </p>
              <div className="arrow-row">
                <button className="arrow-btn" onClick={handleSwap}>
                  <FaArrowLeft />
                </button>
                <button className="arrow-btn" onClick={handleSwap}>
                  <FaArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alt içerik (aynı) */}
            <section id="howto" className="content">
        <div className="content-inner">
          <div className="content-left">
            <h1>Fast Swipes, Smart Gains.</h1>
            <p>
              BLAZR is a swipe-to-invest DeFi app running on Algorand.
              Built on Algorand’s instant finality and low fees, it lets you
              invest with a single swipe.
            </p>
            <button className="docs-btn">go docs</button>
          </div>

          <div className="content-right">
            {/* sağ tarafta stacked kartlar */}
            <div className="howto-cards">
              {/* en öndeki sarımsı kart */}
              <div className="hc hc-top">
                <div className="hc-thumb">
                  <img src={algoLogo} alt="algorand" />
                </div>
                <span className="hc-tag">defi</span>
              </div>

              {/* ortadaki gri kart */}
              <div className="hc hc-mid">
                <span className="hc-tag">gamefi</span>
              </div>

              {/* en arkadaki koyu gri kart */}
              <div className="hc hc-back">
                <span className="hc-tag">meme</span>
              </div>
            </div>
          </div>
        </div>
      </section>

                  {/* Alt: 2 bilgi kartı */}
      <section className="content content--cards">
        <div className="cards-inner">
          {/* Developer Kartı */}
          <div className="info-card">
            <div className="info-card-thumb">
              <img src={developer} alt="Developer" />
            </div>
            <h3 className="info-card-title">Developer</h3>
            <p className="info-card-desc">
              Upload your projects, secure your intellectual property, and showcase 
              your work to potential investors with ease.
            </p>
          </div>

          {/* Investor Kartı */}
          <div className="info-card">
            <div className="info-card-thumb">
              <img src={investor} alt="Investor" />
            </div>
            <h3 className="info-card-title">Investor</h3>
            <p className="info-card-desc">
              Swipe through projects, discover opportunities, and support ideas you 
              believe in—all in one simple interface.
            </p>
          </div>
        </div>
      </section>




                <footer className="footer">
            <div className="footer-inner">
              {/* Sol: Logo */}
              <div className="footer-logo">Blazr</div>

              {/* Orta: Link sütunları */}
              <div className="footer-links">
                <div className="footer-col">
                  <h4>Our apps</h4>
                  <a href="#">Blazr invest</a>
                  <a href="#">Blazr for developers</a>
                </div>

                <div className="footer-col">
                  <h4>Company</h4>
                  <a href="#">About</a>
                  <a href="#">Contact us</a>
                  <a href="#">Investors</a>
                  <a href="#">developers</a>
                  <a href="#">top 10 list</a>
                  <a href="#">Support</a>
                </div>

                <div className="footer-col">
                  <h4>Legal</h4>
                  <a href="#">Guidelines</a>
                  <a href="#">Privacy policy</a>
                  <a href="#">Terms and conditions</a>
                  <a href="#">Accessibility</a>
                </div>
              </div>
            </div>

            {/* Alt satır */}
            <div className="footer-bottom">
              <div className="footer-social">
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-facebook"></i></a>
                <a href="#"><i className="fab fa-x-twitter"></i></a>
                <a href="#"><i className="fab fa-linkedin"></i></a>
                <a href="#"><i className="fab fa-youtube"></i></a>
                <a href="#"><i className="fab fa-tiktok"></i></a>
              </div>
              <div className="footer-actions">
                <button className="sign-btn">Sign in</button>
              </div>
            </div>
          </footer>



    </div>
  );
};

export default HomePage;
