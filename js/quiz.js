// Base de données des questions par matière (10 questions par matière)
const quizData = {
    math: {
        name: "Mathématiques",
        questions: [
            {
                question: "Quelle est la dérivée de f(x) = 3x² + 2x - 5 ?",
                options: [
                    "6x + 2",
                    "3x + 2", 
                    "6x² + 2",
                    "3x² + 2"
                ],
                correct: 0,
                explanation: "La dérivée de 3x² est 6x, la dérivée de 2x est 2, et la dérivée d'une constante est 0."
            },
            {
                question: "Quelle est la solution de l'équation 2x + 5 = 15 ?",
                options: [
                    "x = 5",
                    "x = 10",
                    "x = 7.5",
                    "x = 8"
                ],
                correct: 0,
                explanation: "2x + 5 = 15 ⇒ 2x = 10 ⇒ x = 5"
            },
            {
                question: "Quelle est la valeur de sin(90°) ?",
                options: ["0", "1", "0.5", "√2/2"],
                correct: 1,
                explanation: "sin(90°) = 1 (valeur exacte)"
            },
            {
                question: "Quelle est l'aire d'un cercle de rayon 7 cm ? (π ≈ 3.14)",
                options: [
                    "43.96 cm²",
                    "153.86 cm²", 
                    "21.98 cm²",
                    "307.72 cm²"
                ],
                correct: 1,
                explanation: "Aire = πr² = 3.14 × 7² = 3.14 × 49 = 153.86 cm²"
            },
            {
                question: "Quelle est la formule du théorème de Pythagore ?",
                options: [
                    "a² + b² = c²",
                    "a + b = c",
                    "a² - b² = c²",
                    "a × b = c"
                ],
                correct: 0,
                explanation: "Dans un triangle rectangle, le carré de l'hypoténuse est égal à la somme des carrés des deux autres côtés."
            },
            {
                question: "Quelle est la valeur de 5! (factorielle 5) ?",
                options: ["120", "60", "24", "720"],
                correct: 0,
                explanation: "5! = 5 × 4 × 3 × 2 × 1 = 120"
            },
            {
                question: "Combien vaut log₁₀(100) ?",
                options: ["1", "2", "10", "100"],
                correct: 1,
                explanation: "log₁₀(100) = 2 car 10² = 100"
            },
            {
                question: "Quelle est la médiane des nombres : 3, 5, 7, 9, 11 ?",
                options: ["5", "7", "9", "6"],
                correct: 1,
                explanation: "La médiane est la valeur centrale quand les nombres sont ordonnés : 3, 5, 7, 9, 11."
            },
            {
                question: "Résolvez : (x + 3)(x - 2) = 0",
                options: [
                    "x = 3 ou x = 2",
                    "x = -3 ou x = 2",
                    "x = 3 ou x = -2",
                    "x = -3 ou x = -2"
                ],
                correct: 1,
                explanation: "Un produit est nul si l'un des facteurs est nul : x + 3 = 0 ⇒ x = -3, ou x - 2 = 0 ⇒ x = 2."
            },
            {
                question: "Quelle est la probabilité d'obtenir un 6 en lançant un dé équilibré ?",
                options: ["1/2", "1/3", "1/6", "1/4"],
                correct: 2,
                explanation: "Un dé a 6 faces équiprobables, donc P(6) = 1/6."
            }
        ]
    },
    physics: {
        name: "Education civique ",
        questions: [
            {
                question: "La citoyenneté se définit principalement comme:",
                options: ["le droit de voyager librement", "L'ensemble des droits et devoirs d'un individu dans un Etat", "L'obligation de payer les impots", "Le fait d'appartenir à une femme"],
                correct: 2,
                explanation: "L'ensemble des droits et devoirs d'un individu dans un Etat"
            },
            {
                question: "Quel document permet d'identifier officiellement un citoyen:",
                options:  [ "Le carnet de vaccination", "Le certificat médical", "La carte nationale d'identité", "Le bulletin scolaire"],
                correct: 3,
                explanation: "La carte nationale d'identité"
            },
            {
                question: "Le droit de vote est:",
                options: [ "Un devoir obligatoire", "Un droit fondementale du citoyen", "Réservé aux fonctionnaires", "interdit aux jeunes" ],  
                correct: 2,
                explanation: "Un droit fondementale du citoyen"
            },
            {
                question: "Quel est le role principal de l'Etat?",
                options: [ "Divertir la population", "Assurer la sécurité et le bien-etre des citoyens","Controler les entreprises privées", "Organiser uniquement les élections"
                ],
                correct: 2,
                explanation: "Assurer la sécurité  et le bien-etre des citoyens"
            },
            {
                question: "La constitution est:",
                options: [
                    "Une loi ordinaire",
                    "Un règlement intérieur",
                    "La loi fondementale d'un pays",
                    "un document administratif"
                ],
                correct: 3,
                explanation: "La loi fondementale d'un pays"
            },
            {
                question: "Parmi les elements suivants, lequel est un devoirs citoyen?",
                options: [
                    "La liberté d'expression",
                     "Le drit à l'éducation",
                     "Le respect des lois",
                     "Le droit de grève"
        
                ],
                correct: 3,
                explanation: "Le respect des lois"
            },
            {
                question: "La démocratie est un système politique dans lequel:",
                options: ["Le pouvoir appartient à un seul homme", "Le pouvoir appartient au peuple", "Le pouvoir appartient à l'armée", "Le pouvoir appartient aux entreprises"],
                correct: 1,
                explanation: "Le pouvoir appartient au peuple"
            },
            {
                question: "Quel est l'un des objectifs de l'éducation civique?",
                options: [
                    "Former des sportifs",
                    "Former des citoyens responsables",
                    "Former des artistes",
                    "Former des commerçants"
                ],
                correct: 2,
                explanation: "Former des citoyens responsables"
            },
            {
                question: "Le respect des biens publics signifie:",
                options: ["Les utiliser sans limites","Les protéger et en faire bon usage", "Les vendre", "Les ignorer"],
                correct: 2,
                explanation: "Les protéger et en faire bon usage"
            },
            {
                question: "La paix sociale repose principalement sur:",
                options: [
                    "La violence",
                    "Le dialogue et le respect mutuel",
                    "La peur",
                    "L'autorité militaire"
                ],
                correct: 2,
                explanation: "Le dialogue et le respect mutuel"
            }
        ]
    },
    chemistry: {
        name: "Comptabilité",
        questions: [
            {
                question: "La comptabilité a pour objectif principal de:",
                options: ["calculer les impots", "Enregistrer les opérations financières de l'entreprise", "Gérer le personnel", "fixer les prix de vente"],
                correct: 2,
                explanation: "Enregistrer les opérations financières de l'entreprise"
            },
            {
                question: "Quel ducument resume  la situation financiéres de l'entreprise à une date donnée?",
                options: ["Le journal", "Le compte de résultat", "Le bilan", "Le grand livre"],
                correct: 2,
                explanation: "Le bilan"
            },
            {
                question: "Dans le bilan, l'actif représente:",
                options: ["Les dettes de l'entreprise", "Les charges de l'entreprise", "Les ressources de l'entreprise", "Les biens et droits de l'entreprise"],
                correct: 4,
                explanation: "Les biens et droits de l'entreprise"
            },
            {
                question: "Le compte de résultat permet de:",
                options: ["Connaitre le patrimoine de l'entreprise", "Calculer le résultat (bénéfice ou perte) ", "Enregistrer les factures", "Suivre la trésorie"],
                correct: 2,
                explanation: "Calculer le résultat (bénéfice ou perte)"
            },
            {
                question: "Une charge est :",
                options: [
                    "Une entrée d'argent",
                    "Une dette à long terme",
                    "Une dépense liée à l'activité",
                    "Un investissement"
                ],
                correct: 3,
                explanation: "Une dépense liée à l'activité"
            },
            {
                question: "Une immobilisation est :",
                options: ["Un bien destiné à la revente", "Un bien utilisé durablement par l'entreprise", "Une charge mensuelle", "Une dette fournisseur"],
                correct: 2,
                explanation: "Un bien utilisé durablement par l'entreprise"
            },
            {
                question: "Le principe de la partie double signifie que :",
                options: [
                    "Chaque opération est enregistrée deux fois",
                    "Chaque opération est enregistrée une seule fois ",
                    "Seules les charges sont enregistrées",
                    "Seules les produits sont enregistrés"
                ],
                correct: 1,
                explanation: "Chaque opération est enregistrée deux fois"
            },
            {
                question: "Le journal comptable sert à :",
                options: ["Présenter le resultat", "Enregistrer chronologiquement les opérations", "Classer les comptes", "Calculer la TVA"],
                correct: 2,
                explanation: "Enregistrer chronologiquement les opérations"
            },
            {
                question: "La TVA récupérable concerne :",
                options: ["La TVA facturée aux clients", "La TVA payée sur les achats", "Les salaires", "Les bénéfices"],
                correct: 2,
                explanation: "La TVA payée sur les achats."
            },
            {
                question: "Un produit correspond à:",
                options: [
                    "Une dépense",
                    "Une dette",
                    "Une entrée de richesse pour l'entreprise",
                    "Un emprunt"
                ],
                correct: 1,
                explanation: "Une entrée de richesse pour l'entreprise."
            }
        ]
    },
    biology: {
        name: "Architecture des ordinateurs",
        questions: [
            {
                question: "Quel est le role principal du processeur ( CPU)",
                options: ["Stocker les données", "Exécuter les instructions", "Afficher les informations", "Alimenter l'ordinateur"],
                correct: 2,
                explanation: "Exécuter les instructions."
            },
            {
                question: "Quel composant est considéré comme la mémoire principale de l'ordinateur",
                options: ["Le disque dur", "La clé USB", "La mémoire RAM", "Le processeur"],
                correct: 3,
                explanation: "La mémoire RAM."
            },
            {
                question: "Quelle unité de mesure est utilisée pour la fréquence du processeur? ",
                options: ["Octet", "Hertz", "Volt", "Watt"],
                correct: 2,
                explanation: "Hertz."
            },
            {
                question: "Lequel de ces éléments est un périphérique d'entrée?",
                options: [
                    "Imprimante",
                    "Ecran",
                    "Clavier",
                    "Haut parleur"
                ],
                correct: 3,
                explanation: "Clavier."
            },
            {
                question: "Quel bus permet le transport des données dans l'ordinateur?",
                options: ["Bus d'alimentation", "Bus de données", "Bus graphique", "Bus externe"],
                correct: 2,
                explanation: "Bus de données."
            },
            {
                question: "Quel est le role de l'unité de controle(UC) du processeur ?",
                options: ["Effectuer les calculs", "Gérer l'exécution des instructions", "Stocker les données", "Refroidir le processeur"],
                correct: 2,
                explanation: "Gérer l'exécution des instructions."
            },
            {
                question: "Quel est volatile ?",
                options: ["Disque dur", "ROM", "RAM", "DVD"],
                correct: 3,
                explanation: "RAM."
            },
            {
                question: "Quel composant permet la communication entre les différents éléments de la carte mère ?",
                options: ["Le ventilateur", "Le chipset", "Le disque dur", "L'écran"],
                correct: 2,
                explanation: "Le chipset."
            },
            {
                question: "Quel système est chargé au démarrage de l'ordinateur  ?",
                options: [
                    "Le BIOS",
                    "Le traitement de texte",
                    "Le navigateur",
                    "L'imprimante"
                ],
                correct: 1,
                explanation: "Le BIOS ."
            },
            {
                question: "Quel est le role de la mémoire ROM ?",
                options: ["Stocker temporairement les données", "Stocker les programmes au démarrage", "Traiter les informations", "Afficher les résultats"],
                correct: 2,
                explanation: "Stocker les programmes au démarrage."
            }
        ]
    },
    history: {
        name: "Histoire",
        questions: [
            {
                question: "Quel est le role principal d'un système d'exploitation ?",
                options: ["Créer des documents", "Gérer les ressources matérielles et logicielles", "Proteger l'ordinateur contre les virus", "Fabriquer l'ordinateur"],
                correct: 2,
                explanation: "Gérer les ressources matérielles et logicielles."
            },
            {
                question: "Parmi les éléments suivants, lequel est un peripherique d'entrée?",
                options: [
                    "Ecran",
                    "Imprimante",
                    "Clavier",
                    "Haut-parleur"
                ],
                correct: 3,
                explanation: "Clavier."
            },
            {
                question: "Quel composant est considéré comme le (cerveau) de l'ordinateur   ?",
                options: [
                    "La mémoire RAM",
                    "Le disque dur",
                    "Le processeur (CPU)",
                    "La carte graphique"
                ],
                correct: 3,
                explanation: "Le processeur."
            },
            {
                question: "Quel système d'exploitation est le plus utilisé sur les ordinateurs personnels ?",
                options: [
                    "Linux",
                    "Android",
                    "Windows",
                    "IOS"
                ],
                correct: 3,
                explanation: "Windows."
            },
            {
                question: "A quoi sert un antivirus ?",
                options: [
                    "Accélérer l'ordinateur",
                    "Installer des logiciels",
                    "Protéger contre les logiciels malveillants",
                    "Sauvegarder les données"
                ],
                correct: 3,
                explanation: "Protéger contre les logiciels malveillants."
            },
            {
                question: "Lequel de ces éléments est un logiciel applicatif ?",
                options: ["Windows", "Linux", "Microsoft Word", "BIOS"],
                correct: 3,
                explanation: "Microsoft Word."
            },
            {
                question: "Quel périphérique permet de stocker des données de façon permanente?",
                options: [
                    "Mémoire RAM",
                    "Processeur",
                    "Disque dur",
                    "Carte mère"
                ],
                correct: 3,
                explanation: "Disque dur."
            },
            {
                question: "Qu'est ce qu'un réseau informatique  ?",
                options: ["Un ensemble d'ordinateurs connectés entre eux", "Un type de logiciel ", "Un composant matériel", "Un virus informatique"],
                correct: 1,
                explanation: "Un ensemble d'ordinateurs connectés entre eux."
            },
            {
                question: "Quel est le role principal de la carte mère ?",
                options: [
                    "Afficher les images",
                    "Relier et faire communiquer les composants",
                    "Stocker les données",
                    "Refroidir l'ordinateur"
                ],
                correct: 2,
                explanation: "Relier et faire communiquer les composants."
            },
            {
                question: "Lequel de ces éléments suivants, est un périphérique de sortie ?",
                options: [
                    "Souris",
                    "Clavier",
                    "Scanner",
                    "Imprimante"
                ],
                correct: 1,
                explanation: "Imprimante."
            }
        ]
    },
    french: {
        name: "Français",
        questions: [
            {
                question: "Quel est le temps du verbe dans la phrase : 'Il avait mangé' ?",
                options: [
                    "Plus-que-parfait",
                    "Passé composé",
                    "Imparfait",
                    "Futur antérieur"
                ],
                correct: 0,
                explanation: "'Avait mangé' est au plus-que-parfait."
            },
            {
                question: "Quel mot est un adverbe dans la phrase : 'Il court rapidement' ?",
                options: ["Il", "court", "rapidement", "Aucun"],
                correct: 2,
                explanation: "'Rapidement' est un adverbe qui modifie le verbe 'court'."
            },
            {
                question: "Quelle figure de style consiste à répéter un même mot en début de phrase ?",
                options: ["Métaphore", "Anaphore", "Hyperbole", "Litote"],
                correct: 1,
                explanation: "L'anaphore est la répétition d'un mot en début de phrase."
            },
            {
                question: "Qui a écrit 'Les Misérables' ?",
                options: [
                    "Émile Zola",
                    "Victor Hugo",
                    "Gustave Flaubert",
                    "Albert Camus"
                ],
                correct: 1,
                explanation: "'Les Misérables' a été écrit par Victor Hugo."
            },
            {
                question: "Quel est le féminin de 'coq' ?",
                options: ["Coque", "Coquette", "Poule", "Coquine"],
                correct: 2,
                explanation: "Le féminin de 'coq' est 'poule'."
            },
            {
                question: "Combien de syllabes compte le mot 'électricité' ?",
                options: ["4", "5", "6", "7"],
                correct: 1,
                explanation: "É-lec-tri-ci-té compte 5 syllabes."
            },
            {
                question: "Quelle est la nature du mot 'malgré' ?",
                options: [
                    "Préposition",
                    "Conjonction",
                    "Adverbe",
                    "Adjectif"
                ],
                correct: 0,
                explanation: "'Malgré' est une préposition."
            },
            {
                question: "Quel auteur a écrit 'Le Petit Prince' ?",
                options: [
                    "Jules Verne",
                    "Antoine de Saint-Exupéry",
                    "Marcel Proust",
                    "Jean de La Fontaine"
                ],
                correct: 1,
                explanation: "'Le Petit Prince' a été écrit par Antoine de Saint-Exupéry."
            },
            {
                question: "Quelle est la fonction de 'que' dans : 'Je sais que tu viendras' ?",
                options: [
                    "Pronom relatif",
                    "Conjonction de subordination",
                    "Pronom interrogatif",
                    "Adverbe"
                ],
                correct: 1,
                explanation: "'Que' est une conjonction de subordination ici."
            },
            {
                question: "Quel est le registre de langue de 'bagnole' pour 'voiture' ?",
                options: [
                    "Courant",
                    "Soutenu",
                    "Familier",
                    "Argotique"
                ],
                correct: 2,
                explanation: "'Bagnole' est du registre familier pour 'voiture'."
            }
        ]
    },
    english: {
        name: "Anglais",
        questions: [
            {
                question: "What is the past tense of 'to go'?",
                options: ["Goed", "Went", "Gone", "Goes"],
                correct: 1,
                explanation: "The past tense of 'to go' is 'went'."
            },
            {
                question: "Which word means 'the day after today'?",
                options: ["Yesterday", "Tomorrow", "Today", "Now"],
                correct: 1,
                explanation: "'Tomorrow' means 'the day after today'."
            },
            {
                question: "What is the plural of 'child'?",
                options: ["Childs", "Children", "Childes", "Child's"],
                correct: 1,
                explanation: "The plural of 'child' is 'children'."
            },
            {
                question: "Which sentence is correct?",
                options: [
                    "She don't like apples",
                    "She doesn't likes apples",
                    "She doesn't like apples",
                    "She not like apples"
                ],
                correct: 2,
                explanation: "'She doesn't like apples' is the correct form."
            },
            {
                question: "What does 'to look forward to' mean?",
                options: [
                    "To forget",
                    "To anticipate with pleasure",
                    "To look behind",
                    "To be afraid of"
                ],
                correct: 1,
                explanation: "'To look forward to' means to anticipate with pleasure."
            },
            {
                question: "Which is the correct comparative form of 'good'?",
                options: ["Gooder", "More good", "Better", "Best"],
                correct: 2,
                explanation: "The comparative of 'good' is 'better'."
            },
            {
                question: "What is the opposite of 'expensive'?",
                options: ["Cheap", "Costly", "Valuable", "Precious"],
                correct: 0,
                explanation: "The opposite of 'expensive' is 'cheap'."
            },
            {
                question: "Which verb form is used with 'I', 'you', 'we', 'they' in present simple?",
                options: [
                    "Verb + s",
                    "Base form",
                    "Verb + ing",
                    "Past participle"
                ],
                correct: 1,
                explanation: "With 'I', 'you', 'we', 'they', we use the base form."
            },
            {
                question: "What does 'brunch' mean?",
                options: [
                    "Breakfast and lunch combined",
                    "A British lunch",
                    "A quick breakfast",
                    "A light dinner"
                ],
                correct: 0,
                explanation: "'Brunch' is a combination of breakfast and lunch."
            },
            {
                question: "Which sentence is in the present perfect?",
                options: [
                    "I eat breakfast",
                    "I ate breakfast",
                    "I have eaten breakfast",
                    "I will eat breakfast"
                ],
                correct: 2,
                explanation: "'I have eaten breakfast' is in the present perfect."
            }
        ]
    },
    computer: {
        name: "Informatique",
        questions: [
            {
                question: "Que signifie l'acronyme HTML ?",
                options: [
                    "Hyper Text Markup Language",
                    "High Tech Modern Language",
                    "Hyper Transfer Markup Language",
                    "Home Tool Markup Language"
                ],
                correct: 0,
                explanation: "HTML signifie HyperText Markup Language."
            },
            {
                question: "Quel langage est principalement utilisé pour styliser les pages web ?",
                options: ["HTML", "JavaScript", "CSS", "Python"],
                correct: 2,
                explanation: "CSS (Cascading Style Sheets) est utilisé pour styliser les pages web."
            },
            {
                question: "Quelle est la fonction principale d'un routeur dans un réseau ?",
                options: [
                    "Stocker des données",
                    "Acheminer des paquets entre réseaux",
                    "Convertir des signaux analogiques en numériques",
                    "Protéger contre les virus"
                ],
                correct: 1,
                explanation: "Un routeur achemine des paquets entre différents réseaux."
            },
            {
                question: "Quel est le plus petit élément d'une image numérique ?",
                options: ["Byte", "Pixel", "Vector", "Dot"],
                correct: 1,
                explanation: "Le pixel est le plus petit élément d'une image numérique."
            },
            {
                question: "Quelle structure de données fonctionne sur le principe FIFO ?",
                options: ["Pile", "File", "Liste", "Arbre"],
                correct: 1,
                explanation: "Une file (queue) fonctionne sur le principe FIFO (First In, First Out)."
            },
            {
                question: "Quel protocole est utilisé pour transférer des pages web ?",
                options: ["FTP", "HTTP", "SMTP", "TCP"],
                correct: 1,
                explanation: "HTTP (HyperText Transfer Protocol) est utilisé pour transférer des pages web."
            },
            {
                question: "Quel type de base de données utilise des tables et des relations ?",
                options: [
                    "Base de données relationnelle",
                    "Base de données NoSQL",
                    "Base de données orientée graphe",
                    "Base de données hiérarchique"
                ],
                correct: 0,
                explanation: "Une base de données relationnelle utilise des tables et des relations."
            },
            {
                question: "Quel langage de programmation a été créé par Guido van Rossum ?",
                options: ["Java", "Python", "C++", "JavaScript"],
                correct: 1,
                explanation: "Python a été créé par Guido van Rossum."
            },
            {
                question: "Quelle est la complexité temporelle de la recherche binaire ?",
                options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
                correct: 2,
                explanation: "La recherche binaire a une complexité de O(log n)."
            },
            {
                question: "Que signifie CPU en informatique ?",
                options: [
                    "Central Processing Unit",
                    "Computer Processing Unit",
                    "Central Program Unit",
                    "Computer Program Unit"
                ],
                correct: 0,
                explanation: "CPU signifie Central Processing Unit (unité centrale de traitement)."
            }
        ]
    }
};

// Variables globales pour le quiz
let currentQuiz = null;
let currentQuestionIndex = 0;
let userAnswers = [];
let score = 0;
let startTime = null;
let timerInterval = null;
let selectedSubject = null;

// Initialisation du quiz
document.addEventListener('DOMContentLoaded', function() {
    // Sélection de matière
    const subjectCards = document.querySelectorAll('.subject-card');
    const startQuizBtn = document.getElementById('startQuizBtn');
    const subjectSelection = document.getElementById('subjectSelection');
    const quizContent = document.getElementById('quizContent');
    
    // Gérer la sélection de matière
    subjectCards.forEach(card => {
        card.addEventListener('click', function() {
            // Retirer la classe active de toutes les cartes
            subjectCards.forEach(c => c.classList.remove('active'));
            
            // Ajouter la classe active à la carte cliquée
            this.classList.add('active');
            
            // Stocker la matière sélectionnée
            selectedSubject = this.dataset.subject;
        });
    });
    
    // Démarrer le quiz
    if (startQuizBtn) {
        startQuizBtn.addEventListener('click', function() {
            if (!selectedSubject) {
                alert('Veuillez sélectionner une matière avant de commencer.');
                return;
            }
            
            // Initialiser le quiz
            initQuiz(selectedSubject);
            
            // Masquer la sélection de matière et afficher le quiz
            subjectSelection.style.display = 'none';
            quizContent.style.display = 'block';
        });
    }
    
    // Gérer les contrôles du quiz
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitQuizBtn = document.getElementById('submitQuizBtn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', showPreviousQuestion);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', showNextQuestion);
    }
    
    if (submitQuizBtn) {
        submitQuizBtn.addEventListener('click', submitQuiz);
    }
    
    // Gérer les boutons de résultats
    const reviewBtn = document.getElementById('reviewBtn');
    const newQuizBtn = document.getElementById('newQuizBtn');
    
    if (reviewBtn) {
        reviewBtn.addEventListener('click', function() {
            // Revenir à la première question pour révision
            currentQuestionIndex = 0;
            showQuestion(currentQuestionIndex);
            document.getElementById('quizResults').style.display = 'none';
            document.getElementById('quizContent').style.display = 'block';
        });
    }
    
    if (newQuizBtn) {
        newQuizBtn.addEventListener('click', function() {
            // Revenir à la sélection de matière
            location.reload();
        });
    }
});

// Initialiser le quiz
function initQuiz(subject) {
    currentQuiz = quizData[subject];
    currentQuestionIndex = 0;
    userAnswers = new Array(currentQuiz.questions.length).fill(null);
    score = 0;
    startTime = new Date();
    
    // Démarrer le minuteur
    startTimer();
    
    // Afficher la première question
    showQuestion(0);
    
    // Mettre à jour l'affichage de la matière
    document.getElementById('currentSubject').textContent = currentQuiz.name;
    document.getElementById('totalQuestions').textContent = currentQuiz.questions.length;
    
    // Afficher le bouton de soumission si c'est la dernière question
    updateNavigationButtons();
}

// Afficher une question
function showQuestion(index) {
    // Mettre à jour l'index de la question courante
    currentQuestionIndex = index;
    
    // Mettre à jour l'affichage de la progression
    document.getElementById('currentQuestion').textContent = index + 1;
    const progress = ((index + 1) / currentQuiz.questions.length) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
    
    // Récupérer la question actuelle
    const question = currentQuiz.questions[index];
    
    // Mettre à jour le texte de la question
    document.getElementById('questionText1').textContent = question.question;
    
    // Mettre à jour les options
    const optionsContainer = document.getElementById('optionsContainer1');
    optionsContainer.innerHTML = '';
    
    const optionLetters = ['A', 'B', 'C', 'D'];
    
    question.options.forEach((option, optionIndex) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        
        // Si l'utilisateur a déjà répondu à cette question
        if (userAnswers[index] !== null && userAnswers[index] === optionIndex) {
            optionElement.classList.add('selected');
        }
        
        // Si on est en mode révision, montrer les réponses correctes/incorrectes
        const isReviewMode = document.getElementById('quizResults').style.display === 'block';
        if (isReviewMode) {
            if (optionIndex === question.correct) {
                optionElement.classList.add('correct');
            } else if (userAnswers[index] === optionIndex && userAnswers[index] !== question.correct) {
                optionElement.classList.add('incorrect');
            }
        }
        
        optionElement.innerHTML = `
            <div class="option-letter">${optionLetters[optionIndex]}</div>
            <div class="option-text">${option}</div>
        `;
        
        // Ajouter un écouteur d'événement pour sélectionner une option
        optionElement.addEventListener('click', function() {
            if (isReviewMode) return; // Ne pas permettre de changer les réponses en mode révision
            
            // Désélectionner toutes les options
            document.querySelectorAll('.option').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // Sélectionner l'option cliquée
            this.classList.add('selected');
            
            // Enregistrer la réponse de l'utilisateur
            userAnswers[index] = optionIndex;
            
            // Mettre à jour les boutons de navigation
            updateNavigationButtons();
        });
        
        optionsContainer.appendChild(optionElement);
    });
    
    // Mettre à jour les boutons de navigation
    updateNavigationButtons();
}

// Afficher la question précédente
function showPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        showQuestion(currentQuestionIndex - 1);
    }
}

// Afficher la question suivante
function showNextQuestion() {
    // Vérifier si l'utilisateur a répondu à la question actuelle
    if (userAnswers[currentQuestionIndex] === null) {
        alert('Veuillez sélectionner une réponse avant de continuer.');
        return;
    }
    
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
        showQuestion(currentQuestionIndex + 1);
    }
}

// Mettre à jour les boutons de navigation
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitQuizBtn = document.getElementById('submitQuizBtn');
    
    // Bouton précédent
    prevBtn.disabled = currentQuestionIndex === 0;
    
    // Bouton suivant/soumettre
    const isLastQuestion = currentQuestionIndex === currentQuiz.questions.length - 1;
    
    if (isLastQuestion) {
        nextBtn.style.display = 'none';
        submitQuizBtn.style.display = 'inline-block';
        
        // Activer le bouton de soumission seulement si l'utilisateur a répondu
        submitQuizBtn.disabled = userAnswers[currentQuestionIndex] === null;
    } else {
        nextBtn.style.display = 'inline-block';
        submitQuizBtn.style.display = 'none';
        
        // Activer/désactiver le bouton suivant
        nextBtn.disabled = userAnswers[currentQuestionIndex] === null;
    }
}

// Soumettre le quiz
function submitQuiz() {
    // Arrêter le minuteur
    stopTimer();
    
    // Calculer le score
    score = 0;
    currentQuiz.questions.forEach((question, index) => {
        if (userAnswers[index] === question.correct) {
            score++;
        }
    });
    
    // Calculer le pourcentage
    const percentage = (score / currentQuiz.questions.length) * 100;
    
    // Calculer le temps écoulé
    const endTime = new Date();
    const timeDiff = endTime - startTime;
    const minutes = Math.floor(timeDiff / 60000);
    const seconds = Math.floor((timeDiff % 60000) / 1000);
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Afficher les résultats
    showResults(percentage, formattedTime);
    
    // Sauvegarder les résultats dans le localStorage
    saveQuizResults(percentage, formattedTime);
}

// Afficher les résultats
function showResults(percentage, timeSpent) {
    // Masquer le contenu du quiz et afficher les résultats
    document.getElementById('quizContent').style.display = 'none';
    document.getElementById('quizResults').style.display = 'block';
    
    // Mettre à jour les informations des résultats
    document.getElementById('resultSubject').textContent = currentQuiz.name;
    document.getElementById('resultCorrect').textContent = score;
    document.getElementById('resultIncorrect').textContent = currentQuiz.questions.length - score;
    document.getElementById('resultTime').textContent = timeSpent;
    document.getElementById('resultScore').textContent = `${percentage.toFixed(0)}%`;
    
    // Mettre à jour le cercle de score
    const scoreCircle = document.getElementById('scoreCircle');
    const scoreValue = document.getElementById('scoreValue');
    const scorePercentage = document.getElementById('scorePercentage');
    const resultsIcon = document.getElementById('resultsIcon');
    const resultsMessage = document.getElementById('resultsMessage');
    
    scoreValue.textContent = `${score}/${currentQuiz.questions.length}`;
    scorePercentage.textContent = `${percentage.toFixed(0)}%`;
    
    // Déterminer le niveau de performance
    if (percentage >= 80) {
        // Excellent
        scoreCircle.className = 'score-circle score-good';
        resultsIcon.className = 'results-icon good';
        resultsIcon.innerHTML = '<i class="fas fa-trophy"></i>';
        resultsMessage.textContent = 'Félicitations ! Excellent travail !';
    } else if (percentage >= 60) {
        // Bon
        scoreCircle.className = 'score-circle score-average';
        resultsIcon.className = 'results-icon average';
        resultsIcon.innerHTML = '<i class="fas fa-star"></i>';
        resultsMessage.textContent = 'Bon travail ! Vous pouvez encore vous améliorer.';
    } else {
        // À améliorer
        scoreCircle.className = 'score-circle score-poor';
        resultsIcon.className = 'results-icon poor';
        resultsIcon.innerHTML = '<i class="fas fa-redo"></i>';
        resultsMessage.textContent = 'Continuez à réviser, vous allez progresser !';
    }
}

// Sauvegarder les résultats du quiz
function saveQuizResults(percentage, timeSpent) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) return;
    
    // Récupérer les résultats existants ou initialiser un nouveau tableau
    const quizResults = JSON.parse(localStorage.getItem('quizResults')) || {};
    const userResults = quizResults[currentUser.email] || [];
    
    // Ajouter le nouveau résultat
    userResults.push({
        subject: currentQuiz.name,
        score: score,
        total: currentQuiz.questions.length,
        percentage: percentage,
        timeSpent: timeSpent,
        date: new Date().toISOString()
    });
    
    // Limiter à 10 derniers résultats
    if (userResults.length > 10) {
        userResults.shift();
    }
    
    // Sauvegarder dans le localStorage
    quizResults[currentUser.email] = userResults;
    localStorage.setItem('quizResults', JSON.stringify(quizResults));
}

// Gestion du minuteur
function startTimer() {
    let seconds = 0;
    let minutes = 0;
    
    timerInterval = setInterval(function() {
        seconds++;
        
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        
        const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById('timer').textContent = formattedTime;
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}