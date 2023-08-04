import { useContext, createContext } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

// @ts-ignore
const ContactsContext = createContext()

export const useContacts = () => {
    return useContext(ContactsContext)
}

// @ts-ignore
export const ContactsProvider = ({ children }) => {

    const [contacts, setContacts] = useLocalStorage('contacts', []);

    const createContact = (id: any, name: any) => {
        // @ts-ignore
        setContacts(prevContacts => [...prevContacts, { id, name }])
    }

    return (
        <ContactsContext.Provider value={{ contacts, createContact }}>
            {children}
        </ContactsContext.Provider>
    )
}