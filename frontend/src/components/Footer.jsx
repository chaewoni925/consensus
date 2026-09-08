import { Link } from 'react-router-dom';

const CONTACT_INFO = {
    cafeUrl: "https://cafe.naver.com/cukconsensus",
    instagramUrl: "https://www.instagram.com/cuk_consensus",
    email: "mailto:consensus.cuk@gmail.com",
};

function Footer() {
    return (
        <footer style={{
            background: '#040814',
            borderTop: '1px solid rgba(59,130,246,.14)',
            padding: '36px clamp(16px, 4vw, 48px)',
            color: '#94A3B8',
            fontSize: '13px'
        }}>
            <div style={{
                maxWidth: '1280px',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '20px'
            }}>
                {/* Left section: Logo & Name */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ fontSize: '11px', color: '#64748B', letterSpacing: '.06em', textTransform: 'uppercase' }}>
                        가톨릭대학교 금융학회 CONSENSUS
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img src="/logo.png" alt="CONSENSUS Logo" style={{ height: '36px', width: 'auto', objectFit: 'contain' }} />
                        <div style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontWeight: 800,
                            fontSize: '24px',
                            letterSpacing: '-.03em',
                            color: '#F8FAFC'
                        }}>
                            CONSENSUS
                        </div>
                    </div>
                </div>

                {/* Right section: Contact Us & Social Links */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <span style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontWeight: 700,
                            fontSize: '15px',
                            color: '#F1F5F9',
                            letterSpacing: '-.01em'
                        }}>
                            Contact Us
                        </span>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            {/* Email Link */}
                            <a
                                href={CONTACT_INFO.email}
                                title="이메일 문의"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '34px',
                                    height: '34px',
                                    borderRadius: '8px',
                                    background: 'rgba(59,130,246,.08)',
                                    border: '1px solid rgba(59,130,246,.2)',
                                    color: '#CBD5E1',
                                    transition: 'all .2s ease'
                                }}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="4" width="20" height="16" rx="2" />
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                </svg>
                            </a>

                            {/* Instagram Icon */}
                            <a
                                href={CONTACT_INFO.instagramUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="인스타그램"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '34px',
                                    height: '34px',
                                    borderRadius: '8px',
                                    background: 'rgba(59,130,246,.08)',
                                    border: '1px solid rgba(59,130,246,.2)',
                                    color: '#CBD5E1',
                                    transition: 'all .2s ease'
                                }}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                </svg>
                            </a>

                            {/* Naver Cafe Icon */}
                            <a
                                href={CONTACT_INFO.cafeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="네이버 카페"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '34px',
                                    height: '34px',
                                    borderRadius: '8px',
                                    background: 'rgba(59,130,246,.08)',
                                    border: '1px solid rgba(59,130,246,.2)',
                                    color: '#CBD5E1',
                                    transition: 'all .2s ease'
                                }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M16.273 12.845L7.376 0H0v24h7.726v-12.845L16.624 24H24V0h-7.727v12.845z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div style={{ fontSize: '11.5px', color: '#475569', marginTop: '4px' }}>
                        Copyright © 2026 CONSENSUS. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
