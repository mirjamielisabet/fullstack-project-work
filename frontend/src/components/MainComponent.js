import React from "react";
import "../App.css";

/**
 * Class returns the front page component of the application.
 */
export class MainComponent extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>Welcome</h1>
        <p>
          Tervetuloa oppimaan englantia! <br /> <i>Welcome to learn English!</i>
        </p>

        <p>
          Tämän sovelluksen avulla voit oppia uusia sanoja englanniksi.
          Harjoittelu sujuu kätevästi <i>"Learner"</i> -sivulla, opettajasi
          tietokantaan lisäämien sanaparien avulla.
        </p>
        <p>
          Opettajan näkymä löytyy <i>"Teacher"</i> -sivulta. Siellä on
          mahdollista lisätä uusia sanapareja sekä muokata tai poistaa jo
          aiemmin lisättyjä.
        </p>
      </div>
    );
  }
}
