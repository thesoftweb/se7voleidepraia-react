import { useEffect, useState } from 'react';

interface Unit {
    id:number;
    name: string;
}

export const useUnidades = () => {
    const [units, setUnits] = useState<Unit[]>([]);

    useEffect(() => {
        fetch('https://app.se7voleidepraia.com.br/api/units')
            .then((response) => response.json())
            .then((data) => {
                console.log('API Data:', data);
                setUnits(data.data);
            })
            .catch((error) => {
                console.error('API Error:', error);
            });
    }, []);

    return {
        units,
    };
};
