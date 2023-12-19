import React from "react";
import { Icon, Table, Button } from "semantic-ui-react";

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
        {rows.map((transaction, index) => (
          <Table.Row key={index}>
            <Table.Cell>{transaction.ID}</Table.Cell>
            <Table.Cell>{transaction.Description}</Table.Cell>
            <Table.Cell>{transaction.CategoryName}</Table.Cell>
            <Table.Cell>{transaction.Amount}</Table.Cell>
            <Table.Cell>{transaction.Time}</Table.Cell>
            {/* <Table.Cell>
              <Button.Group>
                <Button
                  onClick={() => onSetCategory(transaction, 'UpdatedCategory')}
                  icon
                  size="mini"
                  color="green"
                >
                  <Icon name="thumbs up" />
                </Button>
              </Button.Group>
            </Table.Cell> */}
            <Table.Cell>{transaction.SplitTag}</Table.Cell>
            <Table.Cell>
              <Icon name="edit alternate" color="blue" />
            </Table.Cell>
            <Table.Cell>
              <Icon name="trash alternate" color="red" />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default TransactionTable;
