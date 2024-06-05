import { TaskType } from "./types/Task";

import { AddTask, TaskList } from "./pages";
import { Header } from "./components/Header.tsx";

import { Route, Switch, useHistory } from "react-router-dom";
import { ROUTE } from "./lib/routes.ts";
import { useEffect } from "react";

function App() {
    const history = useHistory();

    useEffect(() => {
        // Automatically navigate to /home when the app loads
        history.push(ROUTE.HOME);
    }, [history]);

    return (
        <>
            <Header></Header>
            <h1 className="mb-3 text-4xl font-bold text-center bg-secondary">
                Tasks:
            </h1>
            <Switch>
                <Route path={ROUTE.HOME}>
                    <TaskList></TaskList>
                </Route>
                <Route path="/add-task">
                    <AddTask></AddTask>
                </Route>
            </Switch>
        </>
    );
}

export default App;
