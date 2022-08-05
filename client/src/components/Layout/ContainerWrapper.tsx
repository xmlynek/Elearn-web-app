import { Container } from "react-bootstrap";

const ContainerWrapper: React.FC = (props) => {
  return (
    <Container className="container-content my-sm-4 my-xl-5 pb-3 pb-sm-4 pb-lg-5">
      {props.children}
    </Container>
  );
};

export default ContainerWrapper;
