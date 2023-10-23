import './App.js';
import './App.css';


<div className="card text-center">
        <div className="card-header">
          GESTION DE EMPLEADOS
          <div style={{ float: 'right' }}>
            <button className='btn btn-primary btn-sm' onClick={logout}>Salir</button>
          </div>
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre:</span>
            <input type="text" 
              onChange={(event) => {
                setNombre(event.target.value)
              }}
              className="form-control" value={nombre} placeholder="Ingresa el nombre" aria-label="Username" aria-describedby="basic-addon1"></input>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Edad:</span>
            <input type="number" value={edad}
              onChange={(event) => {
                setEdad(event.target.value)
              }}
              className="form-control" placeholder="Ingresa la edad" aria-label="Username" aria-describedby="basic-addon1"></input>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Pais:</span>
            <input type="text" value={pais}
              onChange={(event) => {
                setPais(event.target.value)
              }}
              className="form-control" placeholder="Ingresa el pais" aria-label="Username" aria-describedby="basic-addon1"></input>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Cargo:</span>
            <input type="text" value={cargo}
              onChange={(event) => {
                setCargo(event.target.value)
              }}
              className="form-control" placeholder="Ingresa el cargo" aria-label="Username" aria-describedby="basic-addon1"></input>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Años:</span>
            <input type="number" value={anios}
              onChange={(event) => {
                setAnios(event.target.value)
              }}
              className="form-control" placeholder="Años en la empresa" aria-label="Username" aria-describedby="basic-addon1"></input>
          </div>
        </div>
        <div className="card-footer text-muted">
          {
            editar?
              <div>
                <button className='btn btn-warning m-2' onClick={update}>Actualizar</button>
                <button className='btn btn-info m-2' onClick={limpiarCampos}>Cancelar</button>
              </div>
              : <button className='btn btn-success' onClick={add}>Registrar</button>
          }
        </div>
      </div>