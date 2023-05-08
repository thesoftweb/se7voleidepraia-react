import './style.css';

export const AlunosItem = () => {
    return (
        <div className='container'>
            <div id="divBusca">
                <input type="text" id="txtBusca" placeholder="Buscar..." />
                <img src="search3.png" id="btnBusca" alt="Buscar" />
            </div>
            <div className='lista'>
                <div className="perfil">

                    <label> Matheus sales</label>
                </div>
                <div className="perfil">

                    <label> Matheus sales</label>
                </div>

            </div>
        </div>

    )
}

