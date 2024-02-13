import React from 'react'
import SliderAbout from './SliderAbout';
import '../css/About.scss';



const About = () => {
    return (
        <section className="about-section" id="about">
            <div className="about-section__left">
                <h4 className="display-2">WHAT IS OWARE?</h4>
                <h1 className="display-1 glitch-overlay" data-content="SOCIAL BATTLE">
                    <span>A Strategy Game</span>
                </h1>
                <hr className="line-separator"/>
                <div className="text-container">
                    <p className="about-text-info">
                    Oware is played on a board with 12 large play spaces (houses) around the outside of the board and one large score house for each player in the centre. Oware requires 48 BEADs of any colour. 4 BEADs are placed into each of the houses to start the game.
                        <br/>

                        <br />
                        Making the right decisions could be the
                        difference between <span className="underline">life and death.</span>
                    </p>
                </div>
            </div>
            <div className="about-section__right">
                <SliderAbout/>
            </div>
        </section>
    )
}

export default About