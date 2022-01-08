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
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

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

  alertBox() {
    return (
      <Alert
        severity="success"
        align="left"
        sx={{ margin: "auto", maxWidth: "500px" }}
        onClose={() => this.close()}
      >
        <AlertTitle>Vastausten tarkistus onnistui</AlertTitle>
        {this.props.alertText}
      </Alert>
    );
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  close() {
    this.props.closeScore();
    this.clearForm();
  }

  handleSubmit(event) {
    event.preventDefault();
    let score = 0;
    let answerInfo = "Nämä vastaukset eivät olleet oikein: \n";
    let usersCorrectAnswers = "Hienoa! Nämä vastaukset olivat oikein: \n";

    for (let key in this.state) {
      if (key.toLowerCase() === this.state[key].toLowerCase()) {
        score += 1;
        usersCorrectAnswers += this.state[key] + "\n";
      } else {
        answerInfo += this.state[key] + " (Oikea vastaus: " + key + ") \n";
      }
    }

    let allCorrectAnswers = "Kaikki oikeat vastaukset: \n";
    this.props.data.map((words) => {
      return (allCorrectAnswers +=
        words.fin_word + " = " + words.en_word + "\n");
    });

    if (score > 0 && answerInfo !== "Nämä vastaukset eivät olleet oikein: \n") {
      this.props.setAlertText(
        "Pisteesi ovat: " +
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
    } else if (answerInfo !== "Nämä vastaukset eivät olleet oikein: \n") {
      this.props.setAlertText(
        "Pisteesi ovat: " +
          score +
          "/" +
          this.formLength +
          "\n\n" +
          answerInfo +
          "\n" +
          allCorrectAnswers
      );
    } else if (score > 0) {
      this.props.setAlertText(
        <div>
          <p>
            Pisteesi ovat: {score}/{this.formLength}
          </p>
          <p>{usersCorrectAnswers}</p>
          <p>{allCorrectAnswers}</p>
        </div>
      );
    } else {
      this.props.setAlertText(
        "Pisteesi ovat: " +
          score +
          "/" +
          this.formLength +
          "\n\n" +
          allCorrectAnswers
      );
    }
    this.props.showScore();
  }

  render() {
    if (this.props.language === "fin") {
      return (
        <div>
          <p>Harjoittele suomesta englanniksi</p>
          <br />
          {this.props.visibleScore && this.alertBox()}
          <br />
          {this.props.visibleScore === false && (
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
                          key={words.id}
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
                              label="Englanniksi"
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
                Valmis
              </Button>{" "}
              <Button
                variant="outlined"
                sx={{
                  ":hover": { color: "#ef4565", border: "1px solid #ef4565" },
                }}
                style={{ marginTop: "10px" }}
                onClick={() => this.clearForm()}
              >
                Tyhjennä
              </Button>{" "}
              <Button
                variant="outlined"
                sx={{
                  ":hover": { color: "#ef4565", border: "1px solid #ef4565" },
                }}
                style={{ marginTop: "10px" }}
                onClick={() => this.props.resetState()}
              >
                Peruuta
              </Button>
            </Box>
          )}
        </div>
      );
    } else if (this.props.language === "en") {
      return (
        <div>
          <p>Harjoittele englannista suomeksi</p>
          <br />
          {this.props.visibleScore && this.alertBox()}
          <br />
          {this.props.visibleScore === false && (
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
                    {this.props.data.map((words, index, array) => {
                      let name = words.fin_word;
                      this.formLength = array.length;
                      return (
                        <TableRow
                          key={words.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell> {words.en_word} </TableCell>
                          <TableCell>
                            {" "}
                            <TextField
                              name={name}
                              id="outlined"
                              label="Suomeksi"
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
                Valmis
              </Button>{" "}
              <Button
                variant="outlined"
                sx={{
                  ":hover": { color: "#ef4565", border: "1px solid #ef4565" },
                }}
                style={{ marginTop: "10px" }}
                onClick={() => this.clearForm()}
              >
                Tyhjennä
              </Button>{" "}
              <Button
                variant="outlined"
                sx={{
                  ":hover": { color: "#ef4565", border: "1px solid #ef4565" },
                }}
                style={{ marginTop: "10px" }}
                onClick={() => this.props.resetState()}
              >
                Peruuta
              </Button>
            </Box>
          )}
        </div>
      );
    } else {
      return "";
    }
  }
}
