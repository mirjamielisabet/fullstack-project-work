import * as React from "react";
import "../App.css";
import { AddWords } from "./AddWords";

export class AdminComponent extends React.Component {
  render() {
    let words = this.props.data.map((words) => (
      <p>
        <span key={words.id}>
          Finnish: {words.fin_word} <b>|</b> English: {words.en_word}
        </span>
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
