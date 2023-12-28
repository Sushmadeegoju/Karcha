import { Routes, Route } from 'react-router-dom';
import '../css/App.css';
import Header from './Header';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import Transactions from './TransactionContainer';
import SplitTransactionContainer from './SplitTransactionContainer';
import 'semantic-ui-css/semantic.min.css';
import AuthContext from './AuthContext';

function App() {
  return (
    <AuthContext.Consumer>
      {
        (context)=>{
            return(
              <div className="App">
                  <Header />
                  <Routes>
                    {
                    context.state.isLoggedIn?
                      <Route path="/" element={<Transactions />} />
                      :
                      <Route path="/" element={<Login />} />
                    }
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/transactions" element={<Transactions />} />
                    <Route path='/splits' element={<SplitTransactionContainer />} />
                  </Routes>
                <Footer />
            </div>  
            )
        }
      }
      
      
    </AuthContext.Consumer>
    
  );
}

export default App;
