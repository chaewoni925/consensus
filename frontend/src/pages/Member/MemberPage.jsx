import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';

function MemberPage() {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        axiosInstance.get('/api/members')
            .then((response) => setMembers(response.data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div>
            <h1>임원진</h1>
            {members.map((member) => (
                <div key={member.id}>
                    <p>{member.name} - {member.position}</p>
                    <p>{member.intro}</p>
                </div>
            ))}
        </div>
    );
}

export default MemberPage;