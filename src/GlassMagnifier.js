import React, { useState } from 'react';

const GlassMagnifier = () => {
    const [magnifierSize, setMagnifierSize] = useState(30); // default size 30%
    const [borderSize, setBorderSize] = useState(5); // default border size 5
    const [borderColor, setBorderColor] = useState('rgba(255, 255, 255, .5)'); // default border color
    const [allowOverflow, setAllowOverflow] = useState(true); // default allow overflow
    const [shape, setShape] = useState(''); // default shape: circle

    return (
        <div className="example-container">
            <h2>Glass Magnifier</h2>
            <div className="flex">
                <div className="input-position" style={{ position: 'relative', overflow: 'visible', userSelect: 'none', cursor: 'crosshair' }}>
                    <img src="https://adamrisberg.github.io/react-image-magnifiers/4700d4cb26b14563be996aa5f0c53ca2.jpg" alt="" style={{ width: '100%', display: 'block', boxSizing: 'border-box', cursor: 'none' }} />
                    <div
                        style={{
                            position: 'absolute',
                            boxSizing: 'border-box',
                            pointerEvents: 'none',
                            width: `${magnifierSize * 2.064}px`, // scaling based on size
                            height: `${magnifierSize * 2.064}px`, // scaling based on size
                            top: '0px',
                            left: '0px',
                            visibility: 'hidden',
                            borderRadius: shape === 'true' ? '0%' : '50%', // square or circle
                            zIndex: 1,
                            border: `${borderSize}px solid ${borderColor}`,
                            transform: 'translate(570.3px, -17.6531px)',
                            backgroundColor: 'rgba(225, 225, 225, 0.5)',
                            backgroundClip: 'padding-box'
                        }}
                    >
                        <img
                            src="https://adamrisberg.github.io/react-image-magnifiers/4700d4cb26b14563be996aa5f0c53ca2.jpg"
                            alt=""
                            style={{
                                position: 'absolute',
                                boxSizing: 'border-box',
                                display: 'block',
                                top: '0px',
                                left: '0px',
                                transform: 'translate(-2105.36px, -181.698px)',
                                zIndex: 1,
                                visibility: 'hidden',
                                width: 'auto'
                            }}
                        />
                    </div>
                </div>

                <div className="controls">
                    <div className="label-flex">
                        <label className="label-left">
                            Allow Overflow:
                            <select value={allowOverflow} onChange={(e) => setAllowOverflow(e.target.value === 'true')}>
                                <option value="false">false</option>
                                <option value="true">true</option>
                            </select>
                        </label>
                        <label className="label-right">
                            Shape:
                            <select value={shape} onChange={(e) => setShape(e.target.value)}>
                                <option value="">Circle</option>
                                <option value="true">Square</option>
                            </select>
                        </label>
                    </div>
                    <div className="label-flex">
                        <label className="label-left">
                            Magnifier Size:
                            <select value={magnifierSize} onChange={(e) => setMagnifierSize(Number(e.target.value))}>
                                <option value="15">15%</option>
                                <option value="20">20%</option>
                                <option value="25">25%</option>
                                <option value="30">30%</option>
                                <option value="35">35%</option>
                                <option value="40">40%</option>
                                <option value="45">45%</option>
                                <option value="50">50%</option>
                            </select>
                        </label>
                        <label className="label-right">
                            Border Size:
                            <select value={borderSize} onChange={(e) => setBorderSize(Number(e.target.value))}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                        </label>
                    </div>
                    <label className="label">
                        Border Color: <span className="note">(Use valid CSS color)</span>
                        <input
                            type="text"
                            value={borderColor}
                            onChange={(e) => setBorderColor(e.target.value)}
                        />
                    </label>
                </div>
            </div>
        </div>
    );
};

export default GlassMagnifier;
