import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { MainComponent } from "./components/MainComponent";
import { UserComponent } from "./components/UserComponent";
import { AdminComponent } from "./components/AdminComponent";
import { NavigationBar } from "./components/NavigationComponent";
import { Header } from "./components/HeaderComponent";
import { Footer } from "./components/FooterComponent";
import React from "react";
const axios = require("axios");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      editing: false,
      editingData: [],
      errormsg: "",
    };
    this.getData = this.getData.bind(this);
    this.getDataByTag = this.getDataByTag.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.setEditingFalse = this.setEditingFalse.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  handleDelete(id) {
    this.setState({ errormsg: "" });
    axios
      .delete(`http://localhost:8080/words/${id}`)
      .then((res) => {
        this.setState((previousState) => {
          return {
            data: previousState.data.filter((d) => d.id !== id),
          };
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          errormsg: error.response.status + " " + error.response.data,
        });
      });
  }

  getData() {
    this.setState({
      data: [],
      errormsg: "",
    });
    axios
      .get("http://localhost:8080/words")
      .then((result) => {
        this.setState({
          data: result.data.concat(this.state.data),
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          errormsg: error.response.status + " " + error.response.data,
        });
      });
  }

  getDataByTag(tag) {
    this.setState({
      data: [],
      errormsg: "",
    });
    axios
      .get(`http://localhost:8080/words/${tag}`)
      .then((result) => {
        this.setState({
          data: result.data.concat(this.state.data),
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          errormsg: error.response.status + " " + error.response.data,
        });
      });
  }

  handleEdit(words) {
    this.setState({ editing: true, editingData: words });
  }

  setEditingFalse() {
    this.setState({ editing: false });
  }

  render() {
    return (
      <BrowserRouter>
        <Header />
        <NavigationBar />
        <Routes>
          <Route path="/" element={<MainComponent />} />
          <Route
            path="/users"
            element={
              <UserComponent
                data={this.state.data}
                getData={this.getData}
                getDataByTag={this.getDataByTag}
                errormsg={this.state.errormsg}
              />
            }
          />
          <Route
            path="/admins"
            element={
              <AdminComponent
                data={this.state.data}
                getData={this.getData}
                handleDelete={this.handleDelete}
                handleEdit={this.handleEdit}
                setEditingFalse={this.setEditingFalse}
                editing={this.state.editing}
                editingData={this.state.editingData}
                errormsg={this.state.errormsg}
              />
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;
