import { ISincronizarDB } from "../signatures/sincronizarDB.interface";

export class SincronizarDB implements ISincronizarDB {
	exec(): Promise<void> {
		throw new Error("Method not implemented.");
	}
}