function showMessage(msg, type) {
    const el = document.getElementById('status');
    el.textContent = msg;
    el.className = 'status-msg ' + type;
    el.style.display = 'block';
    setTimeout(() => { el.style.display = 'none'; }, 3000);
}

async function inviaVoto() {
    const nome = document.getElementById('nome').value;
    const cognome = document.getElementById('cognome').value;
    const classe = document.getElementById('classe').value;
    const candidato = document.getElementById('candidato').value;
    
    if(!nome || !cognome || !classe || !candidato) {
        showMessage("Tutti i campi sono obbligatori!", "error");
        return;
    }

    try {
        const res = await fetch('/vota', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, cognome, classe, candidato })
        });
        const data = await res.json();
        
        if(res.ok) {
            showMessage("Voto registrato con successo!", "success");
            // Pulizia campi
            document.getElementById('nome').value = '';
            document.getElementById('cognome').value = '';
            document.getElementById('candidato').value = '';
            vediRisultati(); 
        } else {
            showMessage("Errore: " + data.error, "error");
        }
    } catch (e) {
        showMessage("Errore di connessione al server", "error");
    }
}

async function vediRisultati() {
    try {
        const res = await fetch('/risultati');
        const data = await res.json();
        const tbody = document.getElementById('corpo-tabella');
        
        tbody.innerHTML = ''; 

        if(data.error) {
            tbody.innerHTML = `<tr><td colspan="2" style="color:red; text-align:center; font-weight:bold;">⚠️ ERRORE CRITICO: ${data.error}</td></tr>`;
            return;
        }

        if(data.length === 0) {
            tbody.innerHTML = `<tr><td colspan="2" style="text-align:center;">Nessun voto presente.</td></tr>`;
            return;
        }

        data.forEach(riga => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${riga.candidato}</td><td>${riga.conteggio}</td>`;
            tbody.appendChild(tr);
        });
    } catch (e) {
        document.getElementById('corpo-tabella').innerHTML = `<tr><td colspan="2" style="color:red; text-align:center;">Server Offline o Irraggiungibile</td></tr>`;
    }
}

function toggleVideo() {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('videoPlayer');
    
    if (modal.style.display === "block") {
        modal.style.display = "none";
        // Ferma il video quando si chiude (resetta l'URL)
        const currentSrc = iframe.src;
        iframe.src = "";
        iframe.src = currentSrc;
    } else {
        modal.style.display = "block";
    }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

console.log("Sistema di voto scolastico caricato correttamente.");
document.addEventListener('DOMContentLoaded', () => {
    console.log("Sito Liceo Fermi caricato correttamente.");
});
// Carica i risultati automaticamente quando si apre la pagina
window.onload = vediRisultati;