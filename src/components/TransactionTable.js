import React, { useState } from "react";
import { Table } from "semantic-ui-react";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useAuth } from './AuthContext';

function parseDateTime(dateTimeString) {
  const dateTime = new Date(dateTimeString);

  // Extract date components
  const year = dateTime.getFullYear();
  const month = dateTime.getMonth() + 1; // Months are zero-based
  const day = dateTime.getDate();

  // Extract time components
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();
  const seconds = dateTime.getSeconds();

  return { date: `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`, time: `${hours}:${minutes}:${seconds}` };
}


const TransactionTable = ({ header, rows, onSetCategory }) => {
  const { state } = useAuth();

  const handleEditTransaction = () => {

  }

  const handleDeleteTransaction = async (id) => {
    console.log(state.userName, state.userPassword, id);
    try {
      const response = await fetch('https://karchu.onrender.com/v1/transactions', {
        method: 'DELETE',
        headers: {
          "Content-Type" : 'application/json'
        },
        body: JSON.stringify({ email : state.userName, password : state.userPassword, transactionId: id }),
      });

      if(response.ok) {
        alert("Transaction deleted successfully!!")
        console.log("Transaction deleted successfully!")
      }
      else {
        console.log("Transaction not deleted!!!");
        alert("Transaction not deleted! Try Again!!")
      }
    } catch(error) {
      alert("Something went wrong! Try Again!!")
      console.log("Transaction not deleted! ", error);
    }
  }

  const [anchorEl, setAnchorEl] = useState(new Array(rows.length).fill(null));

  const handleClick = (event, index) => {
    const newAnchorEl = [...anchorEl];
    newAnchorEl[index] = event.currentTarget;
    setAnchorEl(newAnchorEl);
  };

  const handleClose = (option, id, index) => {
    const newAnchorEl = [...anchorEl];
    newAnchorEl[index] = null;
    setAnchorEl(newAnchorEl);

    switch (option) {
      case 'Edit':
        handleEditTransaction();
        break;
      case 'Delete':
        handleDeleteTransaction(id);
        break;
      default:
        break;
    }
  };


  const options = ['Edit', 'Delete'];
  return (
    <Table celled >
      <Table.Header>
        <Table.Row>
          {header.map((x) => (
            <Table.HeaderCell key={x}>{x}</Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
      {rows.map((transaction, index) => {
          const { date, time } = parseDateTime(transaction.Time);

          return (
            <Table.Row key={index}>
              <Table.Cell>{date}</Table.Cell>
              <Table.Cell>{time}</Table.Cell>
              <Table.Cell>{transaction.CategoryName}</Table.Cell>
              <Table.Cell>{transaction.Amount}</Table.Cell>
              <Table.Cell>{transaction.Description}</Table.Cell>
              <Table.Cell>{transaction.SplitTag}</Table.Cell>
              <Table.Cell>
              <IconButton
                  aria-label="more"
                  aria-controls={`long-menu-${index}`}
                  aria-expanded={Boolean(anchorEl[index])}
                  aria-haspopup="true"
                  onClick={(event) => handleClick(event, index)}
                >
                  <MoreHorizIcon style={{ color: 'black' }} />
                </IconButton>
                <Menu
                  id={`long-menu-${index}`}
                  MenuListProps={{
                    'aria-labelledby': 'long-button',
                  }}
                  anchorEl={anchorEl[index]}
                  open={Boolean(anchorEl[index])}
                  onClose={() => handleClose('', transaction.ID, index)}
                  PaperProps={{
                    style: {
                      maxHeight: 192,
                      width: '20ch',
                    },
                  }}
                >
                  {options.map((option) => (
                    <MenuItem key={option} selected={option === 'Pyxis'} onClick={() => handleClose(option, transaction.ID, index)}>
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default TransactionTable;
