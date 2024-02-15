import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/Shared/Buttons";
import "./styles.css";
import ReactInputMask from "react-input-mask";
import api from "../../../services/api";

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
  console.log("adrress", adrress);

  const [formData, setFormData] = useState<AddressFormData>({
    address_zipcode: "",
    street_name: "",
    city_name: "",
    neighborhood_name: "",
    state_name: "",
    address_number: "",
    address_complement: "",
  });

  useEffect(() => {
    const fetchAddressData = async () => {
      try {
        const response = await fetch(
          `https://app.se7voleidepraia.com.br/api/get-address-customer?cpf=${adrress}`
        );
        if (response.ok) {
          const responseData = await response.json();
          const addressData = responseData.data;
          setFormData(addressData);
        } else {
          throw new Error("Falha ao buscar os dados do endereço.");
        }
      } catch (error) {
        console.error("Erro ao buscar os dados do endereço:", error);
        alert("Ocorreu um erro ao buscar os dados do endereço.");
      }
    };

    if (adrress) {
      fetchAddressData();
    }
  }, [adrress]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!adrress) {
      console.error("ID do aluno não fornecido.");
      return;
    }
    try {
      const response = await fetch(
        `https://app.se7voleidepraia.com.br/api/update-address-customer?cpf=${adrress}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setSubmitted(true);
        alert("Endereço atualizado com sucesso!");
        console.log("formdata", formData);
      } else {
        throw new Error("Ocorreu um erro ao enviar o endereço.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Ocorreu um erro ao enviar o endereço.");
    }
  };

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("CHANGE CEP ===>", name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    try {
      const response = await fetch(`https://viacep.com.br/ws/${value}/json/`);
      const data = await response.json();
      console.log(data);

      setFormData((prevData) => ({
        ...prevData,
        street_name: data.logradouro,
        city_name: data.localidade,
        neighborhood_name: data.bairro,
        state_name: data.uf,
      }));
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    }
  };

  return (
    <div className="container">
      <h2>Endereço do Responsável</h2>
      <form onSubmit={handleSubmit} className="Formteste ">
        <label>CEP</label>
        <br />
        <ReactInputMask
          mask="99999-999"
          type="text"
          id="address_zipcode"
          name="address_zipcode"
          value={formData.address_zipcode}
          onChange={handleChange}
          onBlur={handleCepChange}
          required
        ></ReactInputMask>
        <br />

        <label>Rua</label>
        <br />
        <input
          type="text"
          id="street_name"
          name="street_name"
          value={formData.street_name}
          onChange={handleChange}
          required
        />
        <br />

        <label>Número</label>
        <br />
        <input
          type="text"
          id="address_number"
          name="address_number"
          value={formData.address_number}
          onChange={handleChange}
          required
        />
        <br />

        <label>Complemento</label>
        <br />
        <input
          type="text"
          id="address_complement"
          name="address_complement"
          value={formData.address_complement}
          onChange={handleChange}
        />
        <br />

        <label>Bairro</label>
        <br />
        <input
          type="text"
          id="neighborhood_name"
          name="neighborhood_name"
          value={formData.neighborhood_name}
          onChange={handleChange}
          required
        />
        <br />

        <label>Cidade</label>
        <br />
        <input
          type="text"
          id="city_name"
          name="city_name"
          value={formData.city_name}
          onChange={handleChange}
          required
        />
        <br />

        <label>UF</label>
        <br />
        <select
          className="select-uf"
          name="state_name"
          value={formData.state_name}
          onChange={handleChange}
        >
          <option value="">--Selecione--</option>
          <option value="AC">Acre (AC)</option>
          <option value="AL">Alagoas (AL)</option>
          <option value="AP">Amapá (AP)</option>
          <option value="AM">Amazonas (AM)</option>
          <option value="BA">Bahia (BA)</option>
          <option value="CE">Ceará (CE)</option>
          <option value="DF">Distrito Federal (DF)</option>
          <option value="ES">Espírito Santo (ES)</option>
          <option value="GO">Goiás (GO)</option>
          <option value="MA">Maranhão (MA)</option>
          <option value="MT">Mato Grosso (MT)</option>
          <option value="MS">Mato Grosso do Sul (MS)</option>
          <option value="MG">Minas Gerais (MG)</option>
          <option value="PA">Pará (PA)</option>
          <option value="PB">Paraíba (PB)</option>
          <option value="PR">Paraná (PR)</option>
          <option value="PE">Pernambuco (PE)</option>
          <option value="PI">Piauí (PI)</option>
          <option value="RJ">Rio de Janeiro (RJ)</option>
          <option value="RN">Rio Grande do Norte (RN)</option>
          <option value="RS">Rio Grande do Sul (RS)</option>
          <option value="RO">Rondônia (RO)</option>
          <option value="RR">Roraima (RR)</option>
          <option value="SC">Santa Catarina (SC)</option>
          <option value="SP">São Paulo (SP)</option>
          <option value="SE">Sergipe (SE)</option>
          <option value="TO">Tocantins (TO)</option>
        </select>
        <br />

        <Button label="Enviar" />
      </form>

      <a
        href={`/portal/aluno/cobrancas?cpf=${adrress}`}
        className="back-button"
      >
        Voltar
      </a>
    </div>
  );
};

export default AddressForm;
