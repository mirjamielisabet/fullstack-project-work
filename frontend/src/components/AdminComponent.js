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
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export class AdminComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleTable: false,
      showByTag: false,
    };
    this.resetState = this.resetState.bind(this);
  }

  showTable() {
    this.props.getData();
    this.setState({ visibleTable: true, showByTag: false });
  }

  closeTable() {
    this.setState({ visibleTable: false });
  }

  onClick(tag) {
    this.props.getDataByTag(tag);
    this.setState({ showByTag: true });
  }

  resetState() {
    this.props.getData();
    this.setState({ showByTag: false });
  }

  table() {
    return (
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
              <TableCell style={{ width: "35%", fontWeight: "bold" }}>
                Finnish
              </TableCell>
              <TableCell style={{ width: "35%", fontWeight: "bold" }}>
                English
              </TableCell>
              <TableCell style={{ width: "20%", fontWeight: "bold" }}>
                Tag
              </TableCell>
              <TableCell style={{ width: "5%", fontWeight: "bold" }}>
                Edit
              </TableCell>
              <TableCell style={{ width: "5%", fontWeight: "bold" }}>
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.data.map((words) => (
              <TableRow
                key={words.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell> {words.fin_word} </TableCell>
                <TableCell> {words.en_word} </TableCell>
                <TableCell> {words.tag} </TableCell>
                <TableCell>
                  <IconButton
                    className={"CustomButton"}
                    aria-label="edit"
                    onClick={() => this.props.handleEdit(words)}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    className={"CustomButton"}
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
    const uniqueTags = [];
    this.props.data.map((words) => {
      if (uniqueTags.indexOf(words.tag) === -1) {
        uniqueTags.push(words.tag);
      }
      return uniqueTags;
    });

    if (this.props.editing) {
      return (
        <div className="container">
          <h1>For Teacher</h1>
          <p>Here the Teacher or Admin can add, edit or delete word pairs.</p>
          <p>
            Adding tags for the word pairs enables practicing only certain
            categories (for example colors, animals, fruits etc.)
          </p>
          <br />
          <h2>Edit words</h2>
          <p className="smalltext">* Required</p>
          <EditWords
            setEditingFalse={this.props.setEditingFalse}
            words={this.props.editingData}
            resetState={this.resetState}
          />
          <br />
          <br />
          <h2>All saved words</h2>
          <div>{this.table()}</div>
          <br />
          <div>{this.props.errormsg}</div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <h1>For Teacher</h1>
          <p>Here the Teacher or Admin can add, edit or delete word pairs.</p>
          <p>
            Adding tags for the word pairs enables practicing only certain
            categories (for example colors, animals, fruits etc.)
          </p>
          <br />
          <h2>Add new words</h2>
          <p className="smalltext">* Required</p>
          <AddWords getData={this.props.getData} />
          <br />
          <br />
          <h2>All saved words</h2>

          {this.state.visibleTable === false && (
            <div>
              <Button
                onClick={() => this.showTable()}
                variant="outlined"
                sx={{
                  ":hover": { color: "#ef4565", border: "1px solid #ef4565" },
                }}
                style={{ marginTop: "5px" }}
              >
                Show All Saved Words
              </Button>
            </div>
          )}

          {this.state.visibleTable && (
            <div>
              <Button
                onClick={() => this.closeTable()}
                variant="outlined"
                sx={{
                  ":hover": { color: "#ef4565", border: "1px solid #ef4565" },
                }}
                style={{ marginTop: "5px" }}
              >
                Hide Saved Words
              </Button>
              <br />
              <br />

              <h3>Show words by tag</h3>
              {this.state.showByTag === false && (
                <Stack
                  spacing={1}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ margin: "auto" }}
                >
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
              )}
              {this.state.showByTag && (
                <div>
                  <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    sx={{
                      ":hover": {
                        color: "#ef4565",
                        border: "1px solid #ef4565",
                      },
                    }}
                    style={{ marginTop: "10px", marginBottom: "20px" }}
                    onClick={() => this.resetState()}
                  >
                    Back to all words
                  </Button>
                </div>
              )}
              <br />
              {this.table()}
            </div>
          )}
          <br />
          <div>{this.props.errormsg}</div>
        </div>
      );
    }
  }
}
