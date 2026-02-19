FROM python:3.13-slim

WORKDIR /app

COPY worker-python/requirements.txt .
RUN pip install -r requirements.txt

COPY worker-python/worker.py .

CMD ["python", "worker.py"]