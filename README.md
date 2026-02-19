# Orquestrador de Logs em Tempo Real

Sistema de monitoramento de precos de ativos em tempo real, composto por um worker Python, uma API .NET Core e um frontend React.

## Arquitetura

- Worker Python: gera precos aleatorios a cada 5 segundos e envia via webhook para a API .NET
- API .NET Core: recebe os precos, aplica regra de negocio e salva no Supabase se o valor for maior que o minimo configurado
- Frontend React: exibe os precos em tempo real e permite zerar os dados via botao

## URLs dos servicos no Railway

| Servico | URL |
|---|---|
| Frontend | https://wonderful-charisma-production-57e5.up.railway.app |
| API .NET | https://orquestrador-logs-production-4f06.up.railway.app |
| Worker Python | https://inspiring-sparkle-production.up.railway.app |

## Como rodar localmente

Pre-requisitos:

- Docker e Docker Compose instalados
- Conta no Supabase com a tabela precos criada

Crie um arquivo .env na raiz do projeto com as seguintes variaveis:

```
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_KEY=sua-chave-anon
PRECO_MINIMO=100
API_URL=http://api-dotnet:8080
```

Para subir os servicos:

```bash
docker-compose up --build
```

Esse comando sobe o worker Python e a API .NET juntos. O worker comeca a enviar precos automaticamente apos iniciar.

## Estrutura do projeto

```
orquestrador-logs/
  api-dotnet/        # API .NET Core (webhook + regras de negocio)
  frontend/          # React + Tailwind (visualizacao dos dados)
  worker-python/     # Script Python (gerador de precos)
  docker-compose.yml
```

## Banco de dados (Supabase)

A tabela precos deve ser criada com a seguinte estrutura:

```sql
create table precos (
  id bigint generated always as identity primary key,
  valor double precision,
  criado_em timestamp with time zone default now()
);
```

A funcao RPC para zerar os dados:

```sql
create or replace function zerar_precos()
returns void as $$
  delete from precos;
$$ language sql security definer;
```

## Funcionalidades

- Geracao automatica de precos a cada 5 segundos
- Filtragem por preco minimo configuravel
- Log de todas as requisicoes em arquivo via Docker Volume
- Visualizacao em tempo real no frontend
- Botao para zerar os dados da tabela
