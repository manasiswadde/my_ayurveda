import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const aboutSectionRef = useRef(null);
  const contactSectionRef = useRef(null);

  const handleGetStarted = () => {
    navigate('/signup');
  };

  // Scroll to the About or Contact section based on URL hash
  useEffect(() => {
    if (window.location.hash === '#about') {
      aboutSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (window.location.hash === '#contact') {
      contactSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="homepage">
      <header className="homepage-header">
        <div className="logo-container">
          <img src="/logo.png" alt="Ayurveda Logo" className="logo-image" />
          <span className="logo-text">Ayurveda</span>
        </div>
        <nav className="navbar">
          <a href="/">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a> {/* Link to the Contact section */}
        </nav>
      </header>
      <main className="homepage-main">
        <h1 className="main-heading">
          Discover the Power of <span className="highlight">Ayurvedic</span> Healing
        </h1>
        <p className="main-description">
          Explore ancient wisdom with modern understanding. Your journey to holistic wellbeing starts here.
        </p>
        <button className="get-started-btn" onClick={handleGetStarted}>
          Get Started
        </button>
      </main>

      {/* Features Section */}
      <section className="features">
        <div className="feature">
          <img src="/natural-medicine.png" alt="Natural Remedies" />
          <h3>Natural Remedies</h3>
          <p>Discover traditional Ayurvedic herbs and their healing properties</p>
        </div>
        <div className="feature">
          <img src="/holistic.png" alt="Holistic Wellness" />
          <h3>Holistic Wellness</h3>
          <p>Learn about balanced living through Ayurvedic principles</p>
        </div>
        <div className="feature">
          <img src="/expert.png" alt="Expert Guidance" />
          <h3>Expert Guidance</h3>
          <p>Access verified Ayurvedic practitioners and authentic knowledge</p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutSectionRef} className="about-section">
        <h2>About Ayurvedic Plants and Medicine</h2>
        <p>
          Ayurveda, the ancient Indian system of medicine, has been using plants and natural remedies for thousands of years to promote health and wellness. Ayurvedic plants like <span className="highlight">Ashwagandha</span>, <span className="highlight">Tulsi</span>, <span className="highlight">Turmeric</span>, and <span className="highlight">Neem</span> are known for their powerful healing properties.
        </p>
        <p>
          These plants are used to treat a variety of conditions, from stress and anxiety to inflammation and digestive issues. Ayurvedic medicine emphasizes the balance of mind, body, and spirit, and these plants play a crucial role in achieving that balance.
        </p>
        <div className="about-images">
          <img src="/ashwagandha.jpg" alt="Ashwagandha" />
          <img src="/tulsi.jpg" alt="Tulsi" />
          <img src="/turmeric.jpg" alt="Turmeric" />
          <img src="/neem.jpg" alt="Neem" />
        </div>

        {/* Importance of Ayurveda Plants */}
        <div className="importance-section">
          <h3>Why Ayurvedic Plants Are Important</h3>
          <p>
            Ayurvedic plants are nature's gift to humanity. They are rich in antioxidants, anti-inflammatory compounds, and other bioactive substances that help in:
          </p>
          <ul>
            <li>Boosting immunity</li>
            <li>Reducing stress and anxiety</li>
            <li>Improving digestion and metabolism</li>
            <li>Promoting healthy skin and hair</li>
            <li>Enhancing overall vitality and longevity</li>
          </ul>
        </div>

        {/* Quotes Section */}
        <div className="quotes-section">
          <h3>Quotes on Ayurveda</h3>
          <blockquote>
            "Ayurveda is not just a system of medicine; it is a way of life that teaches us how to live in harmony with nature."
          </blockquote>
          <blockquote>
            "The greatest medicine is the one that heals the mind, body, and soul together."
          </blockquote>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactSectionRef} className="contact-section">
        <h2>Contact Us</h2>
        <p>
          Have questions or need more information about Ayurveda? Reach out to us!
        </p>
        <div className="contact-info">
          <div className="contact-item">
            <img src="/mail.png" alt="Email" className="contact-icon" />
            <p>Email: info@ayurveda.com</p>
          </div>
          <div className="contact-item">
            <img src="/phone.png" alt="Phone" className="contact-icon" />
            <p>Phone: +1 (123) 456-7890</p>
          </div>
          <div className="contact-item">
            <img src="/address.png" alt="Location" className="contact-icon" />
            <p>Address: 123 Ayurveda Lane, Wellness City, Earth</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;