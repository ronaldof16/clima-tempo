import { useState } from 'react';

import "./Home.css";

const Home = () => {

    const [cidade, setCidade] = useState("");
    const [informacoes, setInformacoes] = useState({});

    function handleChange(e) {
        setCidade(e.target.value);
    }

    async function buscaClima() {
        const resposta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&lang=pt_br&appid=${import.meta.env.VITE_KEY_OPEN_WATHER_MAP}`);
        const data = await resposta.json();
        console.log(data);
        setInformacoes(data);
    }

  return (
    <div className='container'>
        <p className='titluo-descricao'>Pesquise o clima de qualquer cidade</p>
        <div>
            <input type="text" value={cidade} onChange={handleChange} placeholder='Digite a cidade'/>
            <button onClick={buscaClima}>Pesquisar</button>
        </div>
        
        {Object.keys(informacoes).length > 0  && (
        <div>
            <h1>{informacoes.name}</h1>
            <div>
                <img src={`https://openweathermap.org/img/wn/${informacoes.weather[0].icon}@2x.png`} alt="" />
                <p>{Math.round(informacoes.main.temp)}°C</p>
            </div>
            <h3>{informacoes.weather[0].description}</h3>
            <div>
                <div>
                    <i class="fa-solid fa-droplet"></i>
                    <div>
                        <p>Humidade</p>
                        <p>{informacoes.main.humidity}%</p>
                    </div>
                </div>
                <div>
                    <p>ícone</p>
                    <div>
                    <i className="fa-solid fa-wind"></i>
                        <p>{Math.round(informacoes.wind.speed)}km/h</p>
                    </div>
                </div>
            </div>
        </div>
        )}
        
    </div>
  )
}

export default Home