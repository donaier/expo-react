import React from 'react';

function HomeHero() {
  return (
    <>
      <section className="hero is-large home-hero">
        <nav className="navbar is-fixed-top">
          <div className="container">
            <div className="navbar-brand">
              <a className="navbar-item" href="/">
                <h1 className="title is-1 has-text-primary">exposition</h1>
              </a>
            </div>
          </div>
        </nav>
        <div className="hero-body">
          <p className="title">
            <span className="has-text-info">#</span>
            <span className="has-text-primary">Living</span>
            <span className="has-text-success">Men</span>
            <span className="has-text-warning">Ride</span>
            <span className="has-text-info">Free</span>
          </p>
        </div>
      </section>
      <div className="level fancy-spacer"></div>
    </>
  );
}

export { HomeHero };
