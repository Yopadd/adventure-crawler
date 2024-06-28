# Disclaimer

Read the code can spoil your experience if you want play.

# Getting started

1. Install dependencies

```
pnpm install
```

2. Start API (development mode)

```
docker compose up -d
node ace migration:run
pnpm dev
```

3. Install game

```
xh -v post http://localhost:3333/install Authorization:"Bearer [API_KEY]"
```

4. Add new events

```
node ace make:event-adventure MyNewAwesomeEvent
```

5. Run tests

```
docker compose up -d
pnpm test
```

There are three king of tests

```
pnpm test unit
pnpm test functional
pnpm test monkey
```

# Build docker image

```
nixpacks build --name adventure-crawler .
```
