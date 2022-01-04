import React from "react";
import "../App.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

export class EditWords extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fin_word: this.props.words.fin_word,
      en_word: this.props.words.en_word,
      tag: this.props.words.tag,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios
      .put(`http://localhost:8080/words/${this.props.words.id}`, {
        fin_word: this.state.fin_word,
        en_word: this.state.en_word,
        tag: this.state.tag,
      })
      .then(() => {
        this.props.getData();
        this.props.setEditingFalse();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
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
            id="outlined"
            label="Edit Finnish word"
            value={this.state.fin_word}
            onChange={this.handleChange}
            error={this.state.fin_word === ""}
            helperText={this.state.fin_word === "" ? "Required!" : " "}
          />
          <TextField
            required
            name="en_word"
            id="outlined"
            label="Edit English word"
            value={this.state.en_word}
            onChange={this.handleChange}
            error={this.state.en_word === ""}
            helperText={this.state.en_word === "" ? "Required!" : " "}
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
    );
  }
}
