import axios from 'axios';

const response = await axios.get('http://app.se7voleidepraia.com.br/api/courses', {
    params: {
        unit_id: 2,
        category: 'kids'
    }
});


