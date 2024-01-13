import AppContent from "./components/AppContent";
import AppHeader from "./components/AppHeader";
import CartContextProvider from "./store/context";

function App() {
  return (
    <CartContextProvider>
      <AppHeader />
      <AppContent />
    </CartContextProvider>
  );
}
export default App;
