import React from "react";
import "../App.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export class UserComponent extends React.Component {
  render() {
    const uniqueTags = [];
    this.props.data.map((words) => {
      if (uniqueTags.indexOf(words.tag) === -1) {
        uniqueTags.push(words.tag);
      }
      return uniqueTags;
    });

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
          <Button className={"CustomButton"} variant="text">
            All
          </Button>

          {uniqueTags.map((tag) => (
            <Button
              className={"CustomButton"}
              key={tag}
              variant="text"
              onClick={() => this.props.findByTag(tag)}
            >
              {tag}
            </Button>
          ))}
        </Stack>
      </div>
    );
  }
}
