import React, { useState } from "react";
import { ListGroup, Button, Spinner } from "react-bootstrap";
import "./styles.css";

const List = () => {
  const [repositories, setRepositories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRepositories = async () => {
    setIsLoading(true); // Define isLoading como true para exibir o Spinner

    try {
      const response = await fetch("https://api.github.com/users/devpass-tech/repos");
      const data = await response.json();
      setRepositories(data); // Atualiza o estado com o array de repositórios recebido
    } catch (error) {
      console.error("Erro ao buscar repositórios:", error);
    }

    setIsLoading(false); // Define isLoading como false após a chamada ser concluída
  };

  return (
    <div className="list">
      <div className="container">
        <h2 className="title">Devpass Repositories</h2>

        {isLoading ?
          (<Spinner />) :
          (
            <ListGroup className="repositoriesList">

              {repositories.map((repo) => (
                <ListGroup.Item key={repo.id}>{repo.name}</ListGroup.Item>
              ))}

            </ListGroup>)}
        <Button data-testid="button" className="button" variant="primary" onClick={() => fetchRepositories()}>Fetch repositories</Button>
      </div>
    </div>
  );
};

export default List;
