import React, { Component} from 'react';
import { Container,Dimmer, Loader } from 'semantic-ui-react';
import SplitTransactionTable from './SplitTransactionTable';
import  AuthContext from './AuthContext';

class SplitTransactionContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            transactions : [],
            loading: true
        }
    }

    fetchTransactionsFromAPI(userName, password){
        const data = {
            email: userName ,
            password: password
        };
        const url = 'https://karchu.onrender.com/v2/split-transaction/get-splits'
        const options = {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: data ? JSON.stringify(data) : null,
        };  
        fetch(url, options)
            .then((response) => response.json())
            .then((data) => {
                this.setState({ transactions: data, loading: false });
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }
    
    componentDidMount(){
        console.log(this.context)
        const { userName, userPassword } = this.context.state;
        this.fetchTransactionsFromAPI(userName, userPassword);
    }

    render() {
         return (
            <AuthContext.Consumer>
                {(context) => {
                    this.context = context
                    return(
                        <div style={{ padding: '15px 150px' }}>
                            <Container padding="20px 10px" style={{ overflow: 'auto', marginBottom: '20px' }}>
                            {this.state.loading ? (
                                <Dimmer active inverted>
                                <Loader>Loading...</Loader>
                                </Dimmer>
                            ) : (
                                <SplitTransactionTable splits={this.state.transactions} />
                            )}
                            </Container>
                        </div>
                    )
                }}
            </AuthContext.Consumer>
        );
    }
}

export default SplitTransactionContainer
