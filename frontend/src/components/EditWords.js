import React from "react";
import "../App.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

/**
 * Class that contains the form for editing the saved word pairs, returns the form component.
 */
export class EditWords extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fin_word: this.props.words.fin_word,
      en_word: this.props.words.en_word,
      tag: this.props.words.tag,
      errormsg: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * Handles the change in the input fields: saves the value to the state.
   * @param {object} event
   */
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  /**
   * Handles the submitting of the form: by using axios saves the inputted data to the database.
   * Then calls the resetState function and sets editing to false by calling setEditingFalse function.
   * @param {object} event
   */
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ errormsg: "" });
    axios
      .put(`http://localhost:8080/words/${this.props.words.id}`, {
        fin_word: this.state.fin_word,
        en_word: this.state.en_word,
        tag: this.state.tag,
      })
      .then(() => {
        this.props.resetState();
        this.props.setEditingFalse();
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          errormsg: error.response.status + " " + error.response.data,
        });
      });
  }

  render() {
    return (
      <div>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          Validate
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          <div>
            <TextField
              required
              autoFocus
              name="fin_word"
              id="outlined"
              label="Edit Finnish word"
              value={this.state.fin_word}
              onChange={this.handleChange}
              error={this.state.fin_word === ""}
              helperText={
                this.state.fin_word === "" ? "This field must be filled" : " "
              }
            />
            <TextField
              required
              name="en_word"
              id="outlined"
              label="Edit English word"
              value={this.state.en_word}
              onChange={this.handleChange}
              error={this.state.en_word === ""}
              helperText={
                this.state.en_word === "" ? "This field must be filled" : " "
              }
            />
            <TextField
              name="tag"
              id="outlined"
              label="Edit Tag"
              value={this.state.tag}
              onChange={this.handleChange}
            />
          </div>
          <Button
            variant="contained"
            type="submit"
            sx={{ ":hover": { backgroundColor: "#ef4565" } }}
            style={{ marginTop: "5px" }}
          >
            Save Changes
          </Button>{" "}
          <Button
            variant="outlined"
            sx={{ ":hover": { color: "#ef4565", border: "1px solid #ef4565" } }}
            style={{ marginTop: "5px" }}
            onClick={() => this.props.setEditingFalse()}
          >
            Cancel
          </Button>
        </Box>
        <br />
        {this.state.errormsg}
      </div>
    );
  }
}
