import { Routes, Route } from 'react-router-dom';
import '../css/App.css';
import Header from './Header';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import Transactions from './TransactionContainer';
import 'semantic-ui-css/semantic.min.css';


function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
