const CONTACT_INFO = {
    cafeUrl: "https://cafe.naver.com/https://cafe.naver.com/cukconsensus",
    instagramUrl: "https://instagram.com/https://www.instagram.com/cuk_consensus",
    kakaoOpenChatUrl: "https://open.kakao.com/여기에실제링크",
    email: "club@example.com",
};

function ContactPage() {
    return (
        <div>
            <h1>Contact</h1>
            <ul>
                <li>
                    <a href={CONTACT_INFO.cafeUrl} target="_blank" rel="noopener noreferrer">
                        네이버 카페
                    </a>
                </li>
                <li>
                    <a href={CONTACT_INFO.instagramUrl} target="_blank" rel="noopener noreferrer">
                        인스타그램
                    </a>
                </li>
                <li>
                    <a href={CONTACT_INFO.kakaoOpenChatUrl} target="_blank" rel="noopener noreferrer">
                        카카오톡 오픈채팅
                    </a>
                </li>
                <li>
                    이메일: <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>
                </li>
            </ul>
        </div>
    );
}

export default ContactPage;