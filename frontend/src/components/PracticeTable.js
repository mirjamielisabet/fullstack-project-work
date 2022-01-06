import React from "react";
import "../App.css";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

export class PracticeTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.formLength = 0;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearForm = this.clearForm.bind(this);
  }

  clearForm() {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    for (let key in this.state) {
      this.setState({ [key]: "" });
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let score = 0;
    let answerInfo = "This/these answers weren't correct: \n";
    let usersCorrectAnswers = "Well Done! This/these answers were correct: \n";

    for (let key in this.state) {
      if (key.toLowerCase() === this.state[key].toLowerCase()) {
        score += 1;
        usersCorrectAnswers += this.state[key] + "\n";
      } else {
        answerInfo += this.state[key] + " (Correct answer: " + key + ") \n";
      }
    }

    let allCorrectAnswers = "All correct answers: \n";
    this.props.data.map((words) => {
      return (allCorrectAnswers +=
        words.fin_word + " = " + words.en_word + "\n");
    });

    if (score > 0 && answerInfo !== "This/these answers weren't correct: \n") {
      alert(
        "Your score is: " +
          score +
          "/" +
          this.formLength +
          "\n\n" +
          usersCorrectAnswers +
          "\n" +
          answerInfo +
          "\n" +
          allCorrectAnswers
      );
    } else if (answerInfo !== "This/these answers weren't correct: \n") {
      alert(
        "Your score is: " +
          score +
          "/" +
          this.formLength +
          "\n\n" +
          answerInfo +
          "\n" +
          allCorrectAnswers
      );
    } else if (score > 0) {
      alert(
        "Your score is: " +
          score +
          "/" +
          this.formLength +
          "\n\n" +
          usersCorrectAnswers +
          "\n" +
          allCorrectAnswers
      );
    } else {
      alert(
        "Your score is: " +
          score +
          "/" +
          this.formLength +
          "\n\n" +
          allCorrectAnswers
      );
    }
  }

  render() {
    if (this.props.language === "fin") {
      return (
        <div>
          <p>Practice from Finnish to English</p>
          <br />
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            Validate
            autoComplete="off"
            onSubmit={this.handleSubmit}
          >
            <TableContainer
              sx={{ maxWidth: "800px", margin: "auto" }}
              component={Paper}
            >
              <Table
                sx={{ minWidth: 550, marginTop: "10px" }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: "50%", fontWeight: "bold" }}>
                      Finnish
                    </TableCell>
                    <TableCell style={{ width: "50%", fontWeight: "bold" }}>
                      English
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.data.map((words, index, array) => {
                    let name = words.en_word;
                    this.formLength = array.length;
                    return (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell> {words.fin_word} </TableCell>
                        <TableCell>
                          {" "}
                          <TextField
                            name={name}
                            id="outlined"
                            label="In English"
                            value={this.state.name}
                            onChange={this.handleChange}
                          />{" "}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <Button
              variant="contained"
              type="submit"
              sx={{ ":hover": { backgroundColor: "#ef4565" } }}
              style={{ marginTop: "10px" }}
            >
              Get score
            </Button>{" "}
            <Button
              variant="outlined"
              sx={{
                ":hover": { color: "#ef4565", border: "1px solid #ef4565" },
              }}
              style={{ marginTop: "10px" }}
              onClick={() => this.clearForm()}
            >
              Clear
            </Button>{" "}
            <Button
              variant="outlined"
              sx={{
                ":hover": { color: "#ef4565", border: "1px solid #ef4565" },
              }}
              style={{ marginTop: "10px" }}
              onClick={() => this.props.resetState()}
            >
              Cancel
            </Button>
          </Box>
        </div>
      );
    } else if (this.props.language === "en") {
      return (
        <div>
          <p>Practice from English to Finnish</p>
          <br />
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
            onSubmit={this.handleSubmit}
          >
            <TableContainer
              sx={{ maxWidth: "800px", margin: "auto" }}
              component={Paper}
            >
              <Table
                sx={{ minWidth: 550, marginTop: "10px" }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: "50%", fontWeight: "bold" }}>
                      English
                    </TableCell>
                    <TableCell style={{ width: "50%", fontWeight: "bold" }}>
                      Finnish
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.data.map((words) => (
                    <TableRow
                      key={words.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell> {words.en_word} </TableCell>
                      <TableCell>
                        {" "}
                        <TextField
                          name="inFinnish"
                          id="outlined"
                          label="In Finnish"
                          value={this.state.fin_word}
                          onChange={this.handleChange}
                        />{" "}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button
              variant="contained"
              type="submit"
              sx={{ ":hover": { backgroundColor: "#ef4565" } }}
              style={{ marginTop: "10px" }}
            >
              Get score
            </Button>{" "}
            <Button
              variant="outlined"
              sx={{
                ":hover": { color: "#ef4565", border: "1px solid #ef4565" },
              }}
              style={{ marginTop: "10px" }}
              onClick={() => this.props.resetState()}
            >
              Cancel
            </Button>
          </Box>
        </div>
      );
    } else {
      return "";
    }
  }
}
