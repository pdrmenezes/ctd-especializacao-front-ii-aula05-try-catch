import { useState, useEffect } from "react";
import "./App.css";

interface DataProps {
  title: string;
  image: string;
  id: number;
  name: string;
  description: string;
  actualData: Array<object>;
}

type ActualDataProps = Omit<DataProps, "name" | "actualData">;

const App = () => {
  const [data, setData] = useState<Array<ActualDataProps> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getData = async () => {
    try {
      const response = await fetch(`https://my-json-server.typicode.com/DH-Esp-Frontend/ctd-esp-front2-aula6-mesa3-main/postss`);
      console.log(response);

      if (!response.ok) {
        throw new Error(`Erro HTTP. Status: ${response.status}`);
      }
      const actualData: Array<ActualDataProps> = await response.json();
      setData(actualData);
      setError(null);
    } catch (err) {
      setError("Erro ao buscar posts");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <h1>Notícias de Rick and Morty</h1>
      {loading && <p>Um momento por favor...</p>}
      {error && (
        <p>
          Houve um problema: <code>{error}</code>
        </p>
      )}
      <article>
        {data &&
          data.map(({ id, title, description, image }: ActualDataProps) => (
            <span key={id}>
              <img src={image} alt={title} />
              <h2>{title}</h2>
              <p>{description}</p>
            </span>
          ))}
      </article>
    </div>
  );
};

export default App;
