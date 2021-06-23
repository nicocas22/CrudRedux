import React from "react";
import {
  Header,
  Productos,
  NuevoProducto,
  EditarProducto,
} from "./components/index";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Redux
//El provider es desde donde fluyen los datos
import { Provider } from "react-redux";
import store from "./redux/storage/store";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Header />
        <div className="container mt-5">
          <Switch>
            <Route exact path="/" component={Productos} />
            <Route exact path="/productos/nuevo/" component={NuevoProducto} />
            <Route
              exact
              path="/productos/editar/:id"
              component={EditarProducto}
            />
          </Switch>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
