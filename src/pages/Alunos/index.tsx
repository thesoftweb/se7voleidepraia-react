import { useState, useEffect, useContext } from "react";
import { Aluno } from "../../types/Aluno";
import { useLocation } from "react-router-dom";
import api from "../../services/api";
import { Header } from "../../components/Shared/Header";

import "./style.css";
import Checkbox from "../../components/Shared/Checkbox";
import { Button } from "../../components/Shared/Buttons";

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
    console.log(id, selecionado);
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

  const handleSendAttendance = async () => {
    const selecionados = students.filter((std) => std.selecionado == true);
    const token = await localStorage.getItem("authToken");
    const course = new URLSearchParams(location.search).get("course");

    const response = await api.post("/attendances", {
      teacher: token,
      course_id: course,
      students: selecionados,
    });

    if (response.data.success) {
      alert(response.data.message);
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div className="container">
      <Header title="Alunos turma [nome da turma]" />
      <div className="actions">
        <Checkbox
          checked={students.every((student) => student.selecionado)}
          onChange={(e) => checkAll(e.target.checked)}
          children="Selecionar Todos"
        />
      </div>
      <div className="students-wrapper">
        {students.map((student) => (
          <div className="student-item" key={student.id}>
            <div className="student">
              <img className="foto" src={student.img} alt="" />
              <div className="student-infos">
                <span>{student.name}</span>
                <span>{student.customer}</span>
                <span>{student.customer_phone}</span>
              </div>
            </div>

            <div className="checkbox-wrapper">
              <Checkbox
                children={""}
                checked={student.selecionado}
                onChange={(e) => setChecked(student.id, e.target.checked)}
              />
            </div>
          </div>
        ))}
      </div>
      <Button label="Enviar" onClick={handleSendAttendance} />
    </div>
  );
};
