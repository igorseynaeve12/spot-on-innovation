import { useParams } from "react-router-dom";
import casesData from "../../data/cases.json";

const CaseTemplate = () => {
  const { id } = useParams();
  const caseId = parseInt(id); // <-- omzetten naar nummer

  const cases = casesData.cases;
  let selectedCase = {};

  for (let index = 0; index < cases.length; index++) {
    if (caseId === cases[index].id) {
      // beter: vergelijken met het echte id
      selectedCase = cases[index];
    }
  }

  return (
    <div>
      <h1>{selectedCase.name}</h1>
      <p>{selectedCase.description}</p>
      <p>
        <strong>Klant:</strong> {selectedCase.client}
      </p>
      <p>
        <strong>Status:</strong> {selectedCase.status}
      </p>
    </div>
  );
};

export default CaseTemplate;
