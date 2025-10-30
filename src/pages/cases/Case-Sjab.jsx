import { useParams } from "react-router-dom";

const CaseTemplate = () => {
  const { id } = useParams();
  return <h1>Gebruiker ID: {id}</h1>;
};

export default CaseTemplate;
