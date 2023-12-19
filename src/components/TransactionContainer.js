import React, { useState, useEffect } from 'react';
import { Container, Segment, Button, Input } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import TransactionTable from './TransactionTable';

const TransactionContainer = () => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(0);

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      // Perform any additional search-related logic here
    //   onSearchTermChange(searchTerm);
    //   navigate(`/jobs?search=${encodeURIComponent(searchTerm)}`);
    }
    
  };
  useEffect(() => {
    fetchData('https://karchu.onrender.com/v1/transactions/get');
  }, [searchTerm]);

  const fetchData = async (url) => {
    try {
      if (searchTerm) {
        url = `https://karchu.onrender.com/v1/transactions/get/${searchTerm}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();

      setTransactions(result);
      console.log('Transactions ', result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const header = [
    'ID',
    'Description',
    'Category',
    'Amount',
    'Date',
    'SplitTag'
,    'Edit',
    'Delete'
  ];

  const sampleData = [
    {
      ID: 1,
      Description: 'Lorem Ipsum',
      Category: 'Expense',
      Amount: 50.25,
      Date: '2023-01-15',
      SplitTag: 'Personal',
    },
    {
      ID: 2,
      Description: 'Dolor Sit Amet',
      Category: 'Income',
      Amount: 100.75,
      Date: '2023-01-20',
      SplitTag: 'Work',
    },
    // Add more sample data as needed
  ];
  

  const [numTransactions, setNumTransactions] = useState();
  

  const handlePageClick = (page) => {
    setPage(page);
  };

  const handleAll = async () => {
    const url = 'https://karchu.onrender.com/v1/transactions/get';
    await fetchData(url);
  };

  const handleSetLabel = (transaction, category) => {
    const newTransactions = transactions.map((t) => {
      if (t.transactionId === transaction.transactionId) {
        t.category = category;
      }
      return t;
    });
    setTransactions(newTransactions);
  };


  return (
    <div style={{ padding: '15px 150px' }}>
        <Segment inverted style={{ backgroundColor: '#d4bdae', display: 'flex', justifyContent: 'space-between' }}>
        <Link to="/transactions">
          <Button>
            View Transactions
          </Button>
        </Link>
        <div className="searchBarContainer">
          <input
            className="searchBarInput"
            type="text"
            placeholder="Search Transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>
        <Link to="/mentors">
          <Button>
            Add a Transaction
          </Button>
        </Link>
      </Segment>
      <Container padding="20px 10px" style={{ overflow: 'auto', marginBottom: '20px'}}>
      <Button.Group style={{ marginLeft: '10px' }}>
        <Button onClick={handleAll}>Last Week</Button>
      </Button.Group>
      <Button.Group style={{ marginLeft: '10px' }}>
        <Button onClick={handleAll}>Last Month</Button>
      </Button.Group>
    
      <Input style={{ marginLeft: '10px' }}
          type="number"
          placeholder="Number of transactions"
          value={numTransactions}
          onChange={(e, { value }) => setNumTransactions(value)}
        />

    <Button.Group style={{ marginLeft: '10px', color: '#6F4E37'}}>
        <Button style={{ backgroundColor: '#6F4E37', color: 'white' }} onClick={handleAll}>Submit</Button>
      </Button.Group>

      <TransactionTable
        header={header}
        rows={sampleData}
        onPageClick={handlePageClick}
        onSetLabel={handleSetLabel}
        numPages={parseInt(transactions.length / 15)}
        page={page}
      />
    </Container>
    </div>
    
  );
};

export default TransactionContainer;
