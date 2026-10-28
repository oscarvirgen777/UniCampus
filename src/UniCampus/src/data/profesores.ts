
export interface Profesor {
  activo: boolean;
  id: string;
  cedula: string;
  nombres: string;
  correoInstitucional: string;
  tiempoCompleto: boolean;
  
}
 export let profesores: Profesor[]=[
{
    id: "1",
    cedula: "1020456789",
    nombres: "Sara Gómez Restrepo",
    correoInstitucional: "sara.gomez@unicampus.edu.co",
    tiempoCompleto: true,
    activo: true
  },
  {
    id: "2",
    cedula: "1035678123",
    nombres: "Carlos Alberto Mendoza",
    correoInstitucional: "carlos.mendoza@unicampus.edu.co",
    tiempoCompleto: true,
    activo: true
  },
  {
    id: "3",
    cedula: "43210987",
    nombres: "Diana Patricia Jaramillo",
    correoInstitucional: "diana.jaramillo@unicampus.edu.co",
    tiempoCompleto: false,
    activo: true
  },
  {
    id: "4",
    cedula: "1152439876",
    nombres: "Andrés Felipe Torres",
    correoInstitucional: "andres.torres@unicampus.edu.co",
    tiempoCompleto: true,
    activo: true
  },
  {
    id: "5",
    cedula: "32145678",
    nombres: "Beatriz Elena Ramírez",
    correoInstitucional: "beatriz.ramirez@unicampus.edu.co",
    tiempoCompleto: false,
    activo: true
  },
  {
    id: "6",
    cedula: "1040987654",
    nombres: "Juan Camilo Castro",
    correoInstitucional: "juan.castro@unicampus.edu.co",
    tiempoCompleto: true,
    activo: true
  },
  {
    id: "7",
    cedula: "71234567",
    nombres: "Mauricio de Jesús Ochoa",
    correoInstitucional: "mauricio.ochoa@unicampus.edu.co",
    tiempoCompleto: false,
     activo: true
  },
  {
    id: "8",
    cedula: "1017543210",
    nombres: "Claudia Marcela Ortiz",
    correoInstitucional: "claudia.ortiz@unicampus.edu.co",
    tiempoCompleto: true,
     activo: true
  },
  {
    id: "9",
    cedula: "1128456123",
    nombres: "Santiago Alejandro Marín",
    correoInstitucional: "santiago.marin@unicampus.edu.co",
    tiempoCompleto: true,
     activo: true
  },
  {
    id: "10",
    cedula: "21436587",
    nombres: "Gloria Inés Bermúdez",
    correoInstitucional: "gloria.bermudez@unicampus.edu.co",
    tiempoCompleto: false,
     activo: true
  }
];


 