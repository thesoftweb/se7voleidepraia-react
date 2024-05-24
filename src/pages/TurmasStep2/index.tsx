import { useState } from "react";

import { Button } from "../../components/Shared/Buttons";
import { Header } from "../../components/Shared/Header";
import { Logo } from "../../components/Shared/Logo";
import { FormActions, useForm } from "../../contexts/Form/FormContext";
import { useUnidades } from "../../hooks/useUnidades";
import { Turmas } from "../../types/Turmas";
import api from "../../services/api";
import { PlanItem } from "../../components/PlanItem";
import { Navigate, useNavigate } from "react-router-dom";
import { Erros } from "../../types/Erros";

type Scheduler = {
  day: string;
};

export const TurmasStep2 = () => {
  const { state, dispatch } = useForm();
  const { units } = useUnidades();
  const [turmas, setTurmas] = useState<Turmas[]>([]);
  const [showTurmas, setShowTurmas] = useState(false);
  const [scheduleInfo, setScheduleInfo] = useState<{
    [key: number]: Scheduler[];
  }>({});
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Erros>({});
  const newErrors: Erros = {};

  const handleUnidadeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: FormActions.setUnit_Id, payload: e.target.value });

    const selectedUnit = units.find(
      (unit) => unit.id === parseInt(e.target.value)
    );
    if (selectedUnit) {
      dispatch({ type: FormActions.setUnitName, payload: selectedUnit.name });
    }
  };

  const handleCategoriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: FormActions.setCategory, payload: e.target.value });
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
    if (state.unit_id !== 0 && state.category !== "") {
      fetchTurmas();
    } else {
      if (state.unit_id === 0) {
        newErrors.unit_id = "SELECIONE O ESPORTE";
      }
      if (state.category === "") {
        newErrors.category = "SELECIONE A CATEGORIA";
      }
    }
    setErrors(newErrors);
  };
  const handleCourseSelected = (id: number, className: string) => {
    setSelectedPlan(id);
    dispatch({ type: FormActions.setCourse_Id, payload: id });
    dispatch({ type: FormActions.setClassName, payload: className });
  };

  const FormRegister = () => {
    dispatch({ type: FormActions.setCategory, payload: "" });
    dispatch({ type: FormActions.setUnit_Id, payload: "" });
    navigate("/matricula-online");
  };
  return (
    <div className="container">
      <div className="header-step2">
        <Logo />
        <Header
          title="Consulte"
          subtitle="Os horários das turmas disponíveis para matrícula"
        />
      </div>
      <div className="form-step2">
        <div className="testando">
          <div className="form-units">
            <label>SELECIONE UM ESPORTE</label>
            {errors && <span className="error-message">{errors.unit_id}</span>}

            <select value={state.unit_id} onChange={handleUnidadeChange}>
              <option>SELECIONE</option>

              {units.map((item, key) => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))}
            </select>

            <label>SELECIONE UMA CATEGORIA</label>
            {errors && <span className="error-message">{errors.category}</span>}
            <select value={state.category} onChange={handleCategoriaChange}>
              <option value="">SELECIONE</option>
              <option value="kids">Crianças</option>
              <option value="teens">Adolecentes</option>
              <option value="adult">Adultos</option>
              <option value="competitive">Competitivo</option>
            </select>
          </div>
          <Button
            onClick={confirmaTurmas}
            label="Ver Turmas disponíveis"
            color="grey"
          />
          {showTurmas && (
            <>
              <p className="mensagemTurma">Selecione sua turma</p>
              <div className="courses-wrapper">
                {turmas.map((item, key) => (
                  <PlanItem
                    key={item.id}
                    description={item.description}
                    title={item.name}
                    amount={item.unit}
                    onSelect={() => handleCourseSelected(item.id, item.name)}
                  />
                ))}
              </div>
            </>
          )}
          <div className="buttons">
            <Button
              label="Faça sua matrícula"
              color="#cbd741"
              onClick={FormRegister}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
