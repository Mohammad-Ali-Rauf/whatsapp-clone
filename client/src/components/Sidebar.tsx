import { useState } from 'react';
import { Tab, Nav, Button, Modal } from 'react-bootstrap';
import Conversations from './Conversations';
import Contacts from './Contacts';
import NewConversationModal from './NewConversationModal';
import NewContactModal from './NewContactModal';

const CONVERSATIONS_KEY = 'conversations';
const CONTACTS_KEY = 'contacts';

// @ts-ignore
const Sidebar = ({ id }) => {
  const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY);
  const [isModelOpen, setIsModalOpen] = useState(false);
  const isConversationsOpen = activeKey === CONVERSATIONS_KEY;

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ width: '250px' }} className='d-flex flex-column'>
      {/* @ts-ignore */}
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Nav className='justify-content-center' variant='tabs'>
          <Nav.Item>
            <Nav.Link eventKey={CONVERSATIONS_KEY}>Conversations</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className='border-right overflow-auto flex-grow-1'>
          <Tab.Pane eventKey={CONVERSATIONS_KEY}>
            <Conversations />
          </Tab.Pane>
          <Tab.Pane eventKey={CONTACTS_KEY}>
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
        <div className='small p-2 border-top border-right'>
          Your ID: <span className='text-muted'>{id}</span>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className='rounded-0'>
          New {isConversationsOpen ? 'Conversation' : 'Contact'}
        </Button>
      </Tab.Container>

      <Modal show={isModelOpen} onHide={closeModal}>
        {isConversationsOpen ? (
          <NewConversationModal closeModal={closeModal} />
        ) : (
          <NewContactModal closeModal={closeModal} />
        )}
      </Modal>
    </div>
  );
};

export default Sidebar;
