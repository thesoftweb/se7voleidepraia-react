import { useState, useEffect } from "react";
import { Aluno } from "../../types/Aluno";
import { useLocation } from "react-router-dom";
import api from "../../services/api";
import { Header } from "../../components/Shared/Header";

import "./style.css";

export const Alunos = () => {
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState<Aluno[]>([]);
  const location = useLocation();

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    setLoading(true);
    const course = new URLSearchParams(location.search).get("course");

    const data = await api.get(`/courses/${course}/students`);

    setStudents(data.data.data);
    setLoading(false);
  };

  const setChecked = (id: number, selecionado: boolean) => {
    const newStudents = students.map((student) =>
      student.id === id ? { ...student, selecionado } : student
    );
    setStudents(newStudents);
  };

  const checkAll = (selecionado: boolean) => {
    const newStudents = students.map((student) => ({
      ...student,
      selecionado,
    }));
    setStudents(newStudents);
  };

  return (
    <div className="container">
      <Header title="Alunos turma [nome da turma]" />
      <div className="actions">
        <div>marca todos</div>
        <div>
          <input
            type="checkbox"
            checked={students.every((student) => student.selecionado)}
            onChange={(e) => checkAll(e.target.checked)}
          />
        </div>
      </div>

      {students.map((student) => (
        <div className="student" key={student.id}>
          <img className="foto" src={student.img} alt="" />
          {student.name}

          <div className="checkbox-wrapper">
            <input
              id="checkbox1"
              type="checkbox"
              checked={student.selecionado}
              onChange={(e) => setChecked(student.id, e.target.checked)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
