import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { MainComponent } from "./components/MainComponent";
import { UserComponent } from "./components/UserComponent";
import { AdminComponent } from "./components/AdminComponent";
import { NavigationBar } from "./components/NavigationComponent";
import React from "react";
const axios = require("axios");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    axios
      .get("http://localhost:8080/words")
      .then((result) => {
        this.setState({
          data: result.data.concat(this.state.data),
        });
      })
      .catch((error) => {
        this.setState({
          error,
        });
      });
  }

  render() {
    console.log(this.state.data);
    return (
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<MainComponent />} />
          <Route path="/user" element={<UserComponent />} />
          <Route
            path="/teacher"
            element={
              <AdminComponent data={this.state.data} getData={this.getData} />
            }
          />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
