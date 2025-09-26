import React, { useState, useEffect } from 'react';
import './Investor.css';
import BlazrLogo from '../assets/blazarsvg.svg';
import Logo from '../assets/loog.svg';
import Proje1 from '../assets/ornekprojelogosvg.svg';
import LogoInvest from '../assets/blazr_ınvest.svg';

const Investor = () => {
    const [currentProject, setCurrentProject] = useState(0);
    const [investedProjects, setInvestedProjects] = useState([]); // stores {id, amount}
    const [showInvestmentOptions, setShowInvestmentOptions] = useState(false);
    const [selectedAmount, setSelectedAmount] = useState(null);
    const [investmentDone, setInvestmentDone] = useState(false);


    const userAddress = "0xAlg0rh4ca7moN";

    const projects = [
        {
            id: 1,
            name: 'Algorand',
            category: 'gamfi',
            logo: Proje1,
            metrics: {
                targetRaise: '192.9 K',
                tokenPrice: '192.9 K',
                initialMcap: '192.9 K',
            },
            details: 'Bu proje bir yapay zeka destekli araçtır. Daha fazla bilgi: Bu araç, kullanıcıların verilerini analiz ederek akıllı öneriler sunar.'
        },
        {
            id: 2,
            name: 'Project Two',
            category: 'finance',
            logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=025',
            metrics: {
                targetRaise: '150 K',
                tokenPrice: '120 K',
                initialMcap: '130 K',
            },
            details: 'Bu proje bir sosyal medya uygulamasıdır. Daha fazla bilgi: Kullanıcılar fotoğraf paylaşabilir, arkadaş ekleyebilir ve mesajlaşabilir.'
        },
        {
            id: 3,
            name: 'Project Three',
            category: 'ecommerce',
            logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=025',
            metrics: {
                targetRaise: '200 K',
                tokenPrice: '180 K',
                initialMcap: '190 K',
            },
            details: 'Bu proje bir e-ticaret platformudur. Daha fazla bilgi: Bu platform, kullanıcıların ürün alıp satmasına olanak tanır ve güvenli ödeme sistemleri sunar.'
        },
    ];

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('investedProjects')) || [];
        setInvestedProjects(stored);
    }, []);

    const clearInvestedProjects = () => {
        setInvestedProjects([]);
        localStorage.removeItem('investedProjects');
    };

    const nextProject = () => {
        setShowInvestmentOptions(false);
        setSelectedAmount(null);
        setInvestmentDone(false);
        setCurrentProject((prev) => (prev + 1) % projects.length);
    };

    const onLikeClick = () => {
        setShowInvestmentOptions(true);
        setInvestmentDone(false);
    };

    const onAmountSelect = (amount) => {
        setSelectedAmount(amount);
    };

    const onOtherAmountChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setSelectedAmount(value);
        }
    };

    const onConfirmInvestment = () => {
        if (selectedAmount && selectedAmount !== '') {
            const likedProject = projects[currentProject];
            const existingIndex = investedProjects.findIndex(p => p.id === likedProject.id);
            let updatedInvestedProjects;
            if (existingIndex === -1) {
                updatedInvestedProjects = [...investedProjects, { ...likedProject, amount: selectedAmount }];
            } else {
                updatedInvestedProjects = [...investedProjects];
                updatedInvestedProjects[existingIndex].amount = selectedAmount;
            }
            setInvestedProjects(updatedInvestedProjects);
            localStorage.setItem('investedProjects', JSON.stringify(updatedInvestedProjects));
            setInvestmentDone(true);
            setShowInvestmentOptions(false);
            // istersen otomatik 2-3s sonra toast kapansın:
            setTimeout(() => setInvestmentDone(false), 2500);
        } else {
            alert('Lütfen bir yatırım miktarı seçin veya girin.');
        }
    };

    const current = projects[currentProject];
    const investedProjectsList = investedProjects;

    return (
        <div className="investor-container">
            <div className="sidebar">
                <div className="user-address">{userAddress}</div>
                <ul className="project-list">
                    {investedProjectsList.length === 0 ? (
                        <li className="empty-liked">Henüz yatırım yapılmadı</li>
                    ) : (
                        investedProjectsList.map((p) => {
                            const index = projects.findIndex(pr => pr.id === p.id);
                            return (
                                <li
                                    key={p.id}
                                    className={index === currentProject ? 'active-project' : ''}
                                    onClick={() => {
                                        setCurrentProject(index);
                                        setShowInvestmentOptions(false);
                                        setInvestmentDone(false);
                                        setSelectedAmount(null);
                                    }}
                                >
                                    {p.name} - {p.amount}$
                                </li>
                            );
                        })
                    )}
                </ul>
                <div className="liked-projects">
                    <h3>Yatırım Yapılanlar</h3>
                    <button className="clear-liked" onClick={clearInvestedProjects}>Yatırımları Temizle</button>
                </div>
                <div className="sidebar-bottom-logo">
                    <img alt="blazr logo" src={BlazrLogo} style={{ width: '150px' }} />
                </div>
            </div>

            <div className="main-content">
                <div className="card-logo-container">
                    <img src={LogoInvest} alt="Logo" className="card-top-logo" />
                </div>
                <div className="project-card">
                    {/* içerik */}
                    <div className="project-card-left">
                        <img src={current.logo} alt={`${current.name} logo`} />
                    </div>
                    <div className="project-card-right">
                        <div className="header">
                            <div className="logo-text">
                                <div className="category">{current.category.toUpperCase()}</div>
                                <h2>{current.name}</h2>
                                <div className="subtitle">{current.category}</div>
                            </div>
                            <div className="project-metrics">
                                <div>
                                    <div className="metric-label">target raise</div>
                                    <div className="metric-value">{current.metrics.targetRaise}</div>
                                </div>
                                <div>
                                    <div className="metric-label">token price</div>
                                    <div className="metric-value">{current.metrics.tokenPrice}</div>
                                </div>
                                <div>
                                    <div className="metric-label">initial mcap</div>
                                    <div className="metric-value">{current.metrics.initialMcap}</div>
                                </div>
                            </div>
                        </div>
                        <p className="project-details">{current.details}</p>

                        {!showInvestmentOptions && !investmentDone && (
                            <div className="buttons">
                                <button className="skip-button" onClick={nextProject}>✕</button>
                                <button className="like-button" onClick={onLikeClick}>★</button>
                                <button className="confirm-button" disabled>✓</button>
                            </div>
                        )}
                    </div>

                    {/* OVERLAY: seçim yapılırken tüm card'ı kaplar ve backdrop-filter ile blur uygular */}
                    {showInvestmentOptions && (
                        <div className="project-overlay">
                            <div className="investment-modal">
                                <div className="amount-buttons">
                                    {[5, 10, 15].map((amount) => (
                                        <button
                                            key={amount}
                                            className={`amount-button ${selectedAmount == amount ? 'selected' : ''}`}
                                            onClick={() => onAmountSelect(amount)}
                                        >
                                            {amount}$
                                        </button>
                                    ))}
                                </div>

                                <input
                                    type="text"
                                    placeholder="other $"
                                    value={selectedAmount ?? ''}
                                    onChange={onOtherAmountChange}
                                    className="other-amount-input"
                                />

                                <div className="investment-buttons">
                                    <button className="skip-button" onClick={nextProject}>✕</button>
                                    <button
                                        className="confirm-button"
                                        onClick={onConfirmInvestment}
                                        disabled={!selectedAmount || selectedAmount === ''}
                                    >
                                        ✓
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* FIXED TOAST - overlay'in üstünde görünür */}
            {investmentDone && (
                <div className="investment-done">
                    yatırım yapıldı <span className="checkmark">✔️</span>
                    <div className="done-buttons">
                        <button className="skip-button" onClick={nextProject}>Sonraki</button>
                    </div>
                </div>
            )}
           
        </div>
    );
};

export default Investor;