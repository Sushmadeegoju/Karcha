import React, { useState, useEffect } from 'react';
import { Container, Segment, Button, Input, Icon, Dropdown } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';
import TransactionTable from './TransactionTable';
import { useAuth } from './AuthContext';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

const TransactionContainer = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(0);

  const [searchTerm, setSearchTerm] = useState('');
  const { state } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option) => {
    setAnchorEl(null);
    switch (option) {
      case 'Add Transaction':
        // Add the logic to navigate to the dashboard
        handleAddTransaction();
        break;
      case 'Add Category':
        handleAddCategory();
        break;
      default:
        break;
    }
  };

  const handleAddTransaction = () => {
    // Add logic to navigate or handle the addition of a transaction
    console.log('Add Transaction clicked');
  };

  const handleAddCategory = () => {
    // Add logic to navigate or handle the addition of a category
    console.log('Add Category clicked');
  };

  const options = [ 'Add Transaction', 'Add Category' ];

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
      const data = {
        email: state.userName,
        password: state.userPassword,
      };
      console.log(state.userName, state.userPassword);
      const options = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : null,
      };
      if (false) {
        url = `https://karchu.onrender.com/v1/transactions/get/${searchTerm}`;
      }

      const response = await fetch(url, options);
      console.log(response)
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
        <IconButton
            aria-label="more"
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            style={{ backgroundColor: '#6F4E37', color: 'white', padding: '4px 2px 5px 5px', borderRadius: '50%', alignItems: 'center'}}
          >
            <Icon name="plus"/>
          </IconButton>
        <Menu
            id="long-menu"
            MenuListProps={{
              'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={() => handleClose('')}
            PaperProps={{
              style: {
                maxHeight: 192,
                width: '20ch',
              },
            }}
          >
            {options.map((option) => (
              <MenuItem key={option} selected={option === 'Pyxis'} onClick={() => handleClose(option)}>
                {option}
              </MenuItem>
            ))}
          </Menu>
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
        rows={transactions}
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
