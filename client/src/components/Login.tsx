import { FormEvent, useRef, useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { v4 as uuid } from 'uuid'

// @ts-ignore
const Login = ({ onIdSubmit }) => {
  const idRef = useRef() as any
  const [isValidated, setIsValidated] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const form: any = e.currentTarget;

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setIsValidated(true)

    onIdSubmit(idRef.current.value)
  }

  const createNewId = () => {
    onIdSubmit(uuid())
  }

  return (
    <Container className='align-items-center d-flex' style={{ height: '100vh' }}>
      <Form validated={isValidated} noValidate onSubmit={handleSubmit} className='w-100'>
        <Form.Group>
          <Form.Label>Enter Your ID</Form.Label>
          <Form.Control type='text' ref={idRef} required />
          <Form.Control.Feedback type='invalid'>ID is a required field!</Form.Control.Feedback>
        </Form.Group>
        <Button type='submit' className='me-2 mt-3'>Login</Button>
        <Button onClick={createNewId} variant='secondary' className='mt-3'>Create A New ID</Button>
      </Form>
    </Container>
  )
}

export default Login