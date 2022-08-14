const { useContext, createContext } = require("react")

const AppContext = createContext()
export const AppContextProvider = ({ children }) => {
  return <AppContext.Provider value={{}}>
    {children}
  </AppContext.Provider>
}

export const useAppContext = () => {
  const context = useContext()
  if (!context) {
    throw new Error('Wrap the component with AppContextProvider')
  }

  return context
}