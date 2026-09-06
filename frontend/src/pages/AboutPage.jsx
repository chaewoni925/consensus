import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

function AboutPage() {
    const [histories, setHistories] = useState([]);

    useEffect(() => {
        axiosInstance.get('/api/histories')
            .then((response) => setHistories(response.data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div>
            <h1>연혁</h1>
            {histories.map((item) => (
                <div key={item.id}>
                    {item.year} - {item.content}
                </div>
            ))}
        </div>
    );
}

export default AboutPage;