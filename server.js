const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const db = new sqlite3.Database(':memory:'); // Database in RAM

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// 1. INIZIALIZZAZIONE DATABASE CON 3 TABELLE
db.serialize(() => {
    // Tabella 1: Anagrafica Studenti
    db.run(`CREATE TABLE studenti (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        cognome TEXT,
        classe TEXT,
        ha_votato INTEGER DEFAULT 0
    )`);

    // Tabella 2: Elenco Candidati/Liste
    db.run(`CREATE TABLE candidati (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome_lista TEXT
    )`);

    // Tabella 3: Urna Digitale (Voti anonimi)
    db.run(`CREATE TABLE voti_anonimi (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        candidato TEXT
    )`);

    // --- INSERIMENTO DATI DI PROVA ---

    // 1. Inserimento Studenti
    const alunni = [
        { nome: "Mario", cognome: "Rossi", classe: "5A" },
        { nome: "Luca", cognome: "Bianchi", classe: "5A" },
        { nome: "Sara", cognome: "Verdi", classe: "4B" },
        { nome: "Domenico", cognome: "Russo", classe: "5FS" },
        { nome: "Chiara", cognome: "Esposito", classe: "3C" },
    ];
    const inserisciStudente = db.prepare("INSERT INTO studenti (nome, cognome, classe) VALUES (?, ?, ?)");
    alunni.forEach(alunno => inserisciStudente.run(alunno.nome, alunno.cognome, alunno.classe));
    inserisciStudente.finalize();

    // 2. Inserimento Liste (solo una volta per nome)
    const inserisciLista = db.prepare("INSERT INTO candidati (nome_lista) VALUES (?)");
    inserisciLista.run("Lista 1 - Innovazione");
    inserisciLista.run("Lista 2 - Studenti Uniti");
    inserisciLista.finalize();

    // 3. PRE-CARICAMENTO VOTI NELL'URNA (voti_anonimi)
    const inserisciVotoInUrna = db.prepare("INSERT INTO voti_anonimi (candidato) VALUES (?)");

    // Aggiungiamo 12 voti pre-esistenti per la Lista 1
    for(let i = 0; i < 12; i++) {
        inserisciVotoInUrna.run("Lista 1 - Innovazione");
    }

    // Aggiungiamo 8 voti pre-esistenti per la Lista 2
    for(let i = 0; i < 8; i++) {
        inserisciVotoInUrna.run("Lista 2 - Studenti Uniti");
    }
    
    inserisciVotoInUrna.finalize();

    console.log("Sistema Pronto: Tabelle create, studenti caricati e urna inizializzata con voti demo.");
});
// 2. ROTTA DI VOTO (CON LOGICA DI CONTROLLO E VULNERABILITÀ)
app.post('/vota', (req, res) => {
    const { nome, cognome, classe, candidato } = req.body;

    // STEP A: Verifica se lo studente esiste e non ha ancora votato (Usiamo query sicura qui)
    const checkUser = "SELECT * FROM studenti WHERE nome = ? AND cognome = ? AND classe = ?";
    
    db.get(checkUser, [nome, cognome, classe], (err, studente) => {
        if (err) return res.status(500).json({ error: "Errore tecnico." });
        
        if (!studente) {
            return res.status(403).json({ error: "Accesso negato: Studente non in elenco." });
        }

        if (studente.ha_votato === 1) {
            return res.status(403).json({ error: "Violazione: Hai già espresso il tuo voto!" });
        }

        // STEP B: Registrazione del voto (MANTENIAMO LA SQL INJECTION PER LA DEMO)
        // Usiamo exec() e concatenazione per permettere l'attacco distruttivo
        const queryVoto = `INSERT INTO voti_anonimi (candidato) VALUES ('${candidato}')`;
        const querySegnaVotato = `UPDATE studenti SET ha_votato = 1 WHERE id = ${studente.id}`;

        console.log(`[SERVER] Eseguo inserimento voto: ${queryVoto}`);

        db.exec(`${queryVoto}; ${querySegnaVotato};`, (err) => {
            if (err) {
                console.error(`[SQL ERROR] ${err.message}`);
                res.status(500).json({ error: "Errore durante lo scrutinio." });
            } else {
                res.json({ message: "Voto registrato. Grazie per aver partecipato!" });
            }
        });
    });
});

// 3. ROTTA RISULTATI (CONTEGGIO DALL'URNA ANONIMA)
app.get('/risultati', (req, res) => {
    const query = `
        SELECT candidato, COUNT(*) as conteggio 
        FROM voti_anonimi 
        GROUP BY candidato 
        ORDER BY conteggio DESC
    `;
    
    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: "Urna manomessa o illeggibile." });
        } else {
            res.json(rows);
        }
    });
});

app.listen(3000, () => {
    console.log('Server elettorale attivo su http://localhost:3000');
});