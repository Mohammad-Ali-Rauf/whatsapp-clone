import { ListGroup } from "react-bootstrap"
import { useContacts } from "../context/contacts/ContactsProvider"

const Contacts = () => {
  // @ts-ignore
  const { contacts } = useContacts()

  return (
    <ListGroup variant="flush">
      {contacts.map((contact: any) => (
        <ListGroup.Item key={contact.id}>{contact.name}</ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default Contacts