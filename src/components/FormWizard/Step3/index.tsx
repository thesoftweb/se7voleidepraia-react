import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Header } from "../../Shared/Header";
import { PlanItem } from "../../PlanItem";
import { Button } from "../../Shared/Buttons";
import { FormActions, useForm } from "../../../contexts/Form/FormContext";

import { Logo } from "../../Shared/Logo";
import "./styles.css";
import { Plan } from "../../../types/Plan";
import api from "../../../services/api";
import { format } from "date-fns";

export const Step3 = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useForm();
  const [selectedPlanValor, setSelectedPlanValor] = useState<number | null>(
    null
  );
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [showAddAnotherStudent, setShowAddAnotherStudent] = useState(false);
  const [showPlanList, setShowPlanList] = useState(true);
  const [isFamilia, setIsFamilia] = useState(state.isFamilia);
  const [familiaStudentsInputs, setFamiliaStudentsInputs] = useState(['']);

  const [novaPessoa, setNovaPessoa] = useState("");
  const [novaPessoaDataNascimento, setNovaPessoaDataNascimento] = useState("");

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
    console.log("State:", state);
    console.log("Is Family:", state.isFamilia);

    if (selectedPlanValor !== null) {
      if (state.isFamilia) {
        if (novaPessoa !== "" && novaPessoaDataNascimento !== "") {
          navigate("/matricula-online/step4");
        } else {
          alert("Por favor, insira os nomes dos integrantes da família antes de avançar.");
        }
      } else {
        navigate("/matricula-online/step4");
      }
    } else {
      alert("Por favor, selecione um plano antes de prosseguir.");
    }
  };

  const handlePlanSelected = (id: number, amount: string, planName: string, isFamilia: boolean) => {
    console.log("Plano escolhido " + id);
    setSelectedPlanValor(id);

    dispatch({ type: FormActions.setPlan_Id, payload: id });
    dispatch({ type: FormActions.setPlanName, payload: planName });
    dispatch({ type: FormActions.setAmount, payload: amount });
    dispatch({ type: FormActions.setIsFamilia, payload: isFamilia });
  };

  const handleAddAnotherStudent = () => {

    setFamiliaStudentsInputs([...familiaStudentsInputs, '']);
    handlePlanSelected(4, "", "Plano Família", true);
    dispatch({ type: FormActions.setIsFamilia, payload: true });

    setShowPlanList(false);
    setShowAddAnotherStudent(true);
  };

  const AdicionarAluno1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: FormActions.aluno1, payload: event.target.value });
  };

  const AdicionarAluno2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: FormActions.aluno2, payload: event.target.value });
  };

  const AdicionarAlunoAoPlano = () => {
    console.log("State:", state);

    const isAnyStudentFilled = state.familiaStudents.some(
      student => student.nome.trim() !== '' && student.birthdate.trim() !== ''
    );

    if (isAnyStudentFilled) {
      dispatch({ type: FormActions.setIsFamilia, payload: true });
      navigate("/matricula-online/step4");
    } else {
      alert('Por favor, insira pelo menos um nome de aluno e a data de nascimento antes de avançar.');
    }
  };


  const VoltarPlanFamlia = () => {
    console.log("State:", state);
    console.log("Is Family: ", isFamilia);

    // Verifica se há pessoas adicionadas e remove-as
    if (state.familiaStudents.length > 0) {
      dispatch({ type: FormActions.RemoverFamiliaStudent, payload: [] });
    }

    dispatch({ type: FormActions.setIsFamilia, payload: false });
    setShowAddAnotherStudent(false);
    setShowPlanList(true);
  };

  const handleAddPerson = () => {
    if (novaPessoa.trim() !== "" && novaPessoaDataNascimento.trim() !== "") {
      // Dispatch para adicionar uma nova pessoa à lista com nome e data de nascimento
      dispatch({
        type: FormActions.addFamiliaStudent,
        payload: { nome: novaPessoa, birthdate: novaPessoaDataNascimento }
      });

      setNovaPessoa("");
      setNovaPessoaDataNascimento(""); // Reset da data após a adição
    }
  };


  const handleDeletePerson = (index: number) => {
    const updatedFamiliaStudents = state.familiaStudents.filter((_, i) => i !== index);
    dispatch({
      type: FormActions.RemoverFamiliaStudent,
      payload: updatedFamiliaStudents
    });
  };

  const handlePersonDataNascimentoChange = (index: number, value: string) => {
    const updatedFamiliaStudents = state.familiaStudents.map((person, i) => {
      if (i === index) {
        return { ...person, dataNascimento: value };
      }
      return person;
    });

    dispatch({
      type: FormActions.RemoverFamiliaStudent,
      payload: updatedFamiliaStudents
    });
  };

  return (
    <div className="container">
      <Logo />
      <Header
        title="Selecione um Plano"
        subtitle="O plano semestral mais utilizado"
      />
      <div className="plan-wrapper">
        {!showPlanList && (
          <div className="add-student-wrapper">
            <p>Informe o nome e a data de nascimento da nova pessoa:</p>
            <input
              type="text"
              value={novaPessoa}
              onChange={(e) => setNovaPessoa(e.target.value)}
              placeholder="Nome da pessoa"
            />
            <input
              type="date"
              value={novaPessoaDataNascimento}
              onChange={(e) => setNovaPessoaDataNascimento(e.target.value)}
              placeholder="Data de nascimento"
            />
            <Button onClick={handleAddPerson} color="grey" label="Adicionar" />

            {state.familiaStudents.map((person, index) => (
              <div className="student-familia"
                key={index}>
                {person.nome}
                <input
                  type="date"
                  value={person.birthdate}
                  onChange={(e) => handlePersonDataNascimentoChange(index, e.target.value)}
                />
                <button onClick={() => handleDeletePerson(index)}>Excluir</button>

              </div>
            ))}

            <div className="buttons">
              <Button label="Cancelar" color="red" onClick={VoltarPlanFamlia} />
              <Button label="Avançar" color="#67CCC5" onClick={AdicionarAlunoAoPlano} />
            </div>
          </div>
        )}

        {showPlanList && (
          <div className="plan-step3">
            <PlanItem
              title={'Plano Familia'}
              amount={'Valor a ser definido'}
              onSelect={handleAddAnotherStudent}

            />
            {/* <Button label="Plano Família" color="blue" onClick={handleAddAnotherStudent} /> */}
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
                    handlePlanSelected(item.id, item.amount, item.name, false)
                  }
                />
              ))}

            <div className="buttons">
              <Button label="Voltar" color="red" onClick={handlePrevStep} />
              <Button label="Avançar" color="#67CCC5" onClick={handleNextStep} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
