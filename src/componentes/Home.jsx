import { useState, useEffect } from 'react';
import {fetchWeatherFromCity} from "../api";

import "./Home.css";
import UltimasCidades from './UltimasCidades';
import Pesquisa from './Pesquisa';
import Loading from './states/Loading';
import Sucess from './states/Sucess';

const Home = () => {

    const [cidade, setCidade] = useState("");
    const [informacoes, setInformacoes] = useState({});
    const [loading, setLoading] = useState(false);
    const [cidadesPesquisadas, setCidadesPesquisadas] = useState(JSON.parse(localStorage.getItem('itens')) || []);

    function handleChange(e) {
        setCidade(e.target.value); 
    }

    async function buscaClima (e, cidadeInformada) {
        e.preventDefault();
        setCidade(cidadeInformada); 

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
            } else {
                const existeIndex = cidadesPesquisadas.indexOf(cidadeInformada);
                if(existeIndex !== 0) {
                    const atualizarCidadesPesquisadas = [
                        cidadeInformada,
                        ...cidadesPesquisadas.slice(0, existeIndex),
                        ...cidadesPesquisadas.slice(existeIndex + 1)
                    ];
                    setCidadesPesquisadas(atualizarCidadesPesquisadas);
                }
            };
            localStorage.setItem('itens', JSON.stringify(cidadesPesquisadas));
        } catch (e) {
            alert(e.message);         
        } finally {
            setCidade("");
            setLoading(false);
        }
    }

    useEffect(() => {

    }, []);


  return (
    <div className='container'>
        <Pesquisa cidade={cidade} buscaClima={buscaClima} handleChange={handleChange}/>
        {loading && <Loading />}
        {Object.keys(informacoes).length > 0  && <Sucess info={informacoes} />}
        {!loading && cidadesPesquisadas.length > 0 && <UltimasCidades cidadesPesquisadas={cidadesPesquisadas} buscaClima={buscaClima} />}
    </div>
  )
}

export default Home;