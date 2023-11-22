import { Dropdown} from 'react-bootstrap';

export default function WordAssociation() {
    return (
      <li className="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <span>Храня</span>
        </div>
        <div>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown1">
              Chouse Category
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#">Action 1.1</Dropdown.Item>
              <Dropdown.Item href="#">Action 1.2</Dropdown.Item>
              <Dropdown.Item href="#">Action 1.3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown2">
              Chouse Association
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#">Action 2.1</Dropdown.Item>
              <Dropdown.Item href="#">Action 2.2</Dropdown.Item>
              <Dropdown.Item href="#">Action 2.3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </li>
  
    )
  }