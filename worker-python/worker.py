import requests
import random
import time

API_URL = "http://api-dotnet:5000/webhook/preco"

while True:
    preco = round(random.uniform(1, 200), 2)
    payload = {"preco": preco}
    
    try:
        response = requests.post(API_URL, json=payload)
        print(f"Enviado: R${preco} | Status: {response.status_code}")
    except Exception as e:
        print(f"Erro ao enviar: {e}")
    
    time.sleep(5)