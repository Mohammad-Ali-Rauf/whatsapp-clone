import Dashboard from './components/Dashboard';
import Login from './components/Login';
import { ContactsProvider } from './context/contacts/ContactsProvider';
import { ConversationsProvider } from './context/conversations/ConversationsProvider';
import useLocalStorage from './hooks/useLocalStorage';

const App = () => {
  // @ts-ignore
  const [id, setId] = useLocalStorage('id');

  const dashboard = (
    <ContactsProvider>
      <ConversationsProvider>
        <Dashboard id={id} />
      </ConversationsProvider>
    </ContactsProvider>
  );

  return id ? dashboard : <Login onIdSubmit={setId} />;
};

export default App;
