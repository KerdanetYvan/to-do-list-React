import './App.css';
import { useState } from 'react';

function App() {
  // Définition des states :
  const [taches, setTaches] = useState(() => {
    // On va chercher les tâches du storage local grâce à sa fonction getItem
    const tachesSauvees = localStorage.getItem('taches');
    return tachesSauvees ? JSON.parse(tachesSauvees) : []; // Condition ternaire permettant de récupérer les tâches sauvegardées ou de les définir en tableau vide
  });
  const [nouvelleTache, setNouvelleTache] = useState(''); // Initialisé vide (pas de nouvelle tache au lancement de l'app)

  // Ajout d'une tâche :
  const ajouterTache = () => {
    if (nouvelleTache.trim()) { // On vérifie que la tâche n'est pas vide ou composée uniquement d'espaces grâce à la méthode trim
      const tacheActualisees = [...taches, nouvelleTache];
      setTaches(tacheActualisees); // On ajoute la nouvelle tâche à la liste des tâches
      setNouvelleTache(''); // On réinitialise le champ de saisie

      // On sauvegarde les tâches actualisées dans le local storage :
      localStorage.setItem('taches', JSON.stringify(tacheActualisees));
    }
  };

  // Suppression d'une tâche :
  const supprimerTache = (index) => {
    const tacheActualisees = taches.filter((tache, indexTache) => indexTache !== index);
    setTaches(tacheActualisees);

    // On sauvegarde les tâches actualisées dans le local storage :
    localStorage.setItem('taches', JSON.stringify(tacheActualisees));
  };

  return (
    <div className="App">
      <h1>To Do List</h1>
      <form>
        <input type="text" placeholder="Add a task..." value={nouvelleTache} onChange={(element) => setNouvelleTache(element.target.value)} />
        <button onClick={ajouterTache} type="submit">Add</button>
      </form>

      <div>
        <ul>
          {taches.map((tache, index) => (
            <li key={index}>
              {tache} <button onClick={() => supprimerTache(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
