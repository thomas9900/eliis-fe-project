import CustomNavbar from './components/navbar/CustomNavbar.js';
import CustomSideNavbar from './components/custom-side-navbar/CustomSideNavbar.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <>
      <CustomNavbar />
      <div className="demo-app">
        <CustomSideNavbar />
      </div>
    </>
  );
}

export default App;
