import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Header } from "../../Shared/Header";
import { PlanItem } from "../../PlanItem";
import { Button } from "../../Shared/Buttons";
import { FormActions, useForm } from "../../../contexts/Form/FormContext";

import { Logo } from "../../Shared/Logo";
import "./styles.css";
import { Plan } from "../../../types/Plan";

export const Step3 = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useForm();
  const [selectedPlanValor, setSelectedPlanValor] = useState<number | null>(
    null
  );
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    fetchPlans();
  }, []);

  async function fetchPlans() {
    const request = await fetch("http://se7volei.test/api/plans");
    const { data } = await request.json();
    setPlans(data);
    setIsloading(false);
  }

  const handlePrevStep = () => {
    navigate("/matricula-online/step2");
  };

  const handleNextStep = () => {
    navigate("/matricula-online/step4");
  };

  const handlePlanSelected = (id: number) => {
    setSelectedPlanValor(id);
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
        {isLoading && (
          <>
            <p>Carregando Planos...</p>
          </>
        )}
        {!isLoading &&
          plans.map((item: Plan, key) => (
            <PlanItem
              key={item.id}
              title={item.name}
              amount={item.amount}
              isSelected={selectedPlanValor === item.id}
              onSelect={() => handlePlanSelected(item.id)}
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
