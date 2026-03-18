import Badge from "./utils/Badge";
import Button from "./utils/Button";
import FilterBar from "./components/FilterBar";
import Input from "./utils/Input";
import Modal from "./utils/Modal";
import NotesCard from "./components/NotesCard";
import SearchBar from "./components/SearchBar";
import Toast from "./utils/Toast";
import Toggle from "./utils/Toggle";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <div className="">
     <NotesCard title='Complete Linear Algebra Notes' subject='Mathematics' name='Akanksha V.' downloads='123'/>
     <Navbar/>
      </div>
    </>
  );
};
export default App;
