import { Stack } from "react-bootstrap";

const Sidebar: React.FC = (props) => {
    return ( 
        <>
        <Stack gap={3} style={{textAlign: 'left'}}>
            {props.children}
        </Stack>
        </>
     );
}

export default Sidebar;