import { useState } from 'react';
import axiosInstance from '../../api/axiosInstance';

function JoinUsPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubscribe = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/api/subscribers', { email });
            setMessage('구독 완료! 모집 소식을 받아보실 수 있어요.');
            setEmail('');
        } catch (error) {
            setMessage('이미 등록된 이메일이거나 오류가 발생했어요.');
        }
    };

    return (
        <div>
            <h1>Join Us</h1>

            <section>
                <h2>모집 소식 받기</h2>
                <form onSubmit={handleSubscribe}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="이메일을 입력하세요"
                        required
                    />
                    <button type="submit">구독하기</button>
                </form>
                {message && <p>{message}</p>}
            </section>

            <section>
                <h2>지원서 양식 다운로드</h2>
                <a href={`${import.meta.env.VITE_API_BASE_URL}/api/join-us/form`}>
                    지원서 다운로드
                </a>
            </section>
        </div>
    );
}

export default JoinUsPage;