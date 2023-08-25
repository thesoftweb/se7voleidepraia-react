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
import { Erros } from "../../../types/Erros";
import api from "../../../services/api";

export const Step2 = () => {
  type Scheduler = {
    day: string;
  };

  const navigate = useNavigate();
  const { state, dispatch } = useForm();
  const [turmas, setTurmas] = useState<Turmas[]>([]);
  const [scheduleInfo, setScheduleInfo] = useState<{
    [key: number]: Scheduler[];
  }>({});
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [errors, setErrors] = useState<Erros>({});
  const [showTurmas, setShowTurmas] = useState(false);
  const [isSelectionComplete, setIsSelectionComplete] = useState(false);

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

    const selectedUnit = units.find(
      (unit) => unit.id === parseInt(e.target.value)
    );
    if (selectedUnit) {
      dispatch({ type: FormActions.setUnitName, payload: selectedUnit.name });
    }
    setIsSelectionComplete(state.category !== "" && e.target.value !== "0");
  };

  const handleCategoriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: FormActions.setCategory, payload: e.target.value });

    setIsSelectionComplete(state.unit_id !== 0 && e.target.value !== "");
  };

  const handlePrevStep = () => {
    dispatch({ type: FormActions.setUnit_Id, payload: null });
    dispatch({ type: FormActions.setCategory, payload: '' });
    navigate("/matricula-online");
    console.log("PREV STEP");
  };

  const newErrors: Erros = {};
  const handleNextStep = () => {
    console.log("State:", state);
    if (
      state.unit_id !== 0 &&
      state.course_id !== 0 &&
      state.name !== "" &&
      state.birth_date !== "" &&
      state.phone !== ""
    ) {
      navigate("/matricula-online/step3");
    } else {

      if (state.unit_id === 0) {
        newErrors.unit_id = "Escolha a Unidade";
      }
      if (state.category === "") {
        newErrors.category = "Escolha a categoria";
      }
      setErrors(newErrors);
    }
  };

  const fetchTurmas = async () => {
    let url = `/courses?unit_id=${state.unit_id}&category=${state.category}&`;
    const data = await api.get(url);
    console.log("Oque tem", data.data.data);

    setTurmas(data.data.data);
    const scheduleData = data.data.data.reduce(
      (acc: { [key: number]: { day: string }[] }, curr: Turmas) => {
        acc[curr.id] = curr.schedules;
        return acc;
      },
      {}
    );
    setScheduleInfo(scheduleData);

    if (data.data.data.length > 0) {
      setShowTurmas(true);
    }
  };

  const confirmaTurmas = () => {
    fetchTurmas();
  };

  const handleCourseSelected = (id: number, className: string) => {
    setSelectedPlan(id);
    dispatch({ type: FormActions.setCourse_Id, payload: id });
    dispatch({ type: FormActions.setClassName, payload: className });
  };

  return (
    <div className="container">
      <div className="header-step2">
        <Logo />
        <Header
          title="Selecione uma Turma"
          subtitle="Escolha uma unidade e uma categoria"
        />
      </div>
      <div className="form-step2">
        <div className="testando">
          <div className="form-units">
            <label>Escolha uma Unidade</label>
            {errors && <span className="error-message">{errors.unit_id}</span>}
            <select value={state.unit_id} onChange={handleUnidadeChange}>
              <option>SELECIONE</option>

              {units.map((item, key) => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <label>Escolha uma Categoria</label>
            {errors && <span className="error-message">{errors.category}</span>}
            <select value={state.category} onChange={handleCategoriaChange}>
              <option value="">SELECIONE</option>
              <option value="kids">Crianças</option>
              <option value="teens">Adolecentes</option>
              <option value="adult">Adultos</option>
              <option value="competitive">Competitivo</option>
            </select>
          </div>
          {isSelectionComplete && (
            <Button onClick={confirmaTurmas} label="Ver Turmas" color="grey" />
          )}

          {showTurmas && (
            <>
              <span className="mensagemTurma">Selecione sua turma</span>
              <div className="courses-wrapper">
                {turmas.map((item, key) => (
                  <PlanItem
                    key={item.id}
                    hour={scheduleInfo[item.id]?.map(
                      (schedule) => schedule.day
                    )}
                    title={item.name}
                    amount={item.unit}
                    isSelected={selectedPlan === item.id}
                    onSelect={() => handleCourseSelected(item.id, item.name)}
                  />
                ))}
              </div>
            </>
          )}
          <div className="buttons">
            <Button label="Voltar" color="red" onClick={handlePrevStep} />
            <Button label="Avançar" color="#67CCC5" onClick={handleNextStep} />
          </div>
        </div>
      </div>
    </div>
  );
};
