# Progetto di Educazione Civica - Sicurezza Informatica 🛡️

Questo repository contiene un progetto realizzato per il corso di **Educazione Civica**. L'obiettivo principale è sensibilizzare, comprendere e dimostrare concetti legati alla **sicurezza informatica** e alle vulnerabilità dei sistemi web. 

Il progetto è composto da una piccola applicazione web (lato server e lato client) e da alcuni script in Python che simulano attacchi informatici per scopi puramente dimostrativi ed educativi.

## 📂 Struttura del Repository

- **`server.js`**: Il file principale del server web, basato su Node.js (presumibilmente utilizzando Express).
- **`public/`**: Cartella contenente i file statici del frontend, tra cui pagine in `HTML`, fogli di stile `CSS` e script `JavaScript`.
- **`attack.py` / `attack2.py`**: Script scritti in Python progettati per simulare degli attacchi verso il server (es. Denial of Service, Brute Force, ecc.) al fine di testarne le vulnerabilità.
- **`package.json` / `package-lock.json`**: File di configurazione di Node.js che contengono le dipendenze necessarie per far funzionare l'applicazione web.

## 🛠️ Tecnologie Utilizzate

- **Backend:** Node.js, JavaScript
- **Frontend:** HTML5, CSS3, JavaScript
- **Scripting per i test/attacchi:** Python

## 🚀 Come eseguire il progetto

### 1. Avviare il Server Web (Node.js)

Assicurati di aver installato [Node.js](https://nodejs.org/) sul tuo computer.

1. Clona il repository:
   ```bash
   git clone [https://github.com/mayrex/educazione-civica.git](https://github.com/mayrex/educazione-civica.git)
   cd educazione-civica
