import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Header } from "../../Shared/Header";
import { PlanItem } from "../../PlanItem";
import { Button } from "../../Shared/Buttons";
import { FormActions, useForm } from "../../../contexts/Form/FormContext";

import { Logo } from "../../Shared/Logo";
import "./styles.css";
import { Plan } from "../../../types/Plan";
import api from "../../../services/api";

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
    const data = await api.get("/plans");
    setPlans(data.data.data);
    setIsloading(false);
  }

  const handlePrevStep = () => {
    navigate("/matricula-online/step2");
  };

  const handleNextStep = () => {
    if (selectedPlanValor !== null) {
      navigate("/matricula-online/step4");
    } else {
      alert("Por favor, selecione um plano antes de prosseguir.");
    }
  };

  const handlePlanSelected = (id: number, amount: string, planName: string) => {
    console.log("Plano escolhido " + id);
    setSelectedPlanValor(id);
    dispatch({ type: FormActions.setPlan_Id, payload: id });
    dispatch({ type: FormActions.setPlanName, payload: planName });
    dispatch({ type: FormActions.setAmount, payload: amount });
  };

  return (
    <div className="container">
      <Logo />
      <Header
        title="Selecione um Plano"
        subtitle="O plano semestral mais utilizado"
      />
      <div className="plan-wrapper">
        <div className="plan-step3">
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
                onSelect={() =>
                  handlePlanSelected(item.id, item.amount, item.name)
                }
              />
            ))}

          <div className="buttons">
            <Button label="Voltar" color="red" onClick={handlePrevStep} />
            <Button label="Avançar" color="#67CCC5" onClick={handleNextStep} />
          </div>
        </div>
      </div>
    </div>
  );
};
