import * as React from "react";
import "../App.css";
import { AddWords } from "./AddWords";
import { EditWords } from "./EditWords";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export class AdminComponent extends React.Component {
  table() {
    return (
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 550, marginTop: "10px" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "35%", fontWeight: "bold" }}>
                Finnish
              </TableCell>
              <TableCell style={{ width: "35%", fontWeight: "bold" }}>
                English
              </TableCell>
              <TableCell style={{ width: "15%", fontWeight: "bold" }}>
                Edit
              </TableCell>
              <TableCell style={{ width: "15%", fontWeight: "bold" }}>
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.data.map((words) => (
              <TableRow key={words.id}>
                <TableCell> {words.fin_word} </TableCell>{" "}
                <TableCell> {words.en_word} </TableCell>{" "}
                <TableCell>
                  <IconButton
                    aria-label="edit"
                    onClick={() => this.props.handleEdit(words)}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    aria-label="delete"
                    onClick={() => this.props.handleDelete(words.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  render() {
    if (this.props.editing) {
      return (
        <div className="container">
          <h1>For Teacher</h1>
          <p>The Admin view of the Application</p>
          <br />
          <h2>Edit words</h2>
          <EditWords
            getData={this.props.getData}
            setEditingFalse={this.props.setEditingFalse}
            words={this.props.editingData}
          />
          <br />
          <br />
          <h2>All saved words</h2>
          <div>{this.table()}</div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <h1>For Teacher</h1>
          <p>The Admin view of the Application</p>
          <br />
          <h2>Add new words</h2>
          <AddWords getData={this.props.getData} />
          <br />
          <br />
          <h2>All saved words</h2>
          <div>{this.table()}</div>
        </div>
      );
    }
  }
}
