import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, ArrowRight, RotateCcw, 
  Users, FolderKey, UserPlus, CheckCircle, 
  Monitor, Globe, FileText, CornerUpRight, FolderOpen, 
  Layout, BookOpen, MousePointer2, ChevronLeft, ChevronRight, Pause, Play 
} from 'lucide-react';

// ==========================================
// MODULE 1 : FLASHCARDS (25 Cartes)
// ==========================================
const FlashcardsGmail = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const cards = [
    { q: "Quelle est la différence entre un Libellé et un Dossier ?", a: "Un dossier ne peut contenir un e-mail qu'à un seul endroit. Un libellé permet de 'taguer' un e-mail avec plusieurs étiquettes (ex: 'Projet A' et 'Facture') sans le dupliquer." },
    { q: "Comment retrouver rapidement un e-mail avec une pièce jointe ?", a: "Utilisez l'opérateur de recherche 'has:attachment' dans la barre de recherche." },
    { q: "À quoi sert le champ 'Cci' lors de la rédaction ?", a: "Copie Carbone Invisible. Les adresses mises ici reçoivent l'e-mail, mais les autres destinataires ne voient pas ces adresses." },
    { q: "Comment activer le message d'absence ?", a: "Allez dans Paramètres (roue dentée) > Voir tous les paramètres > Général > Section 'Réponse automatique' (tout en bas)." },
    { q: "Peut-on annuler l'envoi d'un e-mail ?", a: "Oui, pendant une courte période (5 à 30 secondes) après l'envoi, en cliquant sur 'Annuler' dans la notification noire en bas à gauche." },
    { q: "Comment créer une signature automatique ?", a: "Paramètres > Général > Section 'Signature'. Vous pouvez en créer plusieurs et définir celle par défaut." },
    { q: "Qu'est-ce que la fonction 'Mettre en attente' (Snooze) ?", a: "Elle permet de faire disparaître un e-mail de la boîte de réception et de le faire réapparaître comme 'nouveau' à une date/heure choisie." },
    { q: "Comment transformer un e-mail en événement d'agenda ?", a: "Ouvrez l'e-mail, cliquez sur les 3 points verticaux (au-dessus du message) > Créer un événement." },
    { q: "Comment créer un filtre à partir d'un e-mail ouvert ?", a: "Cliquez sur les 3 points verticaux > Filtrer les messages de ce type > Créer un filtre." },
    { q: "Quel est l'avantage d'archiver un e-mail plutôt que de le supprimer ?", a: "L'archivage retire l'e-mail de la boîte de réception mais le conserve dans 'Tous les messages'. Il reste consultable via la recherche. La suppression est définitive après 30 jours." },
    { q: "Comment insérer un fichier de plus de 25 Mo ?", a: "Gmail proposera automatiquement de l'insérer via un lien Google Drive au lieu d'une pièce jointe classique." },
    { q: "À quoi sert l'étoile (message suivi) ?", a: "À marquer visuellement un message comme important pour le retrouver rapidement dans le libellé 'Messages suivis'." },
    { q: "Comment afficher le volet de lecture (prévisualisation) ?", a: "Paramètres rapides (roue dentée) > Section 'Volet de lecture' > Choisir 'À droite de la boîte de réception' ou 'Sous la boîte de réception'." },
    { q: "Comment changer le mot de passe de son compte Gmail pro ?", a: "Cela se gère via le Compte Google (avatar en haut à droite > Gérer votre compte Google > Sécurité), et non dans les paramètres Gmail." },
    { q: "Peut-on programmer l'envoi d'un message pour plus tard ?", a: "Oui, cliquez sur la petite flèche blanche à côté du bouton 'Envoyer' > Programmer l'envoi." },
    { q: "Comment voir uniquement les e-mails non lus ?", a: "Tapez 'is:unread' (ou 'label:unread') dans la barre de recherche." },
    { q: "Qu'est-ce que le 'Mode confidentiel' ?", a: "Une option (cadenas lors de la rédaction) permettant d'empêcher le transfert, la copie ou l'impression, et de définir une date d'expiration pour l'e-mail." },
    { q: "Comment désactiver le regroupement par conversation ?", a: "Paramètres rapides (roue dentée) > Décocher 'Mode conversation'. Les e-mails s'afficheront individuellement." },
    { q: "À quoi sert la barre latérale droite (Tasks, Keep, Calendar) ?", a: "À accéder rapidement à votre agenda, vos notes ou vos tâches sans quitter l'onglet Gmail." },
    { q: "Comment colorer un libellé ?", a: "Dans la barre de gauche, passez la souris sur le libellé > 3 points verticaux > Couleur du libellé." },
    { q: "Comment bloquer un expéditeur ?", a: "Ouvrez le mail > 3 points verticaux (à droite de la date) > Bloquer [Nom]." },
    { q: "Comment activer les raccourcis clavier ?", a: "Paramètres > Voir tous les paramètres > Général > Raccourcis clavier : Activer." },
    { q: "Quelle est la touche pour répondre rapidement ?", a: "Si les raccourcis sont activés : touche 'R'." },
    { q: "Comment forcer la déconnexion d'une autre session ouverte ailleurs ?", a: "Tout en bas de la liste des mails > Détails (petit lien) > Se déconnecter de toutes les autres sessions web." },
    { q: "Comment savoir si un e-mail est un spam ?", a: "Gmail le met souvent dans le dossier Spam. Vérifiez l'adresse de l'expéditeur et méfiez-vous des demandes urgentes d'argent ou de mots de passe (Phishing)." }
  ];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => setCurrentCard((prev) => (prev + 1) % cards.length), 200);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length), 200);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 min-h-[500px] w-full bg-slate-50">
      <div className="mb-6 text-sm font-bold text-slate-400 uppercase tracking-widest">
        Flashcards • {currentCard + 1} / {cards.length}
      </div>

      <div 
        className="relative w-full max-w-xl h-80 cursor-pointer group perspective"
        style={{ perspective: '1000px' }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div 
          className="relative w-full h-full transition-all duration-500 preserve-3d"
          style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        >
          {/* Front */}
          <div className="absolute inset-0 backface-hidden bg-white border-2 border-slate-200 rounded-2xl shadow-xl flex flex-col items-center justify-center p-8 text-center" style={{ backfaceVisibility: 'hidden' }}>
            <div className="bg-blue-50 text-blue-600 p-3 rounded-full mb-6">
               <BookOpen size={32} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Question</h3>
            <p className="text-lg text-slate-600 font-medium leading-relaxed">{cards[currentCard].q}</p>
            <p className="absolute bottom-6 text-xs font-semibold text-blue-500 uppercase tracking-wide">Cliquer pour retourner</p>
          </div>

          {/* Back */}
          <div 
            className="absolute inset-0 backface-hidden bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-xl flex flex-col items-center justify-center p-8 text-center text-white"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div className="bg-white/20 p-3 rounded-full mb-6">
               <CheckCircle size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white/90">Réponse</h3>
            <p className="text-lg font-medium leading-relaxed">{cards[currentCard].a}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6 mt-10">
        <button onClick={handlePrev} className="p-4 rounded-full bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 transition shadow-sm hover:shadow-md active:scale-95">
          <ArrowLeft size={24} />
        </button>
        <button onClick={() => setIsFlipped(!isFlipped)} className="flex items-center gap-2 px-8 py-3 rounded-full bg-slate-800 text-white hover:bg-slate-900 transition shadow-lg font-semibold active:scale-95">
          <RotateCcw size={18} /> {isFlipped ? 'Retourner' : 'Retourner'}
        </button>
        <button onClick={handleNext} className="p-4 rounded-full bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 transition shadow-sm hover:shadow-md active:scale-95">
          <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );
};

// ==========================================
// MODULE 2 : ANIMATION GROUPE
// ==========================================
const AnimationGroupDrive = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev < 4 ? prev + 1 : 0));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    { title: "Création Groupe", desc: "Admin Console", icon: <Users size={24} className="text-blue-600"/> },
    { title: "Ajout Membres", desc: "+ Pierre, Paul...", icon: <UserPlus size={24} className="text-green-600"/> },
    { title: "Drive Partagé", desc: "Paramètres", icon: <FolderKey size={24} className="text-yellow-600"/> },
    { title: "Invitation", desc: "Ajout du Groupe", icon: <Users size={24} className="text-purple-600"/> },
    { title: "Accès OK", desc: "Synchronisation", icon: <CheckCircle size={24} className="text-green-500"/> }
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-slate-50 min-h-[500px]">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-100 p-4 text-center">
             <h3 className="font-bold text-slate-700">Scénario : Gestion des droits par Groupe</h3>
             <p className="text-xs text-slate-500">Boucle automatique</p>
        </div>
        
        <div className="relative h-80 bg-white flex items-center justify-center overflow-hidden">
          
          <div className={`absolute transition-all duration-700 flex flex-col items-center z-10 ${step >= 0 && step < 2 ? 'opacity-100 scale-100 left-10 md:left-20' : 'opacity-40 scale-75 left-0 blur-sm'}`}>
            <div className="bg-blue-50 p-6 rounded-2xl border-2 border-blue-200 shadow-sm mb-3">
              <Users size={48} className="text-blue-500" />
            </div>
            <div className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm">Groupe Commerciaux</div>
            {step === 1 && (
               <div className="flex mt-3 gap-2 animate-bounce bg-green-50 px-3 py-1 rounded-full border border-green-100">
                 <span className="text-xs font-bold text-green-600">+ Membres</span>
               </div>
            )}
          </div>

          <div className={`absolute h-1 bg-slate-200 w-32 md:w-48 rounded-full transition-all duration-1000 ${step >= 2 ? 'bg-gradient-to-r from-blue-400 to-yellow-400' : ''}`}></div>

          <div className={`absolute transition-all duration-700 flex flex-col items-center z-10 ${step >= 2 ? 'opacity-100 scale-100 right-10 md:right-20' : 'opacity-40 scale-75 right-0 blur-sm'}`}>
             <div className="bg-yellow-50 p-6 rounded-2xl border-2 border-yellow-200 shadow-sm mb-3 relative">
               <FolderKey size={48} className="text-yellow-500" />
               {step >= 3 && (
                  <div className="absolute -top-3 -right-3 bg-purple-600 text-white p-2 rounded-full shadow-lg scale-in-center animate-in fade-in zoom-in duration-300">
                      <Users size={20} />
                  </div>
               )}
             </div>
             <div className="bg-yellow-100 text-yellow-800 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm">Drive Partagé</div>
          </div>

          {step === 4 && (
               <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center z-20 animate-in fade-in duration-500">
                  <CheckCircle size={80} className="text-green-500 mb-4 drop-shadow-xl" />
                  <h3 className="text-3xl font-extrabold text-slate-800">Accès Synchronisé !</h3>
                  <p className="text-slate-500 mt-2">Tout nouveau membre du groupe hérite des droits.</p>
               </div>
          )}
        </div>

        <div className="bg-slate-50 p-4 flex justify-between items-center border-t border-slate-100">
          {steps.map((s, index) => (
            <div key={index} className={`flex flex-col items-center flex-1 transition-all duration-500 ${index === step ? 'opacity-100 scale-110' : 'opacity-30 scale-90'}`}>
              <div className={`mb-2 p-2 rounded-full ${index === step ? 'bg-white shadow-md text-blue-600 border border-blue-100' : 'bg-transparent text-slate-400'}`}>
                  {s.icon}
              </div>
              <div className={`h-1 w-full rounded-full mb-2 ${index <= step ? 'bg-blue-500' : 'bg-slate-200'}`}></div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-slate-600 text-center hidden md:block">{s.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// MODULE 3 : ANIMATION SHORTCUT (Windows)
// ==========================================
const AnimationDriveShortcut = () => {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setStep((prev) => (prev < 3 ? prev + 1 : 0));
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const stepsInfo = [
    { 
      title: "1. Le Problème", 
      desc: "Le fichier est visible sur le Web dans 'Partagés avec moi', mais absent de votre explorateur Windows (G:).",
      action: "Regardez l'écran de droite (Windows) : il est vide."
    },
    { 
      title: "2. L'Action (Web)", 
      desc: "Sur le navigateur, faites un clic droit sur le fichier.",
      action: "Choisissez 'Organiser' > 'Ajouter un raccourci'."
    },
    { 
      title: "3. La Destination", 
      desc: "Une fenêtre vous demande où placer le raccourci.",
      action: "Sélectionnez 'Mon Drive' (My Drive) et validez."
    },
    { 
      title: "4. Le Résultat (Windows)", 
      desc: "Magie ! Le raccourci apparaît instantanément dans l'explorateur Windows.",
      action: "Vous pouvez maintenant ouvrir le fichier depuis votre PC."
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-slate-50 min-h-[500px] flex flex-col justify-center">
      
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 border-b border-slate-200 pb-4 gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <CornerUpRight className="text-blue-600"/>
            Créer un Raccourci Drive
          </h2>
          <p className="text-sm text-slate-500">Comprendre la synchronisation Windows</p>
        </div>

        <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-slate-300 shadow-sm">
          <button onClick={() => { setIsPlaying(false); setStep(prev => Math.max(0, prev - 1)); }} className="p-2 hover:bg-slate-100 rounded text-slate-600" title="Précédent"><ChevronLeft size={20} /></button>
          <button onClick={() => setIsPlaying(!isPlaying)} className="flex items-center gap-2 px-4 py-1.5 bg-blue-100 text-blue-700 rounded font-medium hover:bg-blue-200 transition">
            {isPlaying ? <><Pause size={16} /> Pause</> : <><Play size={16} /> Lecture</>}
          </button>
          <button onClick={() => { setIsPlaying(false); setStep(prev => Math.min(3, prev + 1)); }} className="p-2 hover:bg-slate-100 rounded text-slate-600" title="Suivant"><ChevronRight size={20} /></button>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        {[0, 1, 2, 3].map((i) => (<div key={i} className={`h-2 flex-1 rounded-full transition-all duration-500 ${i <= step ? 'bg-blue-500' : 'bg-slate-200'}`}></div>))}
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg transition-all duration-300">
        <h3 className="font-bold text-blue-800 text-lg">{stepsInfo[step].title}</h3>
        <p className="text-slate-700">{stepsInfo[step].desc}</p>
        <p className="text-sm text-blue-600 mt-1 font-semibold flex items-center gap-1"><MousePointer2 size={14} /> {stepsInfo[step].action}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 h-[450px] md:h-[350px]">
        <div className={`flex-1 bg-white rounded-lg shadow-md border-2 overflow-hidden flex flex-col transition-all duration-500 ${step === 1 || step === 2 ? 'border-blue-400 ring-2 ring-blue-100' : 'border-slate-200'}`}>
          <div className="bg-slate-800 text-white p-2 text-xs flex items-center gap-2"><Globe size={14} /> Chrome - Drive Web</div>
          <div className="p-4 flex-1 relative bg-white">
            <div className="text-xs font-bold text-slate-400 mb-2 uppercase">Partagés avec moi</div>
            <div className="relative group">
              <div className={`flex items-center gap-3 p-3 rounded-lg border transition-colors duration-300 ${step >= 1 ? 'bg-blue-100 border-blue-300' : 'bg-slate-50 border-slate-100'}`}>
                <FileText className="text-blue-500" size={24} />
                <div className="flex-1"><p className="text-sm font-bold text-slate-700">Rapport_Compta.xlsx</p><p className="text-xs text-slate-500">Partagé par Directeur</p></div>
              </div>
              <div className={`absolute top-8 left-12 bg-white shadow-2xl rounded-lg border border-slate-200 w-56 z-20 overflow-hidden transition-all duration-300 origin-top-left ${step === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
                <div className="p-2 border-b border-slate-100 text-xs text-slate-500">Ouvrir avec...</div>
                <div className="p-2 bg-blue-50 text-blue-700 text-xs font-bold flex items-center justify-between"><span>Organiser</span><ChevronRight size={12}/></div>
                <div className="ml-4 mt-1 p-2 bg-blue-600 text-white text-xs rounded shadow-lg flex items-center gap-2"><CornerUpRight size={12} /> Ajouter un raccourci</div>
              </div>
              <div className={`absolute top-0 left-0 right-0 bottom-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-30 transition-all duration-300 ${step === 2 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="bg-white p-4 rounded-xl shadow-2xl border border-slate-200 w-64 text-center">
                  <h4 className="font-bold text-slate-800 mb-2">Ajouter un raccourci ?</h4>
                  <div className="bg-slate-100 p-2 rounded mb-3 text-left flex items-center gap-2 text-sm text-slate-600"><FolderOpen size={16} className="text-slate-400"/> Mon Drive</div>
                  <button className="bg-blue-600 text-white px-4 py-1 rounded text-sm w-full">Ajouter</button>
                </div>
              </div>
              <div className={`absolute bottom-4 left-4 right-4 bg-slate-800 text-white text-xs p-2 rounded shadow-lg flex items-center gap-2 transition-all duration-500 ${step === 3 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}><CheckCircle size={14} className="text-green-400" /> Raccourci ajouté à "Mon Drive"</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center md:rotate-0 rotate-90 text-slate-300"><ArrowRight size={32} /></div>

        <div className={`flex-1 bg-slate-100 rounded-lg shadow-md border-2 overflow-hidden flex flex-col transition-all duration-500 ${step === 3 ? 'border-green-400 ring-2 ring-green-100' : 'border-slate-200'}`}>
          <div className="bg-white border-b border-slate-200 p-2 text-xs flex items-center gap-2 text-slate-600"><Monitor size={14} /> Explorateur Windows (G:)</div>
          <div className="p-1 bg-white border-b border-slate-200 text-[10px] text-slate-400 px-2 flex gap-1">G: ▸ Mon Drive</div>
          <div className="p-4 flex-1 relative flex flex-col gap-2">
            <div className="flex items-center gap-2 opacity-40"><FolderOpen size={20} className="text-yellow-500"/> <span className="text-xs text-slate-600">Dossier Administratif</span></div>
            <hr className="border-slate-200"/>
            {step === 3 ? (
              <div className="flex items-center gap-2 p-2 bg-blue-100 border border-blue-300 rounded animate-in zoom-in slide-in-from-bottom-2 duration-500">
                <div className="relative"><FileText className="text-green-600" size={24} /><div className="absolute -bottom-1 -left-1 bg-white rounded-sm p-[1px] shadow-sm border border-slate-100"><CornerUpRight size={10} className="text-black"/></div></div>
                <div><p className="text-sm font-bold text-slate-800">Rapport_Compta</p><p className="text-[10px] text-slate-500">Raccourci Internet</p></div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center border-2 border-dashed border-slate-200 rounded m-2"><p className="text-xs text-slate-400 text-center px-4">{step === 0 ? "Le fichier est invisible ici" : "Attente synchronisation..."}</p></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// CONTROLLER PRINCIPAL (ROUTING)
// ==========================================
const App = () => {
  // 1. Lire l'URL au chargement
  const [viewMode, setViewMode] = useState('menu'); // 'menu', 'flashcards', 'group', 'windows'

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const view = params.get('view');
    if (view) setViewMode(view);
  }, []);

  // 2. State pour le mode "Menu" (Navigation interne)
  const [activeTab, setActiveTab] = useState('flashcards');

  // 3. AFFICHAGE CONDITIONNEL (STANDALONE)
  // Si l'URL est ?view=flashcards -> Affiche uniquement les Flashcards
  if (viewMode === 'flashcards') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <FlashcardsGmail />
      </div>
    );
  }

  // Si l'URL est ?view=group -> Affiche uniquement l'animation Groupe
  if (viewMode === 'group') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <AnimationGroupDrive />
      </div>
    );
  }

  // Si l'URL est ?view=windows -> Affiche uniquement l'animation Windows
  if (viewMode === 'windows') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <AnimationDriveShortcut />
      </div>
    );
  }

  // 4. PAR DÉFAUT : LE MENU COMPLET
  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900">
      <header className="bg-slate-900 text-white p-6 shadow-lg">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
               <Layout className="text-blue-400" />
               Preview Pédagogique
            </h1>
            <p className="text-slate-400 text-sm mt-1">Modules de formation Gmail & Drive</p>
          </div>
          
          <nav className="flex bg-slate-800 p-1 rounded-lg">
            <button onClick={() => setActiveTab('flashcards')} className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'flashcards' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}>Flashcards</button>
            <button onClick={() => setActiveTab('anim-group')} className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'anim-group' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}>Anim: Groupe</button>
            <button onClick={() => setActiveTab('anim-windows')} className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'anim-windows' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}>Anim: Windows</button>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 md:p-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 min-h-[600px] overflow-hidden">
          {activeTab === 'flashcards' && <FlashcardsGmail />}
          {activeTab === 'anim-group' && <AnimationGroupDrive />}
          {activeTab === 'anim-windows' && <AnimationDriveShortcut />}
        </div>
        <div className="mt-8 p-4 bg-slate-200 rounded-lg text-center text-xs text-slate-600">
           <p className="font-bold mb-2">LIENS D'INTÉGRATION (Pour votre site) :</p>
           <div className="flex flex-col gap-1 font-mono">
             <span>?view=flashcards</span>
             <span>?view=group</span>
             <span>?view=windows</span>
           </div>
        </div>
      </main>
    </div>
  );
};

export default App;
