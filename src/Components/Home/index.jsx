import React, { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

import BandSelector from '../BandSelector';
import CaseSelector from '../CaseSelector';

import './index.css';

const Home = () => {
    const [getStarted, setGetStarted] = useState(true);
    const [showSideView, setShowSideView] = useState(false);
    const [toggleFeature, setToggleFeature] = useState('watch');

    const watchRef = useRef();
    const getStartedRef = useRef();

    const { contextSafe } = useGSAP();

    const handleGetStarted = contextSafe(() => {
        setGetStarted(false);

        const tl = gsap.timeline();
        tl.to(getStartedRef.current, {
            opacity: 0,
            display: 'none',
            duration: 0.9,
        });
        tl.to(watchRef.current, {
            maxWidth: '380px',
            duration: 1.5,
        });
    });

    const handleSideView = () => {
        setShowSideView(!showSideView);
    }

    useEffect(() => {
        localStorage.setItem("centerFaceImageIndex", 0);
        localStorage.setItem("centerStrapImageIndex", 0);
    }, []);

    const renderContent = () => {
        switch (toggleFeature) {
            case 'watch':
                return (
                    <>
                        <div ref={watchRef} className='watch-container'>
                            {showSideView ? (
                                <img className='watch-side-view-image' src='/Images/watch-leftView.jpeg' alt="watch" />
                            ) : (
                                <>
                                    <img className='watch-band' src="/Images/watch-band.jpg" alt="watch-band" />
                                    <img className='watch-case' src="/Images/watch-case.png" alt="watch-case" />
                                </>
                            )}
                        </div>
                        {!getStarted && <div className='watch-details-container'>
                            <button onClick={handleSideView}>{showSideView ? 'Front View' : ' Side View'}</button>
                            <h2>APPLE WATCH SERIES 10</h2>
                            <p>46mm Jet Black Aluminum Case with Black Solo Loop</p>
                            <p>From $429</p>
                        </div>}
                    </>
                );
            case 'band':
                return <BandSelector />;
            case 'case':
                return <CaseSelector />;
            case 'size':
                return <BandSelector />;
            default:
                return null;
        }
    }

    return (
        <>
            <img className='logo' src="/Images/apple-watch-logo.jpg" alt="logo" />
            <div className='main-container'>

                {!getStarted && (
                    <>
                        <div className='select-collection-container'>
                            Collections
                        </div>
                        <button className='save-button'>Save</button>
                    </>
                )}

                <div ref={getStartedRef} className='get-started-container'>
                    <h1>Apple Watch Studio</h1>
                    <p>Choose a case.<br /> Pick a band.<br /> Create your own style.</p>
                    <button onClick={handleGetStarted}>Get Started</button>
                </div>

                {renderContent()}

                {!getStarted && (
                    <>
                        <div className='features-container'>
                            <button onClick={() => setToggleFeature('size')}>
                                <img src="/Images/watch-size.svg" alt="watch-size" />
                                Size
                            </button>
                            <button onClick={() => setToggleFeature('case')}>
                                <img src="/Images/watch-case.svg" alt="watch-case" />
                                Case
                            </button>
                            <button onClick={() => setToggleFeature('band')}>
                                <img src="/Images/watch-band.svg" alt="watch-band" />
                                Band
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}
export default Home;
