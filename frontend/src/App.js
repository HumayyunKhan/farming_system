import './App.css';
import MenuRoutes from './pages/MenuRoutes';

function App() {
  const listOfObjects = [
  ];
  const listOfObjectsString = JSON.stringify(listOfObjects);
  sessionStorage.setItem('listOfObjects', listOfObjectsString);
  return (
    <div >
      <MenuRoutes/>
    </div>
  );
}

export default App;
