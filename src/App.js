import React, { useEffect, useState } from 'react';
import './App.css';
import fetchGraphQL from './fetchGraphQL';

function App() {
  const [name, setName] = useState(null);

  useEffect(() => {
    let isMounted  = true;
    fetchGraphQL(`
      query RepositoryNameQuery {
        repository(owner: "heIsThePirate" name: "wingy-music") {
          name
        }
      }
      `).then(response => {
        // Avoid updating state if the component unmounted efore the fetch completes
        if(!isMounted) {
          return;
        }
        const data = response.data;
        setName(data.repository.name);
      }).catch(error => console.log(error));

      return () => {
        isMounted = false;
      };
  }, []);

  // Render "Loading..." until the query completes
  return (
    <div className="App">
      <header className="App-header">
        <p>
          {name != null ? `Respository: ${name}` : "Loading..."}
        </p>
      </header>
    </div>
  );
}

export default App;
