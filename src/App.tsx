import { useState } from "react";
import "./App.css";
import { GameContextProvider } from "./contexts/GameContext";
import { useWarnOnClose } from "./hooks/WarnOnClose";
import ActionView from "./views/ActionView";
import ActivateVaccineView from "./views/ActivateVaccineView";
import ContactView from "./views/ContactView";
import HomeView from "./views/HomeView";
import InfoView from "./views/InfoView";
import ReadChipView from "./views/ReadChipView";
import RegisterView from "./views/RegisterView";
import View from "./views/View";
import EndView from "./views/EndView";

function App() {
  useWarnOnClose();

  const [view, setView] = useState(View.HOME);

  function renderView() {
    switch (view) {
      case View.HOME:
        return <HomeView setView={setView} />;
      case View.INFO:
        return <InfoView setView={setView} />;
      case View.REGISTER:
        return <RegisterView setView={setView} />;
      case View.ACTION:
        return <ActionView setView={setView} />;
      case View.READ_CHIP:
        return <ReadChipView setView={setView} />;
      case View.CONTACT:
        return <ContactView setView={setView} />;
      case View.ACTIVATE_VACCINE:
        return <ActivateVaccineView setView={setView} />;
      case View.END:
        return <EndView setView={setView} />;
    }
  }

  return <GameContextProvider>{renderView()}</GameContextProvider>;
}

export default App;
