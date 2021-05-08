import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import TaskEdit from "./components/TaskEdit";

if (document.getElementById("root")) {
    ReactDOM.render(
        <BrowserRouter>
            <Switch>
                <React.StrictMode>
                    <Route exact path="/:id/edit" component={TaskEdit} />
                    <App />
                </React.StrictMode>
            </Switch>
        </BrowserRouter>,
        document.getElementById("root")
    );
}
