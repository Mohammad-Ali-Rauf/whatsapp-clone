import { useContext, createContext } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

// @ts-ignore
const ConversationsContext = createContext()

export const useConversations = () => {
    return useContext(ConversationsContext)
}

// @ts-ignore
export const ConversationsProvider = ({ children }) => {

    const [conversations, setConversations] = useLocalStorage('conversations', []);

    const createConversation = (recipients: any) => {
        // @ts-ignore
        setConversations(prevConversations => [...prevConversations, { recipients, messages: [] }])
    }

    return (
        <ConversationsContext.Provider value={{ conversations, createConversation }}>
            {children}
        </ConversationsContext.Provider>
    )
}