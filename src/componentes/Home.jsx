import { useState } from 'react';

import "./Home.css";
import {fetchWeatherFromCity} from "../api";

const Home = () => {

    const [cidade, setCidade] = useState("");
    const [informacoes, setInformacoes] = useState({});
    const [loading, setLoading] = useState(false);

    async function handleChange(e) {
        setCidade(e.target.value);
        
    }

    async function buscaClima () {
        if(cidade === "") {
            alert("É necessário informar uma cidade!");
            setCidade("");
            return; 
        }

        try {
            setLoading(true);
            let info = await fetchWeatherFromCity(cidade);
            if (info.cod === "404") {
                throw Error("Cidade não encontrada, verifique e digite novamente!");
            } else {
                setInformacoes(info);
            }   
        } catch (e) {
            console.log(e.message);
            alert(e.message);         
        } finally {
            setCidade("");
            setLoading(false);
        } 
    }

  return (
    <div className='container'>
        <div className='container-pesquisa'>
            <p className='titulo-descricao'>Pesquise o clima de qualquer cidade</p>
            <div className='pesquisa'>
                <input type="text" value={cidade} onChange={handleChange} placeholder='Digite a cidade'/>
                <button onClick={buscaClima}>Pesquisar</button>
            </div>
        </div>
        
        {loading && <p className='loading'>Carregando....</p>}
        {Object.keys(informacoes).length > 0  && (
        <div className='container-informacoes'>
            <h1>{informacoes.name}</h1>
            <div className='clima-info'>
                <img src={`https://openweathermap.org/img/wn/${informacoes.weather[0].icon}@2x.png`} alt="" />
                <p className='temperatura'>{Math.round(informacoes.main.temp)}°C</p>
            </div>
            <h3 className='descricao'>{informacoes.weather[0].description}</h3>
            <div className='info-detalhes'>
                <div className='info-humidade'>
                    <i className="fa-solid fa-droplet"></i>
                    <div>
                        <p className='text-bold'>Humidade</p>
                        <p>{informacoes.main.humidity}%</p>
                    </div>
                </div>
                <div className='info-vento'>
                    <i className="fa-solid fa-wind"></i>
                    <div>
                        <p className='text-bold'>Vento</p>
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