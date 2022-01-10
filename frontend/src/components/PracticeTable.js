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
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

/**
 * Class returns the table/form component that enables practicing the word pairs: includes the checking and the feedback of the user's input.
 */
export class PracticeTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.formLength = 0;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearForm = this.clearForm.bind(this);
  }

  /**
   * Empties the input fields and values from the state.
   */
  clearForm() {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    for (let key in this.state) {
      this.setState({ [key]: "" });
    }
  }

  /**
   * Returns the Alert component that consists of the feedback and results of the user's practice.
   * @returns {Alert} - the component that shows user the feedback and score
   */
  alertBox() {
    return (
      <Alert
        severity="success"
        align="left"
        sx={{ margin: "auto", maxWidth: "500px" }}
        onClose={() => this.close()}
      >
        <AlertTitle style={{ fontSize: "1.3em" }}>
          Vastausten tarkistus onnistui
        </AlertTitle>
        {this.props.alertText}
        <br />
        <p style={{ fontSize: "0.95em" }}>
          Sulje tämä ikkuna jatkaaksesi harjoittelua!
        </p>
      </Alert>
    );
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
   * Closes the Alert element that shows user the score and feedback by calling the closeScore function and the clearForm function.
   */
  close() {
    this.props.closeScore();
    this.clearForm();
  }

  /**
   * Handles the submitting of the form: checks the answers and based on them compiles the feedback and score.
   * Saves the feedback by calling setAlertText function and after that calls the showScore function.
   * @param {object} event
   */
  handleSubmit(event) {
    event.preventDefault();
    let score = 0;
    let usersWrongAnswers = [];
    let usersCorrectAnswers = [];

    for (let key in this.state) {
      if (key.toLowerCase() === this.state[key].toLowerCase()) {
        score += 1;
        usersCorrectAnswers.push(
          <span>
            {this.state[key]}
            <br />
          </span>
        );
      } else {
        if (this.state[key] !== "") {
          usersWrongAnswers.push(
            <span>
              {this.state[key]} (Oikea vastaus: {key}) <br />
            </span>
          );
        }
      }
    }

    let allCorrectAnswers = this.props.data.map((words) => {
      return (
        <span id={words.id}>
          {words.fin_word} = {words.en_word}
          <br />
        </span>
      );
    });

    if (score > 0 && usersWrongAnswers.length !== 0) {
      this.props.setAlertText(
        <div>
          <p style={{ fontSize: "1.1em" }}>
            <b>
              Pisteesi ovat: {score}/{this.formLength}
            </b>
          </p>
          <p>
            <span style={{ fontSize: "1.1em", lineHeight: 1.6 }}>
              Hienoa!{" "}
              <EmojiEventsIcon style={{ position: "relative", top: "3px" }} />
              <br /> Nämä vastaukset olivat oikein:
            </span>
            <br />
            <i>{usersCorrectAnswers}</i>
          </p>
          <p>
            <span style={{ fontSize: "1.1em", lineHeight: 1.6 }}>
              Nämä vastaukset olivat väärin:
            </span>
            <br />
            <i>{usersWrongAnswers}</i>
          </p>
          <p>
            <span style={{ fontSize: "1.1em", lineHeight: 1.6 }}>
              Kaikki oikeat vastaukset:
            </span>
            <br />
            <i>{allCorrectAnswers}</i>
          </p>
        </div>
      );
    } else if (usersWrongAnswers.length !== 0) {
      this.props.setAlertText(
        <div>
          <p style={{ fontSize: "1.1em" }}>
            <b>
              Pisteesi ovat: {score}/{this.formLength}
            </b>
          </p>
          <p>
            <span style={{ fontSize: "1.1em", lineHeight: 1.6 }}>
              Nämä vastaukset olivat väärin:
            </span>{" "}
            <br />
            <i>{usersWrongAnswers}</i>
          </p>
          <p>
            <span style={{ fontSize: "1.1em", lineHeight: 1.6 }}>
              Kaikki oikeat vastaukset:
            </span>
            <br />
            <i>{allCorrectAnswers}</i>
          </p>
        </div>
      );
    } else if (score > 0) {
      this.props.setAlertText(
        <div>
          <p style={{ fontSize: "1.1em" }}>
            <b>
              Pisteesi ovat: {score}/{this.formLength}
            </b>
          </p>
          <p>
            <span style={{ fontSize: "1.1em", lineHeight: 1.6 }}>
              Hienoa!{" "}
              <EmojiEventsIcon style={{ position: "relative", top: "3px" }} />
              <br /> Nämä vastaukset olivat oikein:
            </span>{" "}
            <br />
            <i>{usersCorrectAnswers}</i>
          </p>
          <p>
            <span style={{ fontSize: "1.1em", lineHeight: 1.6 }}>
              Kaikki oikeat vastaukset:
            </span>
            <br />
            <i>{allCorrectAnswers}</i>
          </p>
        </div>
      );
    } else {
      this.props.setAlertText(
        <div>
          <p style={{ fontSize: "1.1em" }}>
            <b>
              Pisteesi ovat: {score}/{this.formLength}
            </b>
          </p>
          <p>
            <span style={{ fontSize: "1.1em", lineHeight: 1.6 }}>
              Kaikki oikeat vastaukset:
            </span>
            <br />
            <i>{allCorrectAnswers}</i>
          </p>
        </div>
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
