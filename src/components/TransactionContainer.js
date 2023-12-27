import React, { useState, useEffect } from 'react';
import { Container, Segment, Button, Input, Icon } from 'semantic-ui-react';
import InputLabel from '@mui/material/InputLabel';
import { Link, useNavigate } from 'react-router-dom';
import { Select as MuiSelect } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import TransactionTable from './TransactionTable';
import { useAuth } from './AuthContext';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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

  const handleCategoryChange = (event) => {
    handleInputChange('category', event.target.value);
  };

  const handleSplitTagChange = (event) => {
    handleInputChange('splitTag', event.target.value);
  };

  const [openTransactionDialog, setOpenTransactionDialog] = useState(false);
  const [formData, setFormData] = useState({
    amount: 0,
    category: '',
    description: '',
    email: state.userName || '',
    password: state.userPassword || '',
    splitTag: '',
  });

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleCloseTransactionDialog = async () => {
    console.log("Close transaction clicked!!");
    setOpenTransactionDialog(false);
    fetchData('https://karchu.onrender.com/v1/transactions/get');
  }

  const handleAddTransaction = async () => {
    // Add logic to navigate or handle the addition of a transaction
    console.log('Add Transaction clicked');
    await getCategoriesFromDB();
    await getSplitTagsFromDB();
    setOpenTransactionDialog(true);
  };

  const addTransactionToDB = async () => {
    setOpenTransactionDialog(false);
    const dataToSend = {
      "amount": parseInt(formData.amount, 10),
      "category": formData.category,
      "description": formData.description,
      "email": formData.email,
      "password": formData.password,
      "splitTag": formData.splitTag
    }
    console.log("Data sent: ", dataToSend);
    try {
      const response = await fetch('https://karchu.onrender.com/v1/transactions', {
        method: 'POST',
        headers: {
          "Content-Type" : 'application/json'
        },
        body: JSON.stringify(dataToSend),
      });

      if(response.ok) {
        alert(`Transaction is successfully added!`);
        // console.log(response.json());
      }

    } catch(error) {
      alert("Something went wrong in adding transaction! Try Again!");
      console.log("Transaction not added to the DB!", error);
    }
  }

  const [openDialog, setOpenDialog] = useState(false);
  const [categoryName, setCategoryName] = useState('');

  const handleAddCategorytoDB = async () => {
    setOpenDialog(false);
    try {
      const response = await fetch('https://karchu.onrender.com/v1/categories', {
        method: 'POST',
        headers: {
          "Content-Type" : 'application/json'
        },
        body: JSON.stringify({ email : state.userName, password : state.userPassword, categoryName : categoryName }),
      });
      console.log(state.userName, state.userPassword, categoryName);

      if(response.ok) {
        alert(`${categoryName} is successfully added to the category list!`);
        // console.log(response.json());
      }
      else {
        alert("Category not added! Try Again!!!");
      }
    } catch(error) {
      alert("Something went wrong in adding category to the DB!!!");
      console.log("Category not added to the DB!", error);
    }
  }

  const [categories, setCategories] = useState([]); // Add your categories here

  const getCategoriesFromDB = async () => {
    try {
      const response = await fetch('https://karchu.onrender.com/v1/categories/all', {
        method: 'POST',
        headers: {
          "Content-Type" : 'application/json'
        },
        body: JSON.stringify({ email : state.userName, password : state.userPassword }),
      });

      if(response.ok) {
        const data = await response.json();
        setCategories(data);
        console.log("categories: ", categories);
      }
      else {
        console.log("Categories not fetched!!!");
      }
    } catch(error) {
      console.log("Something went wrong in fetching categories!!!", error);
    }
  }

  const [splitTags, setSplitTags] = useState([]);

  const getSplitTagsFromDB = async () => {
    try {
      const response = await fetch('https://karchu.onrender.com/v1/split-tags', {
        method: 'GET',
        headers: {
          "Content-Type" : 'application/json'
        },
      });

      if(response.ok) {
        const data = await response.json();
        setSplitTags(data);
        console.log("splitTags: ", splitTags);
      }
      else {
        console.log("SplitTags not fetched!!!");
      }
    } catch(error) {
      console.log("Something went wrong in fetching splitTags!!!", error);
    }
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
    fetchData('https://karchu.onrender.com/v1/transactions/get');
  }

  const handleCategoryNameChange = (event) => {
    // Update the category name as the user types
    setCategoryName(event.target.value);
  };

  const handleAddCategory = () => {
    // Add logic to navigate or handle the addition of a category
    console.log('Add Category clicked');
    setOpenDialog(true);
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
      // if (false) {
      //   url = `https://karchu.onrender.com/v1/transactions/get/${searchTerm}`;
      // }

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
    'Date',
    'Time',
    'Category',
    'Amount',
    'Description',
    'SplitTag',
    'Actions'
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
    {/* Category dialog */}
    <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add a Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter a category name below to add a new category to your category list!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="categoryName"
            label="Category Name"
            type="text"
            fullWidth
            variant="standard"
            value={categoryName}
            onChange={handleCategoryNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAddCategorytoDB}>Add</Button>
        </DialogActions>
      </Dialog>

      {/* Transaction dialog */}
      <Dialog open={openTransactionDialog} onClose={handleCloseTransactionDialog}>
        <DialogTitle>Add Transaction</DialogTitle>
        <DialogContent style={{ display: "flex", flexDirection: "column"}}>
          <DialogContentText style={{ marginBottom: "10px" }}>
            Fill in the details below to add a new transaction.
          </DialogContentText>
          <TextField
            label="Amount"
            type="number"
            value={formData.amount}
            onChange={(e) => handleInputChange('amount', e.target.value)}
            style={{ marginBottom: "15px" }}
          />
          <TextField
            label="Description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            style={{ marginBottom: "15px" }}
          />
          <FormControl sx={{ width: 350 }} size="small">
            <InputLabel id="demo-select-category">Category</InputLabel>
            <MuiSelect
              labelId="demo-select-category"
              id="demo-select-small"
              label="Category"
              value={formData.category}
              onChange={handleCategoryChange}
              style={{ marginBottom: "15px" }}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </MuiSelect>
          </FormControl>
          
          <FormControl  sx={{ width: 350 }} size="small">
            <InputLabel id="demo-select-splitTag">Split Tag</InputLabel>
            <MuiSelect
              labelId="demo-select-splitTag"
              id="demo-select-small"
              label="SplitTag"
              value={formData.splitTag}
              onChange={handleSplitTagChange}
            >
              {splitTags.map((splitTag) => (
                <MenuItem key={splitTag} value={splitTag}>
                  {splitTag}
                </MenuItem>
              ))}
            </MuiSelect>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTransactionDialog}>Cancel</Button>
          <Button onClick={addTransactionToDB}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
    
  );
};

export default TransactionContainer;
