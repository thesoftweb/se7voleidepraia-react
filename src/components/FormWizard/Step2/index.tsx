import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

// import { Container, Content, TurmaItem } from "./styled";
import { FormActions, useForm } from "../../../contexts/Form/FormContext";
import { FormLeft } from "../../FormLeft";
import { useUnidades } from "../../../hooks/useUnidades";

import logo from "../../../assets/setvolei.png";
import { Turmas } from "../../../types/Turmas";
import { Header } from "../../Shared/Header";
import { Logo } from "../../Shared/Logo";

import "./style.css";
import { Button } from "../../Shared/Buttons";
import { PlanItem } from "../../PlanItem";

export const Step2 = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useForm();
  const [turmas, setTurmas] = useState<Turmas[]>([]);
  const [selecionada, setSelecionada] = useState(0);
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

  // const handleClique = () => {

  //   dispatch({ type: FormActions.setCourse, payload: 999 });

  //   console.log(state);
  // };

  const handleUnidadeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: FormActions.setUnit_Id, payload: e.target.value });
  };

  const handleCategoriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: FormActions.setCategory, payload: e.target.value });
  };
  const handlePrevStep = () => {
    navigate("/matricula-online");
    console.log("PREV STEP");
  };

  const handleNextStep = () => {
    console.log("NEXT STEP");
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
    console.log("states", state.unit_id, state.course_id);

    let url = `https://app.se7voleidepraia.com.br/api/courses?unit_id=${state.unit_id}&category=${state.category}&`;

    console.log("URL pra consultar turmas dinamica: " + url);

    const request = await fetch(url);

    const { data } = await request.json();

    console.log("Oque tem", data);

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
    console.log(id);
    setSelecionada(id);
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
      <select value={state.course_id} onChange={handleCategoriaChange}>
        <option value="">SELECIONE</option>
        <option value="kids">Crianças</option>
        <option value="teens">Adolecentes</option>
        <option value="adult">Adultos</option>
        <option value="competitive">Competitivo</option>
      </select>

      <Button onClick={confirmaTurmas} label="Ver Turmas" color="grey" />

      <div className={`borda ${selecionada ? "selecionada" : ""}`}>
        {turmas.map((item, key) => (
          // <li
          //   value={state.course_id}
          //   key={item.id}
          //   onClick={() => handleCourseSelected(item.id)}
          //   style={{item.id == selecionada ? "course-item-active" : "course-item"}}
          // >
          //   {item.name} | {item.unit}{" "}
          // </li>
          <PlanItem
            title={item.name}
            amount={item.unit}
            onClick={() => handleCourseSelected(item.id)}
            active={selecionada}
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
