import React from "react";
import "../App.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

/**
 * Class that contains the form for adding new word pairs to the database, returns the form component.
 */
export class AddWords extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fin_word: "",
      en_word: "",
      tag: "",
      clicked: false,
      errormsg: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * Handles the change in the input fields: saves the input to the state.
   * @param {object} event
   */
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  /**
   * Handles the submitting of the form: by using axios posts the inputted data from state to the database.
   * Then updates the states data array by calling the getData function and empties the state's attributes.
   * @param {object} event
   */
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ errormsg: "" });
    axios
      .post("http://localhost:8080/words", {
        fin_word: this.state.fin_word,
        en_word: this.state.en_word,
        tag: this.state.tag,
      })
      .then(() => {
        this.props.getData();
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          errormsg: error.response.status + " " + error.response.data,
        });
      });

    this.setState({ fin_word: "", en_word: "", tag: "", clicked: false });
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
              name="fin_word"
              id="outlined-required"
              label="Finnish word"
              placeholder="Type the finnish word"
              value={this.state.fin_word}
              onChange={this.handleChange}
              error={this.state.fin_word === "" && this.state.clicked === true}
              helperText={
                this.state.fin_word === "" && this.state.clicked === true
                  ? "This field must be filled"
                  : " "
              }
            />
            <TextField
              required
              name="en_word"
              id="outlined-required"
              label="English word"
              placeholder="Type the english word"
              value={this.state.en_word}
              onChange={this.handleChange}
              error={this.state.en_word === "" && this.state.clicked === true}
              helperText={
                this.state.en_word === "" && this.state.clicked === true
                  ? "This field must be filled"
                  : " "
              }
            />
            <TextField
              name="tag"
              id="outlined"
              label="Tag"
              placeholder="Type the tag"
              value={this.state.tag}
              onChange={this.handleChange}
            />
          </div>

          <Button
            onClick={() => this.setState({ clicked: true })}
            variant="contained"
            type="submit"
            sx={{ ":hover": { backgroundColor: "#ef4565" } }}
            style={{ marginTop: "5px" }}
          >
            Submit
          </Button>
        </Box>
        <br />
        {this.state.errormsg}
      </div>
    );
  }
}
