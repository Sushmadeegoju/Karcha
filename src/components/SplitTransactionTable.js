import { Table } from "semantic-ui-react";
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { PureComponent } from "react";
class SplitTransactionTable extends PureComponent
{
    constructor(props) {
      super(props)
    
      this.state = {
         splits : [],
         anchorEl : new Array(this.props.splits.length).fill(null)
      }
    }
    
    menuOptionClick = (option, splitId, index)=>{
        const newAnchorEl = [...this.state.anchorEl];
        newAnchorEl[index] = null;
        this.setState({
            anchorEl: newAnchorEl
        })

        switch (option) {
        case 'Settle Transaction':
            break;
        default:
            break;
        }
    }
    menuOptions = ["Settle Transaction"]
    handleClick = (event, index) => {
        const newAnchorEl = [...this.state.anchorEl]; // Create a copy of the array
        const isMenuOpen = Boolean(newAnchorEl[index]);
      
        // Toggle the menu open/closed for the current row
        newAnchorEl[index] = isMenuOpen ? null : event.currentTarget;
      
        this.setState({
          anchorEl: newAnchorEl,
        });
    };

    componentDidMount(){
        console.log(`length of splits${this.props.splits.length}`)
        this.setState({
            anchorEl : new Array(this.props.splits.length).fill(null)
        })
    }

    render(){
        console.log(this.props)
        if(!this.props.splits || this.props.splits.length==0){
            return
        }
        
        let header = Object.keys(this.props.splits[0]);
        if(header.length > 0){
            header.push("Actions");
        }
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
            {this.props.splits.map((transaction, index) => {
                // const { date, time } = parseDateTime(transaction.Time);
        
                return (
                    <Table.Row key={index}>
                        <Table.Cell>{transaction.SourceTransactionId}</Table.Cell>
                        <Table.Cell>{transaction.SplitTransactionId}</Table.Cell>
                        <Table.Cell>{transaction.SettledTransactionId}</Table.Cell>
                        <Table.Cell>{transaction.CategoryName}</Table.Cell>
                        <Table.Cell>{transaction.SourceAmount}</Table.Cell>
                        <Table.Cell>{transaction.Amount}</Table.Cell>
                        <Table.Cell>{transaction.FriendName}</Table.Cell>
                        <Table.Cell>
                        <IconButton
                            aria-label="more"
                            aria-controls={`long-menu-${index}`}
                            aria-haspopup="true" 
                            onClick={(event) => this.handleClick(event, index)} >
                            <MoreHorizIcon style={{ color: 'black' }} />
                        </IconButton>
                        <Menu
                            id={`long-menu-${index}`}
                            MenuListProps={{'aria-labelledby': 'long-button',}}
                            open={Boolean(this.state.anchorEl[index])}
                            anchorEl={this.state.anchorEl[index]}
                            PaperProps={{
                                style: {
                                maxHeight: 192,
                                width: '20ch',
                                },
                            }}  >
                            {   
                                this.menuOptions.map((option) => (
                                    <MenuItem key={option} selected={option === 'Pyxis'} onClick={() => this.menuOptionClick(option, transaction.SplitTransactionId, index)}>
                                    {option}
                                    </MenuItem>
                                ))
                            }
                        </Menu>
                    </Table.Cell>
                    </Table.Row>
                );
                })}
            </Table.Body>
            </Table>
        );
    }
}

export default SplitTransactionTable