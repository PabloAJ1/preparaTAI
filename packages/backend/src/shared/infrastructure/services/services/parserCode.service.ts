import prettier from 'prettier';
import xmlPlugin from '@prettier/plugin-xml';
import pluginJava from 'prettier-plugin-java';
import { IFormateadorCodigo } from '../../../../domains/grupoPreguntas/domain/signatures/formatCodeService.interface';
import { ELenguaje } from '../../../domains/enums/lenguaje.enum';

export class FormateadorCodigoService implements IFormateadorCodigo {
	private readonly config = {
		useTabs: true,
		tabWidth: 1,
		semi: true,
	};

	async formatear(codigo: string, lenguaje: ELenguaje): Promise<string> {
		switch (lenguaje) {
			case ELenguaje.JS:
				return prettier.format(codigo, { parser: 'babel', ...this.config });
			case ELenguaje.TS:
				return prettier.format(codigo, {
					parser: 'typescript',
					...this.config,
				});
			case ELenguaje.HTML:
				return prettier.format(codigo, { parser: 'html', ...this.config });
			case ELenguaje.XML:
				return prettier.format(codigo, {
					parser: 'xml',
					plugins: [xmlPlugin],
					xmlWhitespaceSensitivity: 'ignore',
					tabWidth: 1,
					useTabs: true,
					singleQuote: false,
				});
			case ELenguaje.JAVA:
				try {
					return prettier.format(codigo, {
						parser: 'java',
						plugins: [pluginJava],
						...this.config,
					});
				} catch (err) {
					console.warn('Error al trasnformar codigo Java. Err.: ' + err);
					return codigo;
				}

			default:
				return this.#formateoBasico(codigo);
		}
	}

	#formateoBasico(codigo: string): string {
		const lines: string[] = [];
		let indent = 0;

		const tab = '\t';

		const tokens = codigo
			.replace(/\r\n/g, '\n')
			.replace(/([{}])/g, '\n$1\n')
			.split('\n');

		for (let line of tokens) {
			line = line.trim();

			if (!line) continue;

			if (line.startsWith('}')) {
				indent--;
			}

			lines.push(tab.repeat(Math.max(indent, 0)) + line);

			if (line.endsWith('{')) {
				indent++;
			}
		}

		return lines.join('\n');
	}
}
