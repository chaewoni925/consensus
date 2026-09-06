import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';

function ActivityPage() {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        axiosInstance.get('/api/activities')
            .then((response) => setActivities(response.data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div>
            <h1>활동 정리</h1>
            {activities.map((activity) => (
                <div key={activity.id}>
                    <h3>{activity.title}</h3>
                    <p>{activity.activityDate}</p>
                    <p>{activity.description}</p>
                </div>
            ))}
        </div>
    );
}

export default ActivityPage;