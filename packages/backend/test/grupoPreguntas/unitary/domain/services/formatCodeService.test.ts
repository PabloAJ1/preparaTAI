import { test, expect, describe } from 'vitest';
import { FormateadorCodigoService } from '../../../../../src/domains/grupoPreguntas/domain/services/codeFormat.service';
import { ELenguaje } from '../../../../../src/domains/grupoPreguntas/domain/enums/lenguaje.enum';

describe('#Test > unitary > domains > grupoPreguntas > domain > services > formatCodeService ... ', () => {
	const formatCodeService = new FormateadorCodigoService();

	test('deberia devolver codigo JS bien formateado', async () => {
		const codigoJSSinFormato =
			'function square(number) {  return number * number; }';
		const result = await formatCodeService.formatear(
			codigoJSSinFormato,
			ELenguaje.JS
		);
		expect(result).toBe(
			`function square(number) {\n\treturn number * number;\n}\n`
		);
	});

	test('deberia devolver codigo TS bien formateado', async () => {
		const codigoTSSinFormato = `import { graphql } from '@/gql' 
		let ranking: Ranking; 
		let hallOfFame: Array<Ranking> = []; 
		function printRankings(rankings: Array<RankingTuple>): void {  
		for (let ranking of rankings) {     
		console.log(ranking);   
		} 
		}`;
		const result = await formatCodeService.formatear(
			codigoTSSinFormato,
			ELenguaje.TS
		);
		expect(result).toBe(
			`import { graphql } from "@/gql";\nlet ranking: Ranking;\nlet hallOfFame: Array<Ranking> = [];\nfunction printRankings(rankings: Array<RankingTuple>): void {\n	for (let ranking of rankings) {\n		console.log(ranking);\n	}\n}\n`
		);
	});

	test('deberia devolver codigo HTML bien formateado', async () => {
		const codigoHTMLSinFormato = `<html>  <head><title>Ejemplo de atributo Href</title></head><body></body></html>`;
		const result = await formatCodeService.formatear(
			codigoHTMLSinFormato,
			ELenguaje.HTML
		);
		expect(result).toBe(`<html>\n\t<head>\n\t\t<title>Ejemplo de atributo Href</title>\n\t</head>\n\t<body></body>\n</html>\n`);
	});

	test('deberia devolver codigo XML bien formateado', async () => {
		const codigoXMLSinFormato =
			"<?xml version='1.0' encoding='UTF-8'?> <datos> <alumno id='001'> asdasdasd </alumno> <alumno id='02'> asdasdasd </alumno> </datos>";
		const result = await formatCodeService.formatear(
			codigoXMLSinFormato,
			ELenguaje.XML
		);
		expect(result).toBe(
			`<?xml version='1.0' encoding='UTF-8' ?>\n<datos>\n\t<alumno id='001'>asdasdasd</alumno>\n\t<alumno id='02'>asdasdasd</alumno>\n</datos>\n`
		);
	});

	test('deberia devolver codigo Java bien formateado', async () => {
		const codigoJAVASinFormato =
			`public class HelloWorldExample{   public static void main(String args[]){ System.out.println("Hello World !");  } }`;
		const result = await formatCodeService.formatear(
			codigoJAVASinFormato,
			ELenguaje.JAVA
		);
		expect(result).toBe(
			`public class HelloWorldExample {\n\n\tpublic static void main(String args[]) {\n\t\tSystem.out.println("Hello World !");\n\t}\n}\n`
		);
	});

	test('deberia devolver codigo Java bien formateado', async () => {
		const codigoJAVASinFormato =
			`import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.hibernate.query.Query;
import jakarta.persistence.*; // Para las anotaciones JPA

@Entity
@Table(name = "users")
class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "username")
    private String username;

    @Column(name = "full_name")
    private String fullName;

    // Constructor vacío
    public User() {}

    // Constructor con parámetros
    public User(String username, String fullName) {
        this.username = username;
        this.fullName = fullName;
    }

    // Getters y setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
}

public class HibernateExample {

    public static void main(String[] args) {

        // Configuración y creación de una SessionFactory
        SessionFactory factory = new Configuration()
                .configure("hibernate.cfg.xml")
                .addAnnotatedClass(User.class)
                .buildSessionFactory();

        // Creación de una sesión
        Session session = factory.openSession();

        try {
            // Iniciando una transacción
            session.beginTransaction();

            // Guardar un objeto
            User newUser = new User("johndoe", "John Doe");
            session.save(newUser);

            // Consulta de objetos
            Query<User> query = session.createQuery(
                    "from User where username = 'johndoe'", User.class);
            User user = query.uniqueResult();

            System.out.println("User: " + user.getUsername());

            // Comprometer la transacción
            session.getTransaction().commit();

        } catch (Exception e) {
            e.printStackTrace();
            session.getTransaction().rollback();
        } finally {
            session.close();
            factory.close();
        }
    }
}`;
		const result = await formatCodeService.formatear(
			codigoJAVASinFormato,
			ELenguaje.JAVA
		);
		expect(result).toBe(
			`public class HelloWorldExample {\n\n\tpublic static void main(String args[]) {\n\t\tSystem.out.println("Hello World !");\n\t}\n}\n`
		);
	});
});
