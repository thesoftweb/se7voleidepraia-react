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
import InputMask from "react-input-mask";
import { useUnidades } from "../../../hooks/useUnidades";
import { Turmas } from "../../../types/Turmas";
import { Scheduler } from "timers/promises";
import { Erros } from "../../../types/Erros";

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
  const [familiaStudentsInputs, setFamiliaStudentsInputs] = useState([""]);
  const [novaPessoa, setNovaPessoa] = useState("");
  const [novaPessoaDataNascimento, setNovaPessoaDataNascimento] = useState("");
  const [courseNew, setCourseNew] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [errors, setErrors] = useState<Erros>({});
  const { units } = useUnidades();
  const [turmas, setTurmas] = useState<Turmas[]>([]);
  const [scheduleInfo, setScheduleInfo] = useState<{
    [key: number]: Scheduler[];
  }>({});
  const [showTurmas, setShowTurmas] = useState(false);

  const [unitFamilySel, setUnityFamilySel] = useState("");
  const [courseFamilySel, setCourseyFamilySel] = useState("");

  useEffect(() => {
    fetchPlans();
  }, []);

  async function fetchPlans() {
    const data = await api.get(`/plans?course_id=${state.course_id}`);
    setPlans(data.data.data);
    setIsloading(false);
  }

  const handlePrevStep = () => {
    navigate("/matricula-online/step2");
  };

  const handleNextStep = () => {
    console.log("State:", state);
    console.log("Is Family:", state.isFamilia);

    if (state.isFamilia && state.familiaStudents.length === 0) {
      alert(
        "Por favor, insira os nomes dos integrantes da família antes de avançar."
      );
    } else if (!state.isFamilia && selectedPlanValor === null) {
      alert("Por favor, selecione um plano antes de prosseguir.");
    } else {
      navigate("/matricula-online/step4");
    }
  };

  const handlePlanSelected = (
    id: number,
    amount: string,
    planName: string,
    isFamilia: boolean
  ) => {
    console.log("Plano escolhido " + id);
    setSelectedPlanValor(id);

    dispatch({ type: FormActions.setPlan_Id, payload: id });
    dispatch({ type: FormActions.setPlanName, payload: planName });
    dispatch({ type: FormActions.setAmount, payload: amount });
    dispatch({ type: FormActions.setIsFamilia, payload: isFamilia });
  };

  const handleAddAnotherStudent = () => {
    setFamiliaStudentsInputs([...familiaStudentsInputs, ""]);
    handlePlanSelected(4, "", "Plano Família", true);
    dispatch({ type: FormActions.setIsFamilia, payload: true });

    setShowPlanList(false);
    setShowAddAnotherStudent(true);
  };

  const AdicionarAlunoAoPlano = () => {
    console.log("State:", state);

    const isAnyStudentFilled = state.familiaStudents.some(
      (student) => student.nome.trim() !== "" && student.birthdate.trim() !== ""
    );

    if (isAnyStudentFilled) {
      dispatch({ type: FormActions.setIsFamilia, payload: true });
      navigate("/matricula-online/step4");
    } else {
      alert(
        "Por favor, insira pelo menos um nome de aluno e a data de nascimento antes de avançar."
      );
    }
  };

  const VoltarPlanFamilia = () => {
    console.log("Statessss:", state);
    console.log("Is Family: ", isFamilia);

    // Verifica se há pessoas adicionadas e remove-as
    if (state.familiaStudents.length > 0) {
      dispatch({ type: FormActions.RemoverFamiliaStudent, payload: [] });
    }

    // Atualiza o valor de isFamilia para false e reseta as entradas
    dispatch({ type: FormActions.setIsFamilia, payload: false });
    setShowAddAnotherStudent(false);
    setShowPlanList(true);
    setSelectedPlanValor(null); // Adicione esta linha
  };

  const handleAddPerson = () => {
    if (novaPessoa.trim() !== "" && novaPessoaDataNascimento.trim() !== "") {
      // const familiaCourseId = state.course_id;
      const course_id = courseNew;

      const newStudent = {
        nome: novaPessoa,
        birthdate: novaPessoaDataNascimento,
        course_id: course_id,
      };

      dispatch({
        type: FormActions.addFamiliaStudent,
        payload: {
          nome: novaPessoa,
          birthdate: novaPessoaDataNascimento,
          course_id: course_id,
        },
      });

      //talvez nao precise dos dois dispatchs abaixo
      dispatch({ type: FormActions.setFamilyUnit, payload: "" });
      dispatch({ type: FormActions.setFamilyCategory, payload: "" });

      setSelectedPlanValor(null);
      setNovaPessoa("");
      setNovaPessoaDataNascimento("");
      setCourseNew(0); // Reset da data após a adição
      setShowTurmas(false);
    }
  };

  const handleDeletePerson = (index: number) => {
    const updatedFamiliaStudents = state.familiaStudents.filter(
      (_, i) => i !== index
    );
    dispatch({
      type: FormActions.RemoverFamiliaStudent,
      payload: updatedFamiliaStudents,
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
      payload: updatedFamiliaStudents,
    });
  };

  type Scheduler = {
    day: string;
  };

  const handleFamiliaUnidadeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    console.log(e.target.value);
    setUnityFamilySel(e.target.value);
    dispatch({ type: FormActions.setFamilyUnit, payload: e.target.value });
  };

  const handleFamiliaCategoriaChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    console.log(e.target.value);
    setCourseyFamilySel(e.target.value);
    dispatch({ type: FormActions.setFamilyCategory, payload: e.target.value });
  };

  const handleFamiliaCourseSelected = (id: number, className: string) => {
    setSelectedPlan(id);
    setCourseNew(id);

    //talvez nao precise das linhas abaixo
    // dispatch({ type: FormActions.setCourse_Id, payload: id });
    // dispatch({ type: FormActions.setClassName, payload: className });
  };

  const fetchTurmas = async (unit_id: number, category: string) => {
    let url = `/courses?unit_id=${unit_id}&category=${category}&`;

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
    if (state.familyUnit !== 0 && state.familyCategory !== "") {
      fetchTurmas(state.familyUnit, state.familyCategory);
    } else {
      if (state.unit_id === 0) {
      }
      if (state.category === "") {
      }
    }
  };

  return (
    <div className="container">
      <Logo />
      <Header title="Selecione um Plano" />
      <div className="plan-wrapper">
        {!showPlanList && (
          <div className="add-student-wrapper">
            <span>Dados pessoais</span>
            <input
              type="text"
              value={novaPessoa}
              onChange={(e) => setNovaPessoa(e.target.value)}
              placeholder="Nome da pessoa"
            />
            <InputMask
              mask="99/99/9999"
              type="text"
              value={novaPessoaDataNascimento}
              onChange={(e) => setNovaPessoaDataNascimento(e.target.value)}
              placeholder="Data de nascimento"
            />
            <span>Escolha uma Unidade</span>

            {errors && <span className="error-message">{errors.unit_id}</span>}
            <select
              value={state.familyUnit}
              onChange={handleFamiliaUnidadeChange}
            >
              <option>SELECIONE</option>

              {units.map((item, key) => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <label>Escolha uma Categoria</label>
            {errors && <span className="error-message">{errors.category}</span>}
            <select
              value={state.familyCategory}
              onChange={handleFamiliaCategoriaChange}
            >
              <option value="">SELECIONE</option>
              <option value="kids">Crianças</option>
              <option value="teens">Adolecentes</option>
              <option value="adult">Adultos</option>
              <option value="competitive">Competitivo</option>
            </select>

            <Button onClick={confirmaTurmas} label="Ver Turmas" color="grey" />

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
                      onSelect={() =>
                        handleFamiliaCourseSelected(item.id, item.name)
                      }
                    />
                  ))}
                </div>
              </>
            )}

            <Button
              onClick={handleAddPerson}
              color="#67CCC5"
              label="Adicionar Aluno"
            />

            {state.familiaStudents.map((person, index) => (
              <div className="student-familia" key={index}>
                <div className="student">
                  <span>{person.nome}</span>
                  {/* //TODO: colocar birthdate e nome da turma */}
                  {/* <span>{person.birthdate}</span>
                  <span>{person.course_id} seria a turma</span> */}
                </div>
                <button onClick={() => handleDeletePerson(index)}>x</button>
              </div>
            ))}

            <div className="buttons">
              <Button
                label="Cancelar"
                color="red"
                onClick={VoltarPlanFamilia}
              />
              <Button
                label="Avançar"
                color="#67CCC5"
                onClick={AdicionarAlunoAoPlano}
              />
            </div>
          </div>
        )}

        {showPlanList && (
          <div className="plan-step3">
            <PlanItem
              title={"Plano Familia"}
              amount={"Valor a ser definido"}
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
              <Button
                label="Avançar"
                color="#67CCC5"
                onClick={handleNextStep}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
