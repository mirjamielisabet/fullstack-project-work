import React from "react";
import "../App.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { PracticeTable } from "./PracticeTable";

/**
 * Class consists of the user's/pupil's view of the application: returns the view where user can practice the saved word pairs.
 */
export class UserComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      practicing: false,
      language: "",
      visibleScore: false,
      alertText: "",
    };
    this.resetState = this.resetState.bind(this);
    this.showScore = this.showScore.bind(this);
    this.closeScore = this.closeScore.bind(this);
    this.setAlertText = this.setAlertText.bind(this);
  }

  /**
   * When component mounts calls the getData function.
   */
  componentDidMount() {
    this.props.getData();
  }

  /**
   * Sets the state's practicing attribute's value to true.
   */
  setPracticingState() {
    this.setState({ practicing: true });
  }

  /**
   * Sets the state's practicing attribute's value to false and empties the language attributes value. Calls getData function.
   */
  resetState() {
    this.setState({ practicing: false, language: "" });
    this.props.getData();
  }

  /**
   * Sets the state's practicing attribute's value to true, calls getDataByTag function and passes on the tag to the function.
   * @param {string} tag - The tag on the basis of which the data is retrieved
   */
  onClick(tag) {
    this.setState({ practicing: true });
    this.props.getDataByTag(tag);
  }

  /**
   * Sets the state's language attribute's value according to the parameter.
   * @param {string} language - The language from which user chooses to practice words
   */
  setLanguage(language) {
    this.setState({ language: language });
  }

  /**
   * Sets the state's visibleScore attribute's value to true.
   */
  showScore() {
    this.setState({ visibleScore: true });
  }

  /**
   * Sets the state's visibleScore attribute's value to false.
   */
  closeScore() {
    this.setState({ visibleScore: false });
  }

  /**
   * Sets the state's alertText attribute's value according to the parameter.
   * @param {HTMLElement} text - Consists of the feedback and results of the user's practice
   */
  setAlertText(text) {
    this.setState({ alertText: text });
  }

  render() {
    const uniqueTags = [];
    this.props.data.map((words) => {
      if (uniqueTags.indexOf(words.tag) === -1) {
        uniqueTags.push(words.tag);
      }
      return uniqueTags;
    });

    if (this.state.practicing) {
      return (
        <div className="container">
          <h1>Oppijalle</h1>
          <p>
            Valitse haluatko opetella sanoja suomesta englanniksi vai toisin
            päin.
          </p>
          <p>
            Painamalla "Takaisin" -painiketta pääset takaisin alkuvalikkoon.
          </p>
          <br />
          <h2>Harjoittele</h2>
          <br />
          <Button
            className={"CustomButton"}
            variant="text"
            onClick={() => this.setLanguage("fin")}
          >
            Suomesta Englanniksi
          </Button>{" "}
          <Button
            className={"CustomButton"}
            variant="text"
            onClick={() => this.setLanguage("en")}
          >
            Englannista Suomeksi
          </Button>
          <br />
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            sx={{ ":hover": { color: "#ef4565", border: "1px solid #ef4565" } }}
            style={{ marginTop: "10px", marginBottom: "20px" }}
            onClick={() => this.resetState()}
          >
            Takaisin
          </Button>
          <br />
          <PracticeTable
            data={this.props.data}
            resetState={this.resetState}
            language={this.state.language}
            showScore={this.showScore}
            closeScore={this.closeScore}
            visibleScore={this.state.visibleScore}
            setAlertText={this.setAlertText}
            alertText={this.state.alertText}
          />
          <br />
          <div>{this.props.errormsg}</div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <h1>Oppijalle</h1>
          <p>Valitse alla olevista vaihtoehdoista harjoiteltavat sanat. </p>
          <p>
            Voit valita kaikki tietokantaan tallennetut sanat painamalla "ALL"
            -nappia tai valita tagien mukaan jaotelluista kategorioista.
          </p>
          <br />
          <h2>Harjoittele</h2>
          <Stack
            spacing={1}
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ margin: "auto" }}
          >
            <Button
              className={"CustomButton"}
              variant="text"
              onClick={() => this.setPracticingState()}
            >
              All
            </Button>

            {uniqueTags.map((tag) => (
              <Button
                className={"CustomButton"}
                key={tag}
                variant="text"
                onClick={() => this.onClick(tag)}
              >
                {tag}
              </Button>
            ))}
          </Stack>
          <br />
          <br />
          <div>{this.props.errormsg}</div>
        </div>
      );
    }
  }
}
