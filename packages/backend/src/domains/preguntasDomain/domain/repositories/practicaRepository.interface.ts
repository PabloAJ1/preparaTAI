import { Practica } from "../entities/Practicas";

export interface IPracticaRepository {
	createPractica(practica: Practica): Promise<void>;
	getPracticaPorId(idPractica: string): Promise<Practica>;
	getPracticaPorNombre(nombrePractica: string): Promise<Practica>;
	getAllPracticas(): Promise<Practica[]>;
	updatePractica(practica: Practica): Promise<void>
}