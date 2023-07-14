import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { Header } from "../../Shared/Header";
import { Plan } from "../../../types/Plan";
import { Logo } from "../../Shared/Logo";

import "./styles.css";
import { PlanItem } from "../../PlanItem";
import { Button } from "../../Shared/Buttons";
import { FormActions, useForm } from "../../../contexts/Form/FormContext";

export const Step3 = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useForm();
  //TODO: Fetch plans from api https://app.se7voleidepraia.com.br/api/plans | GET
  //const [plans, setPlan] = useState<Plan[]>([]);
  console.log(state);

  const handlePrevStep = () => {
    navigate("/matricula-online/step2");
    console.log("PREV STEP");
  };

  const handleNextStep = () => {
    console.log("NEXT STEP");
    navigate("/matricula-online/step4");
  };

  const handlePlanSelected = (id: number) => {
    console.log("Plano escolhido " + id);
    dispatch({ type: FormActions.setPlan_Id, payload: id });
  };

  return (
    <div className="container">
      <Logo />
      <Header
        title="Selecione um Plano"
        subtitle="O plano semestral mais utilizado"
      />
      <div className="plan-wrapper">
        <PlanItem
          title="Plano Mensal"
          amount="R$ 120.99"
          onClick={() => handlePlanSelected(1)}
        />
        <PlanItem
          title="Plano Trimestral"
          amount="R$ 105.99"
          onClick={() => handlePlanSelected(2)}
        />
        <PlanItem
          title="Plano Semestral"
          amount="R$ 89.99"
          onClick={() => handlePlanSelected(3)}
        />
      </div>

      <div className="buttons">
        <Button label="Voltar" color="red" onClick={handlePrevStep} />
        <Button label="Avançar" color="#67CCC5" onClick={handleNextStep} />
      </div>
    </div>
  );
};
