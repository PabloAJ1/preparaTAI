import app from "./app.js";

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(port, host, () => {
	console.info(`[ ready ] http://${host}:${port}`);
});
