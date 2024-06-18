import { useState } from 'react';

import "./Home.css";
import {fetchWeatherFromCity} from "../api";
import Loading from './states/Loading';
import Sucess from './states/Sucess';

const Home = () => {

    const [cidade, setCidade] = useState("");
    const [informacoes, setInformacoes] = useState({});
    const [loading, setLoading] = useState(false);
    const [cidadesPesquisadas, setCidadesPesquisadas] = useState([]);

    function handleChange(e) {
        setCidade(e.target.value); 
    }

    async function buscaClima (e, cidadeInformada) {
        e.preventDefault();
        setCidade(cidadeInformada); 
        console.log(cidade)

        if(cidadeInformada === "") {
            alert("É necessário informar uma cidade!");
            return;
        }

        try {
            setLoading(true);
            setInformacoes({});
            let info = await fetchWeatherFromCity(cidadeInformada);
            setInformacoes({
                nome: info.name,
                icone: `https://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png`,
                temperatura: Math.round(info.main.temp),
                descricao: info.weather[0].description,
                humidade: info.main.humidity,
                vento: Math.round(info.wind.speed),
                pais: `https://flagsapi.com/${info.sys.country}/flat/64.png`
            });
            if(!cidadesPesquisadas.includes(cidadeInformada)) {
                const novasCidades = [cidadeInformada, ...cidadesPesquisadas].slice(0, 3)
                setCidadesPesquisadas(novasCidades)
            };
        } catch (e) {
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
            <form className='pesquisa'>
                <input 
                    type="text" 
                    value={cidade} 
                    onChange={handleChange} 
                    placeholder='Digite a cidade'
                />
                <button onClick={(e) => buscaClima(e, cidade)}>Pesquisar</button>
            </form>
        </div>
        
        {loading && <Loading />}
        {Object.keys(informacoes).length > 0  && <Sucess info={informacoes} />}
        <div className='div-ultimas-cidades'>
            <h2>Últimas cidades pesquisadas</h2>
            <div className='div-btn-cidades'>
            {cidadesPesquisadas.map((cidade, index) => (
                <button 
                    className='btn-cidade' 
                    key={index} value={cidade} 
                    onClick={(e) => buscaClima(e, cidade)}
                >
                    {cidade}
                </button>
            ))}
            </div>
        </div>
    </div>
  )
}

export default Home