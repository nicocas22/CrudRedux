import React, { useState } from "react";
//actions redux
import { crearNuevoProductoAction } from "../../redux/actions/ProductoActions";
import { useDispatch, useSelector } from "react-redux";

const NuevoProducto = ({history}) => {
  //estado de los componentes
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState(0);
  //utilizar use dispatch y te crea una funcion
  const dispatch = useDispatch();

  //acceder al state del store
  const cargando = useSelector(state => state.productos.loading);
  const error = useSelector(state => state.productos.error)
  console.log(cargando);

  
  //Mandar llamar el action de productoAction
  const agregarProducto = (producto) =>  dispatch(crearNuevoProductoAction(producto));

  // cuando el usuario haga submit
  const submitNuevoProducto = (e) => {
    e.preventDefault();
    console.log(precio);
    console.log(nombre);
    //validar formulario
    if (nombre.trim() === "" || precio <= 0) {
      return;
    }
    //si hay o no errores

    //crear el nuevo producto
    agregarProducto({
      nombre,
      precio,
    });

    //Redireccionar
    history.push('/');
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar Nuevo Producto
            </h2>
            <form onSubmit={submitNuevoProducto}>
              <div className="form-group">
                <label>Nombre Producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Producto"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Precio Producto</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio Producto"
                  value={precio}
                  onChange={(e) => setPrecio(Number(e.target.value))}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Agregar Producto
              </button>
            </form>
            {cargando ? <p>Cargando .... </p> : null}
            {error ? <p className="alert alert-danger p-2 mt-4 text-center">Se produjo un error </p> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoProducto;
