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

/**
 * Class that returns the application.
 * @author Mirjami Laiho
 */
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

  /**
   * When component mounts calls the getData function.
   */
  componentDidMount() {
    this.getData();
  }

  /**
   * Handles the deletion of the data: by using axios deletes the data that haves the given id.
   * Then, according to the deletion, alters the data array at the state.
   * @param {number} id - The id on the basis of which the data is deleted
   */
  handleDelete(id) {
    this.setState({ errormsg: "" });
    axios
      .delete(`/words/${id}`)
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

  /**
   * Retrieves the data from the database: first empties the data array and then by using axios gets the data and saves it to the state.
   */
  getData() {
    this.setState({
      data: [],
      errormsg: "",
    });
    axios
      .get("/words")
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

  /**
   * Retrieves the data from the database, filterd by the tag: by using axios gets the data and saves it to the state.
   * @param {string} tag - The tag on the basis of which the data is retrieved
   */
  getDataByTag(tag) {
    this.setState({
      data: [],
      errormsg: "",
    });
    axios
      .get(`/words/${tag}`)
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

  /**
   * Sets the state's editing attribute's value to true and saves the data that is being edited to the state.
   * @param {Array} words - consists of the data of the word pair being edited
   */
  handleEdit(words) {
    this.setState({ editing: true, editingData: words });
  }

  /**
   * Sets the state's editing attribute's value to false.
   */
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
                getDataByTag={this.getDataByTag}
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
