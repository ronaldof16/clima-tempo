import { useEffect } from "react";
import "./Sucess.css";

const Sucess = ({ info }) => {
    
    useEffect(() => {
        
    }, [info.nome]);
    
    
  return ( 
    <div className='container-informacoes'>
        <div className="container-titulo">
            <h1 className="cidade-titulo">{info.nome}</h1>
            <img className="cidade-img" src={info.pais} alt="Bandeira do país" />
        </div>
        <div className='clima-info'>
            <img src={info.icone} alt="" /> 
            <p className='temperatura'>{info.temperatura}°C</p>
        </div>
        <h3 className='descricao'>{info.descricao}</h3>
        <div className='info-detalhes'>
            <div className='info-humidade'>
                <i className="fa-solid fa-droplet"></i>
                <div>
                    <p className='text-bold'>Humidade</p>
                    <p>{info.humidade}%</p>
                </div>
            </div>
            <div className='info-vento'>
                <i className="fa-solid fa-wind"></i>
                <div>
                    <p className='text-bold'>Vento</p>
                    <p>{info.vento}km/h</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Sucess