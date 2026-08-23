import { Router, Route, Switch } from "wouter";
import Home from "./pages/Home";
import TemplateDetail from "./pages/TemplateDetail";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/templates/:id" component={TemplateDetail} />
      </Switch>
    </Router>
  );
}
