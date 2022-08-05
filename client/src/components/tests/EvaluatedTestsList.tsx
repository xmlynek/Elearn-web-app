import { ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { EvalutedTest } from "../../models/EvaluatedTest";
import classes from "./EvaluatedTestsList.module.css";

type Props = {
  tests: EvalutedTest[];
};

const EvaluatedTestsList: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  const { tests } = props;

  const onClickHandler = (evalTestId: number, userId: number) => {
    navigate(`/users/${userId}/tests/${evalTestId}`);
  };

  if (tests.length === 0) {
    return (
      <div className="centered">Neboli nájdené žiadne vypracované testy</div>
    );
  }

  return (
    <ListGroup className="mx-1 mx-md-2 mx-lg-4 my-4">
      <ListGroup.Item disabled>
        <div className={classes.flexRow}>
          <span>Test ID</span>
          <span>Názov Testu</span>
          <span>Hodnotenie</span>
          <span>Dátum a čas odovzdania</span>
        </div>
      </ListGroup.Item>
      {tests.map((test) => (
        <ListGroup.Item
          key={test.id}
          action
          onClick={onClickHandler.bind(null, test.id, test.userId)}
        >
          <div className={classes.flexRow}>
            <span> {test.test.id} </span>
            <span> {test.test.title} </span>
            <span> {`${test.resultPoints}/${test.maxPoints}`} </span>
            <span> {new Date(test.finished_at).toLocaleString()} </span>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default EvaluatedTestsList;
