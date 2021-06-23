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
  COMENZAR_EDICION_PRODUCTO
} from "../types/index";
//Cada reducer tiene su propio state

const initialState = {
  productos: [],
  error: false,
  loading: false,
  productoeliminar: null,
  productoeditar: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    //Aqui agregar productos
    case AGREGAR_PRODUCTO:
      return {
        ...state,
        loading: action.payload,
      };
    case AGREGAR_PRODUCTO_EXITO:
      return {
        ...state,
        loading: false,
        productos: [...state.productos, action.payload],
      };
    case AGREGAR_PRODUCTO_ERROR:
    case DESCARGA_PRODUCTOS_ERROR:
    case PRODUCTO_ELIMINAR_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    //Aqui Obtener productos
    case COMENZAR_DESCARGA_PRODUCTOS:
      return {
        ...state,
        loading: action.payload,
      };
    //Obtener productos exito
    case DESCARGA_PRODUCTOS_EXITO:
      return {
        ...state,
        loading: false,
        error: false,
        productos: action.payload,
      };
    case OBTENER_PRODUCTO_ELIMINAR:
      return{
        ...state,
        productoeliminar: action.payload,
      }
    case PRODUCTO_ELIMINAR_EXITO: 
      return{
        ...state,
        productos: state.productos.filter( producto => producto.id !== state.productoeliminar),
        productoeliminar: null
      }
    case OBTENER_PRODUCTO_EDITAR:
      return{
        ...state,
        productoeditar: action.payload
      }
    case PRODUCTO_EDITAR_EXITO: 
      return{
        ...state,
        productoeditar: null,
        productos: state.productos.map(
          producto => producto.id === action.payload.id ? producto = action.payload : producto
        )
      }
    default:
      return state;
  }
}
