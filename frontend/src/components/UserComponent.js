import React from "react";
import "../App.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { PracticeTable } from "./PracticeTable";

export class UserComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      practicing: false,
      language: "",
    };
    this.resetState = this.resetState.bind(this);
  }

  componentDidMount() {
    this.props.getData();
  }

  setPracticingState() {
    this.setState({ practicing: true });
  }

  resetState() {
    this.setState({ practicing: false, language: "" });
    this.props.getData();
  }

  onClick(tag) {
    this.setState({ practicing: true });
    this.props.getDataByTag(tag);
  }

  setLanguage(language) {
    this.setState({ language: language });
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
          <h1>For Learner</h1>
          <p>The User view of the Application</p>
          <br />
          <h2>Practice</h2>
          <br />
          <Button
            className={"CustomButton"}
            variant="text"
            onClick={() => this.setLanguage("fin")}
          >
            From Finnish to English
          </Button>{" "}
          <Button
            className={"CustomButton"}
            variant="text"
            onClick={() => this.setLanguage("en")}
          >
            From English to Finnish
          </Button>
          <br />
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            sx={{ ":hover": { color: "#ef4565", border: "1px solid #ef4565" } }}
            style={{ marginTop: "10px", marginBottom: "20px" }}
            onClick={() => this.resetState()}
          >
            Back
          </Button>
          <br />
          <PracticeTable
            data={this.props.data}
            resetState={this.resetState}
            language={this.state.language}
          />
          <br />
          <div>{this.props.errormsg}</div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <h1>For Learner</h1>
          <p>The User view of the Application</p>
          <br />
          <h2>Practice</h2>
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
