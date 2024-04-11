import { useState } from 'react';

import "./Home.css";

const Home = () => {

    const [cidade, setCidade] = useState("");
    const [informacoes, setInformacoes] = useState({});

    function handleChange(e) {
        setCidade(e.target.value);
    }

    async function buscaClima() {
        const resposta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&lang=pt_br&appid={ CHAVE_API }`);
        const data = await resposta.json();
        console.log(data);
        setInformacoes(data)   
    }

  return (
    <div>
        <h1>Aplicação Clima-Tempo</h1>
        <div>
            <input type="text" value={cidade} onChange={handleChange} placeholder='Digite a cidade'/>
            <button onClick={buscaClima}>Buscar</button>
        </div>

        {Object.keys(informacoes).length > 0  && (
        <div>
            <h2>{informacoes.name}</h2>
            <p>{parseInt(informacoes.main.temp)}°C</p>
            <p>{informacoes.weather[0].description}</p>
        </div>
        )}
        
    </div>
  )
}

export default Home