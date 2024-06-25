import './UltimasCidades.css';

const UltimasCidades = ({ cidadesPesquisadas, buscaClima }) => {
  return (
    <div className='div-ultimas-cidades'>
            <h2>Últimas cidades pesquisadas</h2>
            <div className='div-btn-cidades'>
                {cidadesPesquisadas.map((cidade, index) => (
                    <button 
                        className='btn-cidade' 
                        key={index} 
                        value={cidade} 
                        onClick={(e) => buscaClima(e, cidade)}
                    >
                        {cidade}
                    </button>
                ))}
            </div>
        </div>
  )
}

export default UltimasCidades;