import { ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useLangTranslation from '../../hooks/useLangTranslation';
import User from '../../models/User';
import classes from './UserList.module.css';

type Props = {
  className?: string;
  users: User[];
};

const UserList: React.FC<Props> = (props) => {
  const translations = useLangTranslation();
  const navigate = useNavigate();

  return (
    <ListGroup>
      <ListGroup.Item disabled>
        <div className={classes.flexRow}>
          <span>ID</span>
          <span>{translations?.fullNameLabel}</span>
          <span>Email</span>
          <span>{translations?.userRoleLabel}</span>
        </div>
      </ListGroup.Item>
      {props.users.map((user) => (
        <ListGroup.Item
          key={user.id}
          action
          onClick={() => {
            navigate(`/users/${user.id}`);
          }}
        >
          <div className={classes.flexRow}>
            <span>{user.id} </span>
            <span> {`${user.firstname} ${user.lastname}`} </span>
            <span> {user.email} </span>
            <span>{user.role}</span>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default UserList;
