import { useEffect, useState } from 'react';
import api from '../services/api';

interface Unit {
    id: number;
    name: string;
}

export const useUnidades = () => {
    const [units, setUnits] = useState<Unit[]>([]);

    useEffect(() => {
        api.get('/units')
            .then((data) => {
                setUnits(data.data.data);
            })
            .catch((error) => {
                console.error('API Error:', error);
            });
    }, []);

    return {
        units,
    };
};
