import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {editarProductoAction} from '../../redux/actions/ProductoActions'
import { useHistory } from 'react-router-dom';

const EditarProducto = () => {
  //estado nuevo del producto
  const [producto, setProducto] = useState({
    nombre: '',
    precio: '',
  })

  //producto a editar
  const productoeditar = useSelector(state => state.productos.productoeditar);
  
  const history = useHistory();
  //taer el disptch
  const dispatch = useDispatch();
 
  //Llenar el state
  useEffect(() => {
    setProducto(productoeditar)
  }, [productoeditar])

  //leer datos del form
  const onChangeFormulario = e => {
    setProducto({
      ...producto,
      [e.target.name] : e.target.value,
    })
  }

  const {nombre, precio, id} = producto;


  const editarProducto = e => {
    e.preventDefault();
    dispatch(editarProductoAction(producto))
    history.push('/')
  }

    return (
        <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Editar Nuevo Producto
            </h2>
            <form
            onSubmit={editarProducto}
            >
            <div className="form-group">
                    <label>Nombre Producto</label>
                    <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre Producto"
                    name="nombre"
                    value={nombre}
                    onChange={onChangeFormulario}
                    />
                </div>
                <div className="form-group">
                    <label>Precio Producto</label>
                    <input
                    type="number"
                    className="form-control"
                    placeholder="Precio Producto"
                    name="precio"
                    value={precio}
                    onChange={onChangeFormulario}
                    />
                </div>
                <button type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100">
                    Editar Producto
                </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    )
}

export default EditarProducto
