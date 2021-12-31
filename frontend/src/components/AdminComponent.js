import * as React from "react";
import "../App.css";
import { AddWords } from "./AddWords";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export class AdminComponent extends React.Component {
  render() {
    let words = this.props.data.map((words) => (
      <p key={words.id}>
        Finnish: {words.fin_word} <b>|</b> English: {words.en_word}{" "}
        <IconButton
          aria-label="delete"
          onClick={() => this.props.handleDelete(words.id)}
        >
          <DeleteIcon />
        </IconButton>
      </p>
    ));

    return (
      <div className="container">
        <p>The Admin view of the Application</p>
        <br />
        <h2>Add new words</h2>
        <AddWords getData={this.props.getData} />

        <h2>All saved words:</h2>
        <div>{words}</div>
      </div>
    );
  }
}
