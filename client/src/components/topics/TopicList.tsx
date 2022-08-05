import { ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import TopicClass from "../../models/TopicClass";

type Props = {
  className?: string;
  topics: TopicClass[];
};

const TopicList: React.FC<Props> = (props) => {
  const navigate = useNavigate();

  return (
    <ListGroup className={props.className}>
      {props.topics.map((topic) => (
        <ListGroup.Item
          key={topic.id}
          action
          onClick={() => {
            navigate(`/topics/${topic.id}`);
          }}
        >
          <p className="h4">{topic.title}</p>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default TopicList;
