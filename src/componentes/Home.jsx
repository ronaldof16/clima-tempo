import { useState } from 'react';

import "./Home.css";

const Home = () => {
// 76174089709eb4883efb980c425965d4

    const [cidade, setCidade] = useState("");
    const [informacoes, setInformacoes] = useState({});
    const [temperatura, setTemperatura] = useState(0);
    const [tempo, setTtempo] = useState("nada");

    function handleChange(e) {
        setCidade(e.target.value);
    }

    async function buscaClima() {
        await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&lang=pt_br&appid=76174089709eb4883efb980c425965d4`)
        .then(r => r.json())
        .then((r) => {
            setInformacoes(r)
            setTemperatura(informacoes.main.temp)
            setTtempo(informacoes.weather[0].description)});
        console.log(informacoes)
        
        //Tentativa que não funcionou
        /*await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&lang=pt_br&appid=76174089709eb4883efb980c425965d4`)
        .then(r => r.json())
        .then(r => setInformacoes(r))
        console.log(informacoes)
        await console.log(informacoes.main.tem)
        console.log(informacoes.main.temp)*/
        
    }

  return (
    <div>
        <h1>Aplicação Clima-Tempo</h1>
        <div>
            <input type="text" value={cidade} onChange={handleChange} placeholder='Digite a cidade'/>
            <button onClick={buscaClima}>Buscar</button>
        </div>
        <div>
            <h2>{informacoes.name}</h2>
            <p>{parseInt(temperatura)}°C</p>
            <p>{tempo}</p>
        </div>
    </div>
  )
}

export default Home