## Account manager

### Tech stack and core libs used

```
Techstack: Node.js, PostgreSQL
```

### Build and run

Dokcer is needed.

```bash
docker-compose up
```

- RestAPI is exposed to local machine through port 5668
  (http://localhost:5668)

- A database container as well as a app container will be up and running, 2 accounts 12345678, and 88888888 with 1000000 HKD will be created in the database, data will be persisted in volumes.

### Endpoints implemented

```
POST /api/v1/accounts/transfer
request body:{
	"fromAccountNumber":"12345678",
	"toAccountNumber":"88888888",
	"amount":5100
}
GET  /api/v1/accounts/:accountNumber/balance
```

### Test cases

After the project is setup and running, I suggest to use Postman or Curl to test the endpoints mentioned above, here are few test cases provided.

Endpoint `GET /api/v1/accounts/:accoundNumber/balance`

```bash
curl --location --request GET 'http://localhost:5668/api/v1/accounts/12345678/balance'

Expected response:
{"balance":990000}

curl --location --request GET 'http://localhost:5668/api/v1/accounts/12345178/balance'

Expected response:
{"error":"account 12345178 does not exist"}

curl --location --request GET 'http://localhost:5668/api/v1/accounts/1345178/balance'
Expected response:
{"error":"ValidationError: child \"accountNumber\" fails because [\"accountNumber\" length must be 8 characters long]"}
```

Endpoint `POST /api/v1/accounts/:accoundNumber/balance`

```bash
curl --location --request POST 'http://localhost:5668/api/v1/accounts/transfer' \
--header 'Content-Type: application/json' \
--data-raw '{
	"fromAccountNumber":"12345678",
	"toAccountNumber":"88888888",
	"amount": 10000
}'

Expected response:
{ result: 'success' }

curl --location --request POST 'http://localhost:5668/api/v1/accounts/transfer' \
--header 'Content-Type: application/json' \
--data-raw '{
	"fromAccountNumber":"12345278",
	"toAccountNumber":"88888888",
	"amount": 10000
}'

Expected response:
{"error":"account 12345278 does not exist"}

curl --location --request POST 'http://localhost:5668/api/v1/accounts/transfer' \
--header 'Content-Type: application/json' \
--data-raw '{
	"fromAccountNumber":"12345678",
	"toAccountNumber":"88885888",
	"amount": 10000
}'

Expected response:
{"error":"account 88885888 does not exist"}


curl --location --request POST 'http://localhost:5668/api/v1/accounts/transfer' \
--header 'Content-Type: application/json' \
--data-raw '{
	"fromAccountNumber":"12345678",
	"toAccountNumber":"88888888",
	"amount": 10000333
}'

Expected response:
{"error": "insufficient balance"}
```
