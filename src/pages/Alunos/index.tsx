import { useState, useEffect, useContext } from "react";
import { Aluno } from "../../types/Aluno";
import { Link, useLocation } from "react-router-dom";
import api from "../../services/api";
import { Header } from "../../components/Shared/Header";

import "./style.css";
import Checkbox from "../../components/Shared/Checkbox";
import { Button } from "../../components/Shared/Buttons";
import { Turmas } from "../../types/Turmas";

export const Alunos = () => {
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState<Aluno[]>([]);
  const [title, setTitle] = useState("");
  const location = useLocation();

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    setLoading(true);
    const course = new URLSearchParams(location.search).get("course");
    var courseName = new URLSearchParams(location.search).get("name");

    setTitle(`Alunos da turma ${courseName}`);
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
      <Header
        title={title}
        subtitle="Selecione o aluno para marcar frequência"
      />
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
            <div className="student-data">
              <img className="foto" src={student.img} alt="" />
              <span>{student.name}</span>
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
      <Button label="Registrar Frequência" onClick={handleSendAttendance} />

      <div className="navigation">
        <Link to="/turma" className="home-button">
          Voltar para turmas
        </Link>
      </div>
    </div>
  );
};
