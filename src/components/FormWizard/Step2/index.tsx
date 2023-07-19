import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormActions, useForm } from "../../../contexts/Form/FormContext";
import { useUnidades } from "../../../hooks/useUnidades";
import { Turmas } from "../../../types/Turmas";
import { Header } from "../../Shared/Header";
import { Logo } from "../../Shared/Logo";
import { Button } from "../../Shared/Buttons";
import { PlanItem } from "../../PlanItem";

import "./style.css";

export const Step2 = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useForm();
  const [turmas, setTurmas] = useState<Turmas[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const { units } = useUnidades();

  useEffect(() => {
    if (state.name === "") {
      navigate("/matricula-online");
    } else {
      dispatch({
        type: FormActions.setCurrentStep,
        payload: 2,
      });
    }
  }, []);

  const handleUnidadeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: FormActions.setUnit_Id, payload: e.target.value });
  };

  const handleCategoriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: FormActions.setCategory, payload: e.target.value });
  };

  const handlePrevStep = () => {
    navigate("/matricula-online");
  };

  const handleNextStep = () => {
    if (
      state.unit_id !== 1 &&
      state.course_id !== 1 &&
      state.name !== "" &&
      state.email !== "" &&
      state.birth_date !== ""
    ) {
      navigate("/matricula-online/step3");
    } else {
      if (state.unit_id === 0) {
        alert("Selecione a unidade");
      }
      if (state.category === "") {
        alert("Selecione a categoria");
      }
    }
  };

  const fetchTurmas = async () => {
    let url = `https://app.se7voleidepraia.com.br/api/courses?unit_id=${state.unit_id}&category=${state.category}&`;
    const request = await fetch(url);
    const { data } = await request.json();
    setTurmas(data);
  };

  const confirmaTurmas = () => {
    if (state.unit_id !== 0 && state.category !== "") {
      fetchTurmas();
    } else {
      if (state.unit_id === 0) {
        alert("Selecione a unidade");
      }
      if (state.category === "") {
        alert("Selecione a categoria");
      }
    }
  };

  const handleCourseSelected = (id: number) => {
    setSelectedPlan(id);
    dispatch({ type: FormActions.setCourse_Id, payload: id });
  };

  return (
    <div className="container">
      <Logo />
      <Header
        title="Preencha os dados abaixo"
        subtitle="Certifique-se de selecionar corretamente"
      />

      <label>SELECIONE UMA UNIDADE</label>
      <select value={state.unit_id} onChange={handleUnidadeChange}>
        <option>SELECIONE</option>

        {units.map((item, key) => (
          <option value={item.id} key={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      <label>SELECIONE UMA CATEGORIA</label>
      <select value={state.category} onChange={handleCategoriaChange}>
        <option value="">SELECIONE</option>
        <option value="kids">Crianças</option>
        <option value="teens">Adolecentes</option>
        <option value="adult">Adultos</option>
        <option value="competitive">Competitivo</option>
      </select>

      <Button onClick={confirmaTurmas} label="Ver Turmas" color="grey" />

      <div className="courses-wrapper">
        {turmas.map((item, key) => (
          <PlanItem
            key={item.id}
            title={item.name}
            amount={item.unit}
            isSelected={selectedPlan === item.id}
            onSelect={() => handleCourseSelected(item.id)}
          />
        ))}
      </div>

      <div className="buttons">
        <Button label="Voltar" color="red" onClick={handlePrevStep} />
        <Button label="Avançar" color="#67CCC5" onClick={handleNextStep} />
      </div>
    </div>
  );
};
