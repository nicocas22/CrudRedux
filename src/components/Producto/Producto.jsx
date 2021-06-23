import React from "react";
import { Link, useHistory } from "react-router-dom";

//Redux
import { useDispatch } from "react-redux";
import { borrarProductoAction, obtenerProductoEditar} from "../../redux/actions/ProductoActions";

const Producto = ({ producto }) => {
  const { nombre, precio, id } = producto;

  const dispatch = useDispatch();
  const history = useHistory();
  //Confirmar si desea eliminarlo
  const confirmarElminarProducto = (id) => {
    //pasarlo al action
    dispatch(borrarProductoAction(id));
  };

  const redireccionarEdicion = (producto) => {
      dispatch(obtenerProductoEditar(producto))
    history.push(`/productos/editar/${producto.id}`);
  };

  return (
    <tr>
      <td>{nombre}</td>
      <td>
        <span className="font-weight-bold">$ {precio}</span>
      </td>
      <td className="acciones">
        <button
          type="button"
          onClick={() => redireccionarEdicion(producto)}
          className="btn btn-primary mr-2"
        >
          Editar
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => confirmarElminarProducto(id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Producto;
