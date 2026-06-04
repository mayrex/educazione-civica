# Progetto di Educazione Civica - Sicurezza Informatica e Cittadinanza Digitale 🛡️🇮🇹

Questo repository contiene un progetto interdisciplinare realizzato per l'insegnamento di **Educazione Civica**. L'obiettivo principale è coniugare lo sviluppo tecnico (programmazione web e scripting) con la consapevolezza critica dei diritti, dei doveri e dei rischi legati all'uso della rete e delle nuove tecnologie.

---

## 📘 Il Tema di Educazione Civica: La Cittadinanza Digitale

Il frontend del progetto (accessibile tramite il file `public/index.html`) è strutturato come una piattaforma informativa e divulgativa. Il sito approfondisce il concetto di **Cittadinanza Digitale consapevole**, articolandosi nei seguenti nuclei tematici fondamentali:

### 1. Diritti e Doveri nel Mondo Virtuale
* **Identità Digitale:** Che cos'è la nostra impronta digitale online e l'importanza di gestire responsabilmente la propria reputazione sul web.
* **Netiquette e Rispetto:** Le regole di comportamento per una convivenza civile online, con un focus sul contrasto a fenomeni come il **cyberbullismo** e i discorsi d'odio (*hate speech*).

### 2. Sicurezza dei Dati e Privacy (Cybersecurity e GDPR)
* **Protezione dei dati personali:** Come funzionano i cookies, la raccolta dati e l'importanza di tutelare la propria privacy in linea con le normative europee.
* **Buone pratiche di difesa:** Consigli pratici per i cittadini digitali, tra cui la creazione di password robuste, l'importanza dell'autenticazione a due fattori (2FA) e come riconoscere le truffe online (es. *Phishing*).

### 3. Consapevolezza dei Rischi Informatici
* Il sito spiega dal punto di vista teorico ed etico l'impatto degli attacchi informatici sulla società moderna (interruzione di servizi pubblici, furto d'identità, danni economici). 
* Questa sezione si collega direttamente alla parte pratica del repository, mostrando l'importanza della prevenzione e della difesa dei sistemi informatici.

---

## 📂 Struttura Tecnica del Progetto

Il progetto adotta un approccio pratico di tipo "Laboratorio", mostrando sia l'interfaccia informativa (lato difensivo/educativo) sia script di test (lato offensivo/vulnerabilità):

- **`public/`**: Contiene l'interfaccia grafica e i contenuti didattici.
  - `index.html`: La pagina principale che espone il testo e le sezioni di Educazione Civica.
  - File `CSS` e `JavaScript` per lo stile visivo e le componenti dinamiche della pagina.
- **`server.js`**: Il server backend sviluppato in Node.js (Express) che ospita l'applicazione e risponde alle richieste dei client.
- **`attack.py` / `attack2.py`**: Script Python che simulano attacchi informatici (es. Denial of Service o flooding di richieste). Servono a dimostrare concretamente cosa succede quando un server non è protetto adeguatamente, sensibilizzando sull'importanza della cybersecurity.
- **`package.json` / `package-lock.json`**: File di configurazione di Node.js con l'elenco delle dipendenze necessarie.

---

## 🛠️ Tecnologie Utilizzate

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Backend:** Node.js
- **Simulazioni e Scripting:** Python 3

---

## 🚀 Come Eseguire il Progetto

### 1. Avviare la Piattaforma Web (Node.js)
Assicurati di aver installato [Node.js](https://nodejs.org/) sul computer.

1. Clona il repository:
   ```bash
   git clone [https://github.com/mayrex/educazione-civica.git](https://github.com/mayrex/educazione-civica.git)
   cd educazione-civica
