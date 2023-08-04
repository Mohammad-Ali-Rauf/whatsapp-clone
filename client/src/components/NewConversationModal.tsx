import React, { FormEvent, useRef, useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { useConversations } from '../context/conversations/ConversationsProvider';
import { useContacts } from '../context/contacts/ContactsProvider';

// @ts-ignore
const NewConversationModal = ({ closeModal }) => {
  const [isValidated, setIsValidated] = useState(false);
  const idRef = useRef();
  const nameRef = useRef();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      createConversation(idRef.current?.value, nameRef.current?.value);
      closeModal();
    }

    setIsValidated(true);
  };

  const [selectedContactIds, setSelectedContactIds] = useState([]);
  const { contacts } = useContacts();
  const { createConversation } = useConversations();

  // Check if 'contacts' is not available yet, and show a error saying error occurred
  if (!contacts) {
    return <Alert className='text-sm' variant='danger'>An Error is occurred pls try again later!</Alert> // Or show a loading spinner or some other UI indicating data loading.
  }

  const handleCheckboxChange = (contactId) => {
    setSelectedContactIds((prevSelectedContactIds) => {
      if (prevSelectedContactIds.includes(contactId)) {
        return prevSelectedContactIds.filter((prevId) => {
          return contactId !== prevId;
        });
      } else {
        return [...prevSelectedContactIds, contactId];
      }
    });
  };

  return (
    <>
      <Modal.Header closeButton>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
          {contacts.map((contact) => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                type='checkbox'
                value={selectedContactIds.includes(contact.id)}
                label={contact.name}
                onChange={() => handleCheckboxChange(contact.id)}
              />
            </Form.Group>
          ))}
          <Button className='mt-3' type='submit'>
            Create
          </Button>
        </Form>
      </Modal.Body>
    </>
  );
};

export default NewConversationModal;
