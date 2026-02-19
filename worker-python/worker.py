import requests
import random
import time
import os

API_URL = os.environ.get("API_URL", "http://api-dotnet:5000/webhook/preco")

while True:
    preco = round(random.uniform(1, 200), 2)
    payload = {"preco": preco}
    
    try:
        response = requests.post(API_URL, json=payload)
        print(f"Enviado: R${preco} | Status: {response.status_code}", flush=True)
    except Exception as e:
        print(f"Erro ao enviar: {e}", flush=True)
    
    time.sleep(5)