//Todos los type son igual en el actiosn como en el reducer del mis tipo

import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  COMENZAR_DESCARGA_PRODUCTOS,
  DESCARGA_PRODUCTOS_ERROR,
  DESCARGA_PRODUCTOS_EXITO,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_ELIMINAR_ERROR,
  PRODUCTO_ELIMINAR_EXITO,
  OBTENER_PRODUCTO_EDITAR,
  PRODUCTO_EDITAR_ERROR,
  PRODUCTO_EDITAR_EXITO,
  COMENZAR_EDICION_PRODUCTO,
} from "../types/index";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

//Crear nuevos productos
export function crearNuevoProductoAction(producto) {
  return async (dispatch) => {
    dispatch(agregarProducto());

    try {
      //insertar en la api
      await clienteAxios.post("/productos", producto);

      //si todo sale bien, actualiza el state
      dispatch(agregarProductoExito(producto));

      //Alerta
      Swal.fire("Correcto", "El producto se agrego correctamente", "success");
    } catch (error) {
      //si hay un error cambia el state
      dispatch(agregarProductoError(true));

      //Alerta Error
      Swal.fire({
        icon: "error",
        title: "Ooops",
        text: "Se produjo un error Intentelo mas tarde",
      });
    }
  };
}

const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO,
  payload: true,
});

//si el producto se guarda en la bd
const agregarProductoExito = (producto) => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto,
});

//Si hubo un error
const agregarProductoError = (estado) => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: estado,
});

/////////////////////
// FUNCION QUE DESCARGA LOS PRODUCTOS DE LA BD

export function obtenerProductosAction() {
  return async (dispatch) => {
    dispatch(obtenerProductos());
    try {
      //Obtener datos desde la api
      const respuesta = await clienteAxios.get("/productos");

      //si todo sale bien Obtiene exitosamente los productos
      dispatch(obtenerProductosExito(respuesta.data));
    } catch (error) {
      dispatch(obtenerProductosError(true));
      //Alerta Error
      Swal.fire({
        icon: "error",
        title: "Ooops",
        text: "Se cayo el server",
      });
    }
  };
}

//mostrar productos
const obtenerProductos = () => ({
  type: COMENZAR_DESCARGA_PRODUCTOS,
  payload: true,
});

const obtenerProductosExito = (productos) => ({
  type: DESCARGA_PRODUCTOS_EXITO,
  payload: productos,
});

const obtenerProductosError = (estado) => ({
  type: DESCARGA_PRODUCTOS_ERROR,
  payload: estado,
});

//SELECIONA Y ELIMINA PRODUCTO
export function borrarProductoAction(id) {
  return async (dispatch) => {
    dispatch(obtenerProductoElimanar(id));

    try {
      await clienteAxios.delete(`/productos/${id}`);
      //Alerta Pre borrado
      Swal.fire({
        title: "esta seguro que desea eliminar",
        text: "esto no tiene vuelta atras",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Eliminar!",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(eliminarProductoExito());
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    } catch (error) {
      dispatch(eliminarProductoErro());
    }
  };
}

const obtenerProductoElimanar = (id) => ({
  type: OBTENER_PRODUCTO_ELIMINAR,
  payload: id,
});

const eliminarProductoExito = () => ({
  type: PRODUCTO_ELIMINAR_EXITO,
});

const eliminarProductoErro = () => ({
  type: PRODUCTO_ELIMINAR_ERROR,
  payload: true,
});

//COLOCAR PRODUCTO EN EDICION

export function obtenerProductoEditar(producto) {
  return (dispatch) => {
    dispatch(obtenerProductoActionEditar(producto));
  };
}

const obtenerProductoActionEditar = (producto) => ({
  type: OBTENER_PRODUCTO_EDITAR,
  payload: producto,
});

//EDITA UN REGISTRO EN LA API Y EL STATE
export function editarProductoAction(producto) {
  return async (dispatch) => {
    dispatch(editarProducto());
    try {
      const resultado = await clienteAxios.put(
        `/productos/${producto.id}`,
        producto
      );
      dispatch(editarProductoExito(producto));
      console.log(resultado);
    } catch (error) {}
  };
}

const editarProducto = (producto) => ({
  type: COMENZAR_EDICION_PRODUCTO,
 
});

const editarProductoExito = (producto) => ({
  type: PRODUCTO_EDITAR_EXITO,
  payload: producto
})