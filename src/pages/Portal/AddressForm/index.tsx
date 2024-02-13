import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/Shared/Buttons';
import './styles.css';
import ReactInputMask from 'react-input-mask';

interface AddressFormData {
    address_zipcode: string;
    street_name: string;
    city_name: string;
    neighborhood_name: string;
    state_name: string;
    address_number: string;
    address_complement?: string;
}

export const AddressForm: React.FC = () => {
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);
    const adrress = new URLSearchParams(location.search).get("adrress");
    console.log('adrress', adrress);

    const [formData, setFormData] = useState<AddressFormData>({
        address_zipcode: '',
        street_name: '',
        city_name: '',
        neighborhood_name: '',
        state_name: '',
        address_number: '',
        address_complement: ''
    });

    useEffect(() => {
        const fetchAddressData = async () => {
            try {
                const response = await fetch(`https://app.se7voleidepraia.com.br/api/get-address-customer?cpf=${adrress}`);
                if (response.ok) {
                    const responseData = await response.json();
                    const addressData = responseData.data;
                    setFormData(addressData);
                } else {
                    throw new Error('Falha ao buscar os dados do endereço.');
                }
            } catch (error) {
                console.error('Erro ao buscar os dados do endereço:', error);
                alert('Ocorreu um erro ao buscar os dados do endereço.');
            }
        };

        if (adrress) {
            fetchAddressData();
        }
    }, [adrress]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!adrress) {
            console.error('ID do aluno não fornecido.');
            return;
        }
        try {
            const response = await fetch(`https://app.se7voleidepraia.com.br/api/update-address-customer?cpf=${adrress}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSubmitted(true);
                alert('Endereço atualizado com sucesso!');
                console.log('formdata', formData)
            } else {
                throw new Error('Ocorreu um erro ao enviar o endereço.');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao enviar o endereço.');
        }
    };

    return (
        <div className='container'>
            <h2>Formulário de Endereço do Aluno</h2>
            <form onSubmit={handleSubmit} className='Formteste '>
                <label >CEP</label><br />
                <ReactInputMask mask="99999-999" type="text" id="address_zipcode" name="address_zipcode" value={formData.address_zipcode} onChange={handleChange} required>

                </ReactInputMask><br />

                <label >Rua</label><br />
                <input type="text" id="street_name" name="street_name" value={formData.street_name} onChange={handleChange} required /><br />

                <label >Número</label><br />
                <input type="text" id="address_number" name="address_number" value={formData.address_number} onChange={handleChange} required /><br />

                <label >Cidade</label><br />
                <input type="text" id="city_name" name="city_name" value={formData.city_name} onChange={handleChange} required /><br />

                <label >Bairro</label><br />
                <input type="text" id="neighborhood_name" name="neighborhood_name" value={formData.neighborhood_name} onChange={handleChange} required /><br />

                <label >UF</label><br />
                <input type="text" id="state_name" name="state_name" value={formData.state_name} onChange={handleChange} required /><br />

                <label >Complemento</label><br />
                <input type="text" id="address_complement" name="address_complement" value={formData.address_complement} onChange={handleChange} /><br />

                <Button label="Enviar" />
            </form>
        </div>
    );
};

export default AddressForm;
