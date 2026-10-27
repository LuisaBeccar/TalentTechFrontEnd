function calcularMesesDesde(fechaIngreso) {
    const ingreso = new Date(fechaIngreso);
    const hoy = new Date(); // Toma la fecha actual del sistema

    let aniosDiferencia = hoy.getFullYear() - ingreso.getFullYear();
    let mesesDiferencia = hoy.getMonth() - ingreso.getMonth();
    
    let totalMeses = (aniosDiferencia * 12) + mesesDiferencia;

    // Si todavía no llegó el día del mes actual, restamos un mes
    if (hoy.getDate() < ingreso.getDate()) {
        totalMeses--;
    }

    return totalMeses >= 0 ? totalMeses : 0; // Evita números negativos
}

const residentes = [
  {
    id: 1,
    nombre: "Solange",
    apellido: "D'Ambrosio",
    carrera_base: "Medicina",
    anio_ingreso: 2024,
    fecha_ingreso: "2024-09-01",
    nivel: "R3",
    foto:  "multimedia/solange.jpg"
    },
    {
    id: 2,
    nombre: "Paloma",
    apellido: "Gutierrez",
    carrera_base: "Medicina",
    anio_ingreso: 2025,
    fecha_ingreso: "2025-09-01",
    nivel: "R2",
    foto:  "multimedia/paloma.jpg"
    },
    {
    id: 3,
    nombre: "Vi",
    apellido: "Beltrán",
    carrera_base: "Sociologia",
    anio_ingreso: 2025,
    fecha_ingreso: "2025-10-01",
    nivel: "R2",
    foto:  "multimedia/vi.jpg" 
    },
    {
    id: 4,
    nombre: "Luisa",
    apellido: "Beccar Varela",
    carrera_base: "Medicina",
    anio_ingreso: 2025,
    fecha_ingreso: "2025-10-01",
    nivel: "R2",
    foto:  "multimedia/luisa.png"
    },
    {
    id: 5,
    nombre: "María Agustina",
    apellido: "Paredes",
    carrera_base: "Sociologia",
    anio_ingreso: 2026,
    fecha_ingreso: "2026-08-01",
    nivel: "R1",
    foto: ""//"https://placehold.co/600x400?text=Foto" // ver como hacer que quede mismo tamaño que las otras fotos
    }
]