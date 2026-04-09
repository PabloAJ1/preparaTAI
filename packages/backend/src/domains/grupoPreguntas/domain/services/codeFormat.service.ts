import { ELenguaje } from '../enums/lenguaje.enum';
import { IFormateadorCodigo } from '../signatures/formatCodeService.interface';
import prettier from "prettier";
import xmlPlugin from "@prettier/plugin-xml";
import pluginJava from "prettier-plugin-java"


export class FormateadorCodigoService implements IFormateadorCodigo {
	private readonly config = {
		useTabs: true,
		tabWidth: 1,
		semi: true
	}

	async formatear(codigo: string, lenguaje: ELenguaje): Promise<string> {
		switch (lenguaje) {
			case ELenguaje.JS:
				return prettier.format(codigo, { parser: "babel", ...this.config });
			case ELenguaje.TS:
				return prettier.format(codigo, { parser: "typescript", ...this.config }) 
			case ELenguaje.HTML:
				return prettier.format(codigo, { parser: "html", ...this.config });
			case ELenguaje.XML:
				return prettier.format(codigo, { 
					parser: "xml",
					plugins: [xmlPlugin],
					xmlWhitespaceSensitivity: "ignore",
					tabWidth: 1,
					useTabs: true,
					singleQuote: false 
			});
			case ELenguaje.JAVA:
				try{
					return prettier.format(codigo, { 
						parser: "java", 
						plugins: [pluginJava],
						...this.config
					});
				} catch(err) {
					console.warn("Error al trasnformar codigo Java. Err.: " + err);
					return codigo;
				}

			default:
				return codigo;
		}
	}

}
