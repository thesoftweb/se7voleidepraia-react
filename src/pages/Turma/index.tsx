import React, { useState, useEffect, useContext } from "react";
import { PlanItem } from "../../components/PlanItem";
import api from "../../services/api";
import { Header } from "../../components/Shared/Header";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { Turmas } from "../../types/Turmas";
import { useUnidades } from "../../hooks/useUnidades";
import { FormActions, useForm } from "../../contexts/Form/FormContext";
import { useNavigate } from "react-router-dom";
import "./styles.css";

export const Turma = () => {
  const auth = useContext(AuthContext);
  const { units } = useUnidades();
  const { state, dispatch } = useForm();
  const [loading, setLoading] = useState(false);
  const [turmas, setTurmas] = useState<Turmas[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadTurmas();
  }, []);

  const loadTurmas = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await api.get(`/courses?token=${token}`);
      setTurmas(response.data.data);
    } catch (error) {
      console.error("Erro ao carregar turmas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (item: Turmas) => {
    navigate(`/alunos?course=${item.id}&name=${item.name}`);
  };

  const handleUnidadeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: FormActions.setUnit_Id, payload: e.target.value });

  };

  const handleCategoriaChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: FormActions.setCategory, payload: e.target.value });

  };

  const fetchTurmas = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await api.get(`/courses?token=${token}&unit_id=${state.unit_id}&category=${state.category}`);
      if (!response.data.data || response.data.data.length === 0) {
        console.log("Não há turmas disponíveis para a unidade e categoria selecionadas.");
      } else {
        setTurmas(response.data.data);
        console.log(response.data.data);
      }
    } catch (error) {
      console.error("Erro ao carregar turmas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state.unit_id !== 0) {
      fetchTurmas();
    }
  }, [state.unit_id, state.category]);

  return (
    <div className="container">
      <Header
        title={`Professor(a) ${auth.user}`}
        subtitle="Selecione uma turma para fazer a frequencia."
      />
      {loading && "Carregando.."}
      <div className="filters">
        <label>Selecione sua unidade e faça sua frequencia</label>
        <select value={state.unit_id} onChange={handleUnidadeChange}>
          <option value="">SELECIONE</option>
          {units.map((item, key) => (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        {/* <select value={state.category} onChange={handleCategoriaChange}>
          <option value="">SELECIONE</option>
          <option value="kids">Crianças</option>
          <option value="teens">Adolescentes</option>
          <option value="adult">Adultos</option>
          <option value="competitive">Competitivo</option>
        </select> */}
      </div>

      <div className="turmas-wrapper">
        {turmas.map((item, index) => (
          <PlanItem
            key={index}
            title={item.name}
            description={item.description}
            onSelect={() => handleClick(item)}
          />
        ))}
      </div>
    </div>
  );
};