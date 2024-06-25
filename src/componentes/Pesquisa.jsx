import './Pesquisa.css'

const Pesquisa = ({cidade, buscaClima, handleChange}) => {
  return (
    <div className='container-pesquisa'>
            <p className='titulo-descricao'>Pesquise o clima de qualquer cidade</p>
            <form className='pesquisa'>
                <input 
                    type="text" 
                    value={cidade} 
                    onChange={handleChange} 
                    placeholder='Digite a cidade'
                />
                <button className='btn-pesquisa' onClick={(e) => buscaClima(e, cidade)}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </form>
        </div>
  )
}

export default Pesquisa
