import './App.css';
import { useState } from "react";
import Axios from "axios";
import { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [empleadosCount, setEmpleadosCount] = useState(0);
  const navigate = useNavigate();
  const logout = () => {
    navigate('/login');
  };

  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState();
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [anios, setAnios] = useState();

  const [id, setId] = useState()

  const [editar, setEditar] = useState(false);

  const [empleadosList, setEmpleados] = useState([]);

  const add = () => {
    if (!pais) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El Campo Pais Es Obligatorio',
      })
      return;
    }
    if (!nombre) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El Campo Nombre Es Obligatorio',
      })
      return;
    }
    if (!cargo) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El Campo Cargo Es Obligatorio',
      })
      return;
    }
    if (!edad) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El Campo Edad Es Obligatorio',
      })
      return;
    }
    if (!anios) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El Campo Años Es Obligatorio',
      })
      return;
    }
    Axios.post("http://localhost:3001/create", {
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios
    }).then(() => {
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Correcto!!!</strong>",
        html: "<i>El empleado <strong>" + nombre + "</strong> se registró con exito</i>",
        icon: 'success',
        timer: 3000
      })
    })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error Al Registrar Empleado',
        })
      });
  }
  const update = () => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios
    }).then(() => {
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Actualizado!!!</strong>",
        html: "<i>El empleado <strong>" + nombre + "</strong> fue actualizado con exito</i>",
        icon: 'success',
        timer: 3000
      })
    })
      .catch((error) => {
        console.error(error.response);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error Al Actualizar Empleados',
        })
      });

  }
  const deleteEmple = (val) => {
    Swal.fire({
      title: 'Estas seguro de eliminar?',
      html: "<i>Estas seguro de eliminar a <strong>" + val.nombre + "</strong>?</i>",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.id}`).then(() => {
          getEmpleados();
          limpiarCampos();
          Swal.fire(
            'Eliminado!',
            val.nombre + ' Fue eliminado',
            'success'
          )
        });

      }
    })
      .catch((error) => {
        console.error(error.response);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error Al Actualizar Empleados',
        })
      });

  }

  const limpiarCampos = () => {
    setAnios("");
    setNombre("");
    setCargo("");
    setEdad("");
    setPais("");
    setId("");
    setEditar(false);

  }

  const editarEmpleado = (val) => {
    console.log("Editar empleado: ", val)
    setEditar(true);
    setNombre(val.nombre);
    setEdad(val.edad);
    setCargo(val.cargo);
    setPais(val.pais);
    setAnios(val.anios);
    setId(val.id);
    setShowModal(true);
  }
  const getEmpleados = () => {
    Axios.get("http://localhost:3001/empleados")
      .then((response) => {
        setEmpleados(response.data);
        setEmpleadosCount(response.data.length);
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error Al Obtener La Lista De Empleados',
        })
      });
  }
  useEffect(() => {
    getEmpleados();
  }, []);
  return (
    <div className="container">
      <Navbar className="navSi" bg="dark" expand="lg">
        <Navbar.Brand className="blanck" href="#home">Channel Sport</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link className="iniblanck" href="#home">Inicio</Nav.Link>
            <Nav.Link className="quienblanck" href="#home">Quines Somos</Nav.Link>
          </Nav>
          <Button variant="primary" className="m-2" onClick={() => setShowModal(true)}>Agregar</Button>
          <span className="ml-2 text-light">({empleadosCount} empleados/100)</span>
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <div className="card text-center">
              <div className="card-header">
                GESTION DE EMPLEADOS
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
                  editar ?
                    <div>
                      <button className='btn btn-warning m-2' onClick={() => {
                        update();
                        setShowModal(false);
                      }}>Actualizar</button>
                      <button className='btn btn-info m-2' onClick={() => {
                        limpiarCampos();
                        setShowModal(false); // Cierra el modal
                      }}>Cancelar</button>
                    </div>
                    : <button className='btn btn-success' onClick={() => {
                      add();
                      setShowModal(false);
                    }}>Registrar</button>
                }
              </div>
            </div>
          </Modal>
        </Navbar.Collapse>
        <Button variant="secondary" className="m-2" onClick={logout}>Salir</Button>
      </Navbar>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">Pais</th>
            <th scope="col">Años</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleadosList.map((val, key) => {
            return <tr key={val.id}>
              <th>{val.id}</th>
              <td>{val.nombre}</td>
              <td>{val.edad}</td>
              <td>{val.pais}</td>
              <td>{val.cargo}</td>
              <td>{val.anios}</td>
              <td>
                <div className="btn-group" role="group" aria-label="Basic example">
                  <button type="button"
                    onClick={() => {
                      editarEmpleado(val);
                    }}
                    className="btn btn-info m-2">Editar
                  </button>
                  <button type="button" onClick={() => {
                    deleteEmple(val);
                  }} className="btn btn-danger m-2">Eliminar</button>
                </div>
              </td>
            </tr>;

          })}

        </tbody>
      </table>
    </div>
  );
}

export default App;
