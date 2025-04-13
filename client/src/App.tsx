import React, { useState } from "react";
import Ctas from "./components/Ctas.tsx";
import GetResumeByIdForm from "./components/GetResumeByIdForm.tsx";
import CreateResumeForm from "./components/CreateResumeForm.tsx";
import GetResumeByNameForm from "./components/GetResumeByNameForm.tsx";

type RenderItemType =
  | "ctas"
  | "createResumeForm"
  | "getResumeByIdForm"
  | "getResumeByNameForm";

export default function App() {
  const [renderItem, setRenderItem] = useState<RenderItemType>("ctas");

  const handleOnBack = () => {
    setRenderItem("ctas");
  };

  const handleRenderItem = (renderItem) => {
    setRenderItem(renderItem);
  };

  const CurrentComponent = (renderItem: RenderItemType) => {
    switch (renderItem) {
      case "ctas":
        return <Ctas onClick={(renderItem) => handleRenderItem(renderItem)} />;
      case "getResumeByIdForm":
        return <GetResumeByIdForm onBack={handleOnBack} />;
      case "getResumeByNameForm":
        return <GetResumeByNameForm onBack={handleOnBack} />;
      case "createResumeForm":
        return <CreateResumeForm onBack={handleOnBack} />;
    }
  };
  return (
    <div
      style={{
        backgroundColor: "pink",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyItems: "center",
        textAlign: "center",
        height: "100vh",
        marginTop: "auto",
        marginBottom: "auto",
      }}
    >
      <h1 style={{ padding: "40px", color: "black" }}>Resume</h1>
      {CurrentComponent(renderItem)}
    </div>
  );
}
