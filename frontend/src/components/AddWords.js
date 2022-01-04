import React from "react";
import "../App.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

export class AddWords extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fin_word: "",
      en_word: "",
      tag: "",
      clicked: false,
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
      });

    this.setState({ fin_word: "", en_word: "", tag: "" });
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
    );
  }
}
