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

    async function buscaClima (e) {
        e.preventDefault();
        // handleChange(e)
        // console.log(cidade)

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
                vento: Math.round(info.wind.speed),
                pais: `https://flagsapi.com/${info.sys.country}/flat/64.png`
            });
            const novasCidades = [cidade, ...cidadesPesquisadas].slice(0, 3)
            setCidadesPesquisadas(novasCidades)
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
                <input type="text" value={cidade} onChange={handleChange} placeholder='Digite a cidade'/>
                <button onClick={buscaClima}>Pesquisar</button>
            </form>
        </div>
        
        {loading && <Loading />}
        {Object.keys(informacoes).length > 0  && <Sucess info={informacoes} />}
        {/* <div>
            <button 
                value={cidadesPesquisadas[2]}
                onClick={buscaClima}
                >
                    {cidadesPesquisadas[2]}
            </button>
        </div> */}
    </div>
  )
}

export default Home