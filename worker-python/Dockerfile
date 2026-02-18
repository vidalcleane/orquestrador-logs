FROM python:3.13-slim

WORKDIR /app

COPY worker-python/requirements.txt .
RUN pip install -r requirements.txt

COPY worker-python/worker.py .

CMD ["python", "worker.py"]
```

Salva, faz commit e push:
```
git add .
git commit -m "fix dockerfile worker-python"
git push