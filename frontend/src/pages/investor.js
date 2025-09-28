import React, { useState, useEffect, useRef } from 'react';
import './Investor.css';
import BlazrLogo from '../assets/blazarsvg.svg';
import LogoInvest from '../assets/blazr_ınvest.svg';
import Proje1 from '../assets/ornekprojelogosvg.svg';
import { investToProject } from '../investToProject';
import { claimReward } from '../claimReward';
import deflyWallet  from '../DeflyConnect.js'; // Cüzdan bağlantısı


const Investor = () => {
    const [currentProject, setCurrentProject] = useState(0);
    const [investedProjects, setInvestedProjects] = useState([]);
    const [showInvestmentOptions, setShowInvestmentOptions] = useState(false);
    const [selectedAmount, setSelectedAmount] = useState(null);
    const [investmentDone, setInvestmentDone] = useState(false);
    const [investmentLike, setInvestmentLike] = useState(false);
    const [isDetailMode, setIsDetailMode] = useState(false); // detay modu kontrolü 
    const [accountAddress, setAccountAddress] = useState(null); // Cüzdan adresi


    const detailsRef = useRef(null);

    const userAddress = "0xAlg0rh4ca7moN";

    useEffect(() => {
        const connectWallet = async () => {
            try {
                const accounts = await deflyWallet.connect(); // DeflyWallet bağlantısı
                if (accounts && accounts.length > 0) {
                    setAccountAddress(accounts[0]);
                }
            } catch (err) {
                console.error("Cüzdan bağlama hatası:", err);
            }
        };
        connectWallet();
    }, []);


    const projects = [
        {
            id: 1,
            name: 'Algorand',
            invest: true,
            category: 'gamfi',
            topic: 'Yenilenebilir enerji üreticilerinin verilerini şeffaf şekilde blockchain üzerinde saklayarak hem bireysel hem kurumsal kullanıcıların karbon ayak izini azaltmalarına yardımcı olan bir takip ve analiz platformu.',
            logo: Proje1,
            metrics: {
                targetRaise: '192.9 K',
                tokenPrice: '192.9 K',
                initialMcap: '192.9 K',
            },
            details: 'Bu proje bir yapay zeka destekli araçtır. Daha fazla bilgi: Bu araç, kullanıcıların verilerini analiz ederek akıllı öneriler sunar.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laboruBu proje bir yapay zeka destekli araçtır. Daha fazla bilgi: Bu araç, kullanıcıların verilerini analiz ederek akıllı öneriler sunar.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborumBu proje bir yapay zeka destekli araçtır. Daha fazla bilgi: Bu araç, kullanıcıların verilerini analiz ederek akıllı öneriler sunar.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborumBu proje bir yapay zeka destekli araçtır. Daha fazla bilgi: Bu araç, kullanıcıların verilerini analiz ederek akıllı öneriler sunar.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum '
        },
        {
            id: 2,
            name: 'Green Energy Tracker',
            invest: true,
            category: 'energy',
            topic: 'Yenilenebilir enerji üreticilerinin verilerini şeffaf şekilde blockchain üzerinde saklayarak hem bireysel hem kurumsal kullanıcıların karbon ayak izini azaltmalarına yardımcı olan bir takip ve analiz platformu.',
            logo: 'https://cryptologos.cc/logos/algorand-algo-logo.png?v=025',
            metrics: {
                targetRaise: '50 K',
                tokenPrice: '0.05 $',
                initialMcap: '100 K',
            },
            details: 'Bu proje, güneş ve rüzgar enerjisi üreticilerinin verilerini blockchain üzerinde kaydedip analiz etmelerini sağlar. Kullanıcılar karbon ayak izlerini azaltırken, devlet ve özel sektör için raporlama imkanı sunar. Yatırımcılar, platformun büyümesi ve yeni veri analiz modülleri geliştirilmesi için fon sağlayabilirler. Proje, sürdürülebilirlik ve çevre dostu teknolojiler arayan yatırımcılar için cazip bir fırsattır.'
        },
        {
            id: 3,
            name: 'Blokchain Eğitim Platformu',
            invest: true,
            category: 'education',
            topic: 'Blockchain ve Web3 teknolojileri hakkında kapsamlı ve erişilebilir online eğitim, atölye ve sertifika programları sunarak hem yeni başlayanların hem profesyonellerin dijital becerilerini geliştirmeyi amaçlayan bir platform.',
            logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=025',
            metrics: {
                targetRaise: '20 K',
                tokenPrice: '0.10 $',
                initialMcap: '30 K',
            },
            details: 'Web3 ve blockchain teknolojileriyle ilgili online kurslar, atölyeler ve sertifika programları sunan bir platform. Eğitim içerikleri alanında uzman kişiler tarafından hazırlanıyor. Yatırım ile daha fazla kurs geliştirilecek, global pazara açılım sağlanacak ve öğrencilere burs imkanı sunulacak. Proje, eğitimde erişilebilirlik ve yeni nesil dijital beceriler konusunda fark yaratmayı hedefliyor.'
        },
        {
            id: 4,
            name: 'NFT Sanat Pazarı',
            invest: true,
            category: 'NFT',
            topic: 'Dijital sanatçıların eserlerini NFT olarak mint ederek küresel koleksiyonerlerle buluşturduğu, güvenli ve yenilikçi bir Algorand tabanlı pazar yeri.',
            logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=025',
            metrics: {
                targetRaise: '100 K',
                tokenPrice: '1 $',
                initialMcap: '150 K',
            },
            details: 'Sanatçıların dijital eserlerini NFT olarak kolayca mint edip satabildiği, Algorand tabanlı bir pazar yeri. Yatırım ile yeni sanatçıların platforma kazandırılması, uluslararası etkinliklerin düzenlenmesi ve güvenli ödeme/entegrasyon sistemlerinin geliştirilmesi hedefleniyor. Sanatseverler ve koleksiyonerler için yenilikçi bir dijital sanat deneyimi sunuyor.'
        },
        {
            id: 5,
            name: 'Sağlık Takip Uygulaması',
            invest: true,
            category: 'health',
            topic: 'Kullanıcıların sağlık verilerini güvenli şekilde analiz eden, kişiselleştirilmiş öneriler ve anonim veri paylaşımı ile hem bireylerin hem araştırmacıların sağlık alanında ilerlemesine katkı sağlayan bir dijital platform.',
            logo: 'https://cryptologos.cc/logos/cardano-ada-logo.png?v=025',
            metrics: {
                targetRaise: '80 K',
                tokenPrice: '90$',
                initialMcap: '100$',
            },
            details: 'Kullanıcılar günlük sağlık verilerini (adım sayısı, kalp ritmi, uyku düzeni) güvenli bir şekilde kaydedip analiz edebiliyor. Proje, algoritmalarla kişiye özel öneriler sunuyor ve verileri anonim şekilde araştırma kurumlarıyla paylaşabiliyor. Yatırım ile yeni özellikler (AI tabanlı sağlık analizi, doktor entegrasyonu) geliştirilecek. Sağlık teknolojileri alanında dijital dönüşüm hedefliyor.'
        }
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
        setInvestmentLike(false);
        setIsDetailMode(false);
        setCurrentProject((prev) => (prev + 1) % projects.length);
        if (detailsRef.current) detailsRef.current.scrollTop = 0;
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

    const onConfirmInvestment = async () => {
        if (!accountAddress) {
            alert("Cüzdan bağlı değil!");
            return;
        }
        if (selectedAmount && selectedAmount !== '') {
            try {
                await investToProject(accountAddress, selectedAmount);

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
                setTimeout(() => setInvestmentDone(false), 2500);
            } catch (err) {
                alert("Blockchain yatırım hatası: " + err.message);
            }
        } else {
            alert('Lütfen bir yatırım miktarı seçin veya girin.');
        }
    };
    const onClaim = async () => {
        if (!accountAddress) {
            alert("Cüzdan bağlı değil!");
            return;
        }
        try {
            await claimReward(accountAddress);
        } catch (err) {
            alert("Claim sırasında hata: " + err.message);
        }
    };

    const onLikeConfirmClick = () => {
        setInvestmentLike(true);
        setShowInvestmentOptions(false);
        setSelectedAmount(null);
        setTimeout(() => {
            setInvestmentLike(false);
            nextProject();
        }, 2500);
    };

    const current = projects[currentProject];
    const investedProjectsList = investedProjects;

    // Scroll event handler for detail mode toggling
    const onDetailsScroll = (e) => {
        const scrollTop = e.target.scrollTop;
        const scrollHeight = e.target.scrollHeight;
        const clientHeight = e.target.clientHeight;

        const canScroll = scrollHeight > clientHeight;

        // Scroll yoksa veya scroll en alta yakınsa detay panel aç
        if (!canScroll || (scrollTop + clientHeight >= scrollHeight - 20)) {
            setIsDetailMode(true);
        } else if (scrollTop < 10) {
            setIsDetailMode(false);
        }
    };

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
                                        setIsDetailMode(false);
                                        if (detailsRef.current) detailsRef.current.scrollTop = 0;
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
                    {accountAddress && (
                        <button
                            className="claim-button"
                            onClick={onClaim}
                        >
                            Claim Rewards
                        </button>
                    )}
                </div>
                <div className="sidebar-bottom-logo">
                    <img alt="blazr logo" src={BlazrLogo} style={{ width: '150px' }} />
                </div>
            </div>

            <div className="main-content">
                {current.invest ? (

                    <div className={`project-card ${isDetailMode ? 'detail-mode' : ''}`}>
                        <div className="card-logo-container">
                            <img src={LogoInvest} alt="Invest Logo" />
                        </div>
                        {!isDetailMode ? (
                            <>
                                <div className="project-card-left">
                                    <img src={current.logo} alt={`${current.name} logo`} />
                                </div>
                                <div className="project-card-right">
                                    {/* Başlığı sağa ve dikey ortalı göster */}
                                    <div className="header-right">
                                        <h2 className="project-title-right">{current.name}</h2>
                                        <div className="subtitle">{current.category}</div>
                                    </div>
                                    {/* Topic kısmı */}
                                    <div className="project-topic">{current.topic}</div>
                                    {/* Metrics kısmı tam ortalı olsun */}
                                    <div className="project-metrics metrics-center">
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
                                    <button className="show-detail-btn" onClick={() => setIsDetailMode(true)}>
                                        Detayları Gör
                                    </button>
                                    {isDetailMode && (
                                        <div
                                            ref={detailsRef}
                                            className="project-details"
                                            onScroll={onDetailsScroll}
                                        >
                                            {current.details}
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div
                                ref={detailsRef}
                                className="project-details full-detail"
                                onScroll={onDetailsScroll}
                            >
                                <h2>{current.name}</h2>
                                <p>{current.details}</p>
                                <button className="close-detail-btn" onClick={() => setIsDetailMode(false)}>Kapat</button>
                            </div>
                        )}

                        {/* Overlay ve diğer modallar */}
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
                ) : (
                    <div className={`project-card2 ${isDetailMode ? 'detail-mode' : ''}`}>
                        {!isDetailMode ? (
                            <>
                                <div className="card-logo-container">
                                    <img src={LogoInvest} alt="Invest Logo" />
                                </div>
                                <div className="project-card-left2">
                                    <img src={current.logo} alt={`${current.name} logo`} />
                                </div>
                                <div className="project-card-right2">
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
                                    <div
                                        ref={detailsRef}
                                        className="project-details2"
                                        onScroll={onDetailsScroll}
                                    >
                                        {current.details}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div
                                ref={detailsRef}
                                className="project-details full-detail2"
                                onScroll={onDetailsScroll}
                            >
                                <h2>{current.name}</h2>
                                <p>{current.details}</p>
                                <button className="close-detail-btn" onClick={() => setIsDetailMode(false)}>Kapat</button>
                            </div>
                        )}

                        {/* Overlay ve diğer modallar */}
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
                                            PAS
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {!showInvestmentOptions && !investmentDone && !investmentLike && !isDetailMode && (
                    current.invest ? (
                        <div className="buttons">
                            <button className="skip-button" onClick={nextProject}>✕</button>
                            <button className="like-button" onClick={onLikeConfirmClick}>★</button>
                            <button className="confirm-button" onClick={onLikeClick}>✓</button>
                        </div>
                    ) : (
                        <div className="buttons">
                            <button className="dislike-button" onClick={nextProject}>👎🏼</button>
                            <button className="pass-button" onClick={nextProject}>Pas</button>
                            <button className="like-button" onClick={onLikeConfirmClick}>👍🏼</button>
                        </div>
                    )
                )}
            </div>

            {investmentDone && (
                <div className="investment-done">
                    Yatırım yapıldı. <span className="checkmark">✔️</span>
                    <div className="done-buttons">
                        <button className="skip-button" onClick={nextProject}>Sonraki</button>
                    </div>
                </div>
            )}
            {investmentLike && (
                <div className="investment-done">
                    Yatırım Beğenildi <span className="checkmark">✔️</span>
                    <div className="done-buttons">
                        <button className="skip-button" onClick={nextProject}>Sonraki</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Investor;