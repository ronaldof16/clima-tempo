import { useState } from 'react';

import "./Home.css";
import {fetchWeatherFromCity} from "../api";
import Loading from './states/Loading';
import Sucess from './states/Sucess';

const Home = () => {

    const [cidade, setCidade] = useState("");
    const [informacoes, setInformacoes] = useState({});
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
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
            setInformacoes({});
            let info = await fetchWeatherFromCity(cidade);
            setInformacoes({
                nome: info.name,
                icone: `https://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png`,
                temperatura: Math.round(info.main.temp),
                descricao: info.weather[0].description,
                humidade: info.main.humidity,
                vento: Math.round(info.wind.speed)
            });
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
            <div className='pesquisa'>
                <input type="text" value={cidade} onChange={handleChange} placeholder='Digite a cidade'/>
                <button onClick={buscaClima}>Pesquisar</button>
            </div>
        </div>
        
        {loading && <Loading />}
        {Object.keys(informacoes).length > 0  && <Sucess info={informacoes} />}
    </div>
  )
}

export default Home