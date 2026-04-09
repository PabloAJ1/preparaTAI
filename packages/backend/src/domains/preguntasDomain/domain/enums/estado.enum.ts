/**
 * Estados:
 * "GPT" -> Respuesta proporcionada por un chat bot, para las respuestas que he generado así, 
 * 			he utilizado chatGPT y Gemini para verificacion doble, pero, a dia de hoy ya sabemos que la posibilidad de alucionaciones es grande
 * "Revisado" -> Ha sido revisado por una persona, no está exento de posibles errores
 * "Verificado" -> Ha sido verificado o por una persona o por una plantilla correctora, se supone que es poco probable que esté mal
 */

export enum EEstado {
	GPT = "GPT",
	REVISADO = "Revisado",
	VERIFICADO = "Verificado",
	ENTERRADO = "Enterrado",
	DESENTERRADO = "Desenterrado",
	MARCADO = "Marcado para revisar"
}