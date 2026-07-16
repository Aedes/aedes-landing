export type Project = {
	nombre: string;
	cliente: string;
	problema: string;
	solucion: string;
	decision_clave: string;
	resultado: string;
	stack: string[];
	industria: string;
	industria_corta: string;
	imagen_industria: string;
	imagen_interfaz: string;
	metricas_resultado: Record<string, string | number>;
	fecha: string;
};
