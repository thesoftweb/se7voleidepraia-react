import React, { useState, ChangeEvent } from "react";
import api from "../../../services/api";
import { Logo } from "../../../components/Shared/Logo";
import { Header } from "../../../components/Shared/Header";
import { Button } from "../../../components/Shared/Buttons";

import "./styles.css";

export const UploadFoto = () => {
  const student = new URLSearchParams(location.search).get("student");

  const [file, setFile] = useState<File | null>(null);

  const [previewURL, setPreviewURL] = useState<string>("");
  const [uploadStatus, setUploadStatus] = useState<string>("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);

      // Pré-visualização da imagem
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewURL(event.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    setUploadStatus("");

    if (!file) {
      return alert("Selecione um arquivo para enviar.");
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post(
        `/upload-foto?student=${student}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUploadStatus("Foto enviada com sucesso!");
      console.log(response.data); // Você pode manipular a resposta da API aqui.
    } catch (error) {
      console.error("Erro ao enviar arquivo:", error);
      setUploadStatus("Erro ao enviar arquivo.");
    }
  };

  return (
    <div className="container">
      <Logo />
      <Header title="Envie sua foto" />

      <label htmlFor="upload-button" className="upload-button">
        <input
          id="upload-button"
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: "none" }}
        />
        Selecione uma Foto
      </label>

      {previewURL && (
        <div className="image-preview">
          <img
            src={previewURL}
            alt="Preview"
            style={{ maxWidth: "300px" }}
            className="preview"
          />
        </div>
      )}
      <Button onClick={handleUpload} label="Enviar" />
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};
