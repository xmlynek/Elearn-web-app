import { Link } from "react-router-dom";

const MainPage: React.FC = () => {
  return (
    <div className="home-page">
      <div className="centered">
        <p
          className="display-2 txt"
          style={{ color: "#45dabb", backgroundColor: "inherit" }}
        >
          Ultra-Wideband
        </p>
      </div>
      <div className="text-center">
        <p className="display-2 txt" style={{ color: "white" }}>
          <br />
          Komunikačná technológia budúcnosti
        </p>
      </div>
      <div className="text-center" style={{marginTop: '5rem'}}>
        <Link to={'/topics'} className="btn btn-lg btn-outline-info" >
          Dozvedieť sa viac
        </Link>
      </div>
    </div>
  );
};

export default MainPage;
