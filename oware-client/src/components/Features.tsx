import React from 'react'
import '../css/Features.scss';


const Features = () => {
    return (
        <section className="features-section" id="gamefeature">
            <div className="features-section__content-margin-right"></div>
            <div className="features-section__content">
                <h4 className="display-2">WHAT'S SO SPECIAL?</h4>
                <h1 className="display-1 glitch-overlay" data-content="FEATURES">
                    <span>FEATURES</span>
                </h1>

                <div className="features-accordion">
                    <div className="item-1">
                        <div className="features-accordion-title">
                            <button className="option option-1 activeted"></button>
                            <h2>STRATEGY</h2>
                        </div>
                        <div className="features-accordion-content">
                            <p>
                            Oware, rooted in Ashanti tradition, requires strategic thinking. Survive and outwit your opponent by capturing seeds and securing victory.
                            </p>
                        </div>
                    </div>
                    <div className="item-2">
                        <div className="features-accordion-title">
                            <span className="option option-2"></span>
                            <h2>FORM CONNECTIONS, CREATE DRAMA</h2>
                        </div>
                        <div className="features-accordion-content">
                            <p>
                            Forge unexpected connections with fellow players .Each move you make adds a twist to the unfolding story, making every Oware match a unique and thrilling experience.
                            </p>
                        </div>
                    </div>
                    <div className="item-3">
                        <div className="features-accordion-title">
                            <span className="option option-3"></span>
                            <h2>ENTERTAIN</h2>
                        </div>
                        <div className="features-accordion-content">
                            <p>
                            Impress the audience with your gameplay. Spectators discuss the game, offer advice, and make Oware a focal point for entertainment and socializing.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Features