import React, { FormEvent, useRef, useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../context/contacts/ContactsProvider';

// @ts-ignore
const NewContactModal = ({ closeModal }) => {

  const [isValidated, setIsValidated] = useState(false);
  const idRef = useRef() as any
  const nameRef = useRef() as any
  // @ts-ignore
  const { createContact } = useContacts()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  
    const form: any = e.currentTarget;
  
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      createContact(idRef.current.value, nameRef.current.value);
      closeModal();
    }
  
    setIsValidated(true);
  };  

  return (
    <>
        <Modal.Header closeButton>Create Contact</Modal.Header>
        <Modal.Body>
          <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
            <Form.Group className='mb-3'>
              <Form.Label>ID</Form.Label>
              <Form.Control type="text" ref={idRef} required />
              <Form.Control.Feedback type='invalid'>
                ID is Required!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" ref={nameRef} required />
              <Form.Control.Feedback type='invalid'>
                Name is Required!
              </Form.Control.Feedback>
            </Form.Group>
            <Button type='submit'>Create</Button>
          </Form>
        </Modal.Body>
    </>
  )
}

export default NewContactModal