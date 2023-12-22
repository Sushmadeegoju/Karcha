import React from "react";
import { Icon, Table } from "semantic-ui-react";

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
                <Icon name="edit alternate" color="blue" />
              </Table.Cell>
              <Table.Cell>
                <Icon name="trash alternate" color="red" />
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default TransactionTable;
