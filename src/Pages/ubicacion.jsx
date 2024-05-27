// const ubicaciones = require('./ubicacionesData');

// function obtenerProvinciasPorDepartamento(idDepartamento) {
//     const departamento = ubicaciones.find(departamento => departamento.id === idDepartamento);
//     if (!departamento) {
//         throw new Error("Departamento no encontrado");
//     }
//     return departamento.provincias;
// }

// function obtenerDistritosPorProvincia(idDepartamento, idProvincia) {
//     const provincias = obtenerProvinciasPorDepartamento(idDepartamento);
//     const provincia = provincias.find(provincia => provincia.id === idProvincia);
//     if (!provincia) {
//         throw new Error("Provincia no encontrada");
//     }
//     return provincia.distritos;
// }

// module.exports = {
//     obtenerProvinciasPorDepartamento,
//     obtenerDistritosPorProvincia
// };

// const ubicaciones = [
//     {
//       id: 1,
//       nombre: 'Amazonas',
//       tipo: 'Departamento',
//       provincias: [
//         { id: 101, nombre: 'Chachapoyas', tipo: 'Provincia', distritos: ['Chachapoyas', 'Bagua Grande', 'Luya', 'Utcubamba'] },
//         { id: 102, nombre: 'Bagua', tipo: 'Provincia', distritos: ['Bagua', 'Imaza', 'La Peca'] },
//         // Otros provincias de Amazonas
//       ]
//     },
//     // Otros departamentos del Perú
//     {
//       id: 2,
//       nombre: 'Áncash',
//       tipo: 'Departamento',
//       provincias: [
//         { id: 201, nombre: 'Huaraz', tipo: 'Provincia', distritos: ['Huaraz', 'Caraz', 'Huari'] },
//         { id: 202, nombre: 'Casma', tipo: 'Provincia', distritos: ['Casma', 'Buena Vista Alta', 'Comandante Noel'] },
//         // Otros provincias de Áncash
//       ]
//     },
//     // Otros departamentos del Perú
//     {
//       id: 3,
//       nombre: 'Apurímac',
//       tipo: 'Departamento',
//       provincias: [
//         { id: 301, nombre: 'Abancay', tipo: 'Provincia', distritos: ['Abancay', 'Chacoche', 'Curahuasi'] },
//         { id: 302, nombre: 'Andahuaylas', tipo: 'Provincia', distritos: ['Andahuaylas', 'Andarapa', 'Chiara'] },
//         // Otros provincias de Apurímac
//       ]
//     },
//     // Otros departamentos del Perú
//     {
//       id: 4,
//       nombre: 'Arequipa',
//       tipo: 'Departamento',
//       provincias: [
//         { id: 401, nombre: 'Arequipa', tipo: 'Provincia', distritos: ['Arequipa', 'Cayma', 'Cerro Colorado'] },
//         { id: 402, nombre: 'Camana', tipo: 'Provincia', distritos: ['Camana', 'Jose Maria Quimper', 'Mariscal Caceres'] },
//         // Otros provincias de Arequipa
//       ]
//     },
//     // Otros departamentos del Perú
//     {
//       id: 5,
//       nombre: 'Ayacucho',
//       tipo: 'Departamento',
//       provincias: [
//         { id: 501, nombre: 'Huamanga', tipo: 'Provincia', distritos: ['Huamanga', 'Ayacucho', 'San Juan Bautista'] },
//         { id: 502, nombre: 'Cangallo', tipo: 'Provincia', distritos: ['Cangallo', 'Chuschi', 'Los Morochucos'] },
//         // Otros provincias de Ayacucho
//       ]
//     },
//     // Otros departamentos del Perú
//     {
//       id: 6,
//       nombre: 'Cajamarca',
//       tipo: 'Departamento',
//       provincias: [
//         { id: 601, nombre: 'Cajamarca', tipo: 'Provincia', distritos: ['Cajamarca', 'Asuncion', 'Chetilla'] },
//         { id: 602, nombre: 'Cajabamba', tipo: 'Provincia', distritos: ['Cajabamba', 'Cachachi', 'Condebamba'] },
//         // Otros provincias de Cajamarca
//       ]
//     },
//     // Otros departamentos del Perú
//     {
//       id: 7,
//       nombre: 'Callao',
//       tipo: 'Departamento',
//       provincias: [
//         { id: 701, nombre: 'Callao', tipo: 'Provincia', distritos: ['Callao', 'Bellavista', 'Carmen de la Legua'] },
//         // Otros provincias de Callao
//       ]
//     },
//     // Otros departamentos del Perú
//     {
//       id: 8,
//       nombre: 'Cusco',
//       tipo: 'Departamento',
//       provincias: [
//         { id: 801, nombre: 'Cusco', tipo: 'Provincia', distritos: ['Cusco', 'Ccorca', 'Poroy'] },
//         { id: 802, nombre: 'Acomayo', tipo: 'Provincia', distritos: ['Acomayo', 'Acopia', 'Mosoc Llacta'] },
//         // Otros provincias de Cusco
//       ]
//     },
//     // Otros departamentos del Perú
//     {
//       id: 9,
//       nombre: 'Huancavelica',
//       tipo: 'Departamento',
//       provincias: [
//         { id: 901, nombre: 'Huancavelica', tipo: 'Provincia', distritos: ['Huancavelica', 'Acobamba', 'Churcampa'] },
//         { id: 902, nombre: 'Acobamba', tipo: 'Provincia', distritos: ['Acobamba', 'Andabamba', 'Anta'] },
//         // Otros provincias de Huancavelica
//       ]
//     },
//     // Otros departamentos del Perú
//     {
//       id: 10,
//       nombre: 'Huanuco',
//       tipo: 'Departamento',
//       provincias: [
//         { id: 1001, nombre: 'Huanuco', tipo: 'Provincia', distritos: ['Huanuco', 'Amarilis', 'Chinchao'] },
//         { id: 1002, nombre: 'Ambo', tipo: 'Provincia', distritos: ['Ambo', 'Cayna', 'Colpas'] },
//         // Otros provincias de Huanuco
//       ]
//     },
//     // Otros departamentos del Perú
//     {
//       id: 11,
//       nombre: 'Ica',
//       tipo: 'Departamento',
//       provincias: [
//         { id: 1101, nombre: 'Ica', tipo: 'Provincia', distritos: ['Ica', 'La Tinguiña', 'Los Aquijes'] },
//         { id: 1102, nombre: 'Chincha', tipo: 'Provincia', distritos: ['Chincha Alta', 'Alto Larán', 'Chavin'] },
//         // Otros provincias de Ica
//       ]
//     },
//     // Otros departamentos del Perú
//     {
//       id: 12,
//       nombre: 'Junín',
//       tipo: 'Departamento',
//       provincias: [
//         { id: 1201, nombre: 'Huancayo', tipo: 'Provincia', distritos: ['Huancayo', 'Carhuacallanga', 'Chacapampa'] },
//         { id: 1202, nombre: 'Concepción', tipo: 'Provincia', distritos: ['Concepción', 'Aco', 'Andamarca'] },
//         // Otros provincias de Junín
//       ]
//     },
//     // Otros departamentos del Perú
//     {
//       id: 13,
//       nombre: 'La Libertad',
//       tipo: 'Departamento',
//       provincias: [
//         { id: 1301, nombre: 'Trujillo', tipo: 'Provincia', distritos: ['Trujillo', 'El Porvenir', 'Florencia de Mora'] },
//         { id: 1302, nombre: 'Ascope', tipo: 'Provincia', distritos: ['Ascope', 'Chicama', 'Magdalena de Cao'] },
//         // Otros provincias de La Libertad
//       ]
//     },
//     // Otros departamentos del Perú
//     {
//       id: 14,
//       nombre: 'Lambayeque',
//       tipo: 'Departamento',
//       provincias: [
//         { id: 1401, nombre: 'Chiclayo', tipo: 'Provincia', distritos: ['Chiclayo', 'Chongoyape', 'Eten'] },
//         { id: 1402, nombre: 'Ferreñafe', tipo: 'Provincia', distritos: ['Ferreñafe', 'Cañaris', 'Incahuasi'] },
//         // Otros provincias de Lambayeque
//       ]
//     },
//     // Otros departamentos del Perú
//     {
//       id: 15,
//       nombre: 'Lima',
//       tipo: 'Departamento',
//       provincias: [
//         { id: 1501, nombre: 'Lima', tipo: 'Provincia', distritos: ['Lima', 'Ancon', 'Ate'] },
//         { id: 1502, nombre: 'Barranca', tipo: 'Provincia', distritos: ['Barranca', 'Paramonga', 'Pativilca'] },
//         // Otros provincias de Lima
//       ]
//     },
//     // Otros departamentos del Perú
//     {
//       id: 16,
//       nombre: 'Loreto',
//       tipo: 'Departamento',
//       provincias: [
//         { id: 1601, nombre: 'Maynas', tipo: 'Provincia', distritos: ['Iquitos', 'Belén', 'Punchana'] },
//         { id: 1602, nombre: 'Alto Amazonas', tipo: 'Provincia', distritos: ['Yurimaguas', 'Balsapuerto', 'Jeberos'] },
//         // Otros provincias de Loreto
//       ]
//     },
//     // Otros departamentos del Perú
//     {
//       id: 17,
//       nombre: 'Madre de Dios',
//       tipo: 'Departamento',
//       provincias: [
//         { id: 1701, nombre: 'Tambopata', tipo: 'Provincia', distritos: ['Puerto Maldonado', 'Laberinto', 'Tambopata'] },
//         { id: 1702, nombre: 'Tahuamanu', tipo: 'Provincia', distritos: ['Iñapari', 'Iberia', 'Tahuamanu'] },
//         // Otros provincias de Madre de Dios
//       ]
//     },
//     // Otros departamentos del Perú
//     {
//       id: 18,
//       nombre: 'Moquegua',
//       tipo: 'Departamento',
//       provincias: [
//         { id: 1801, nombre: 'Mariscal Nieto', tipo: 'Provincia', distritos: ['Moquegua', 'Carumas', 'Cuchumbaya'] },
//         { id: 1802, nombre: 'Ilo', tipo: 'Provincia', distritos: ['Ilo', 'El Algarrobal', 'Pacocha'] },
//         // Otros provincias de Moquegua
//       ]
//     },
//     // Otros departamentos del Perú
//     {
//       id: 19,
//       nombre: 'Pasco',
//       tipo: 'Departamento',
//       provincias: [
//         { id: 1901, nombre: 'Pasco', tipo: 'Provincia', distritos: ['Cerro de Pasco', 'Chaupimarca', 'Huachon'] },
//         // Otros provincias de Pasco
//       ]
//     },
//     // Otros departamentos del Perú
//     {
//       id: 20,
//       nombre: 'Piura',
//       tipo: 'Departamento',
//       provincias: [
//         { id: 2001, nombre: 'Piura', tipo: 'Provincia', distritos: ['Piura', 'Castilla', 'Catacaos'] },
//         { id: 2002, nombre: 'Sullana', tipo: 'Provincia', distritos: ['Sullana', 'Bellavista', 'Ignacio Escudero'] },
//         // Otros provincias de Piura
//       ]
//     },
//     // Otros departamentos del Perú
//     {
//       id: 21,
//       nombre: 'Puno',
//       tipo: 'Departamento',
//       provincias: [
//         { id: 2101, nombre: 'Puno', tipo: 'Provincia', distritos: ['Puno', 'Acora', 'Amantani'] },
//         { id: 2102, nombre: 'Azángaro', tipo: 'Provincia', distritos: ['Azángaro', 'Achaya', 'Arapa'] },
//         // Otros provincias de Puno
//       ]
//     },
//     // Otros departamentos del Perú
//     {
//       id: 22,
//       nombre: 'San Martín',
//       tipo: 'Departamento',
//       provincias: [
//         { id: 2201, nombre: 'Moyobamba', tipo: 'Provincia', distritos: ['Moyobamba', 'Calzada', 'Habana'] },
//         { id: 2202, nombre: 'Rioja', tipo: 'Provincia', distritos: ['Rioja', 'Awajun', 'Elías Soplin Vargas'] },
//         // Otros provincias de San Martín
//       ]
//     },
//     // Otros departamentos del Perú
//     {
//       id: 23,
//       nombre: 'Tacna',
//       tipo: 'Departamento',
//       provincias: [
//         { id: 2301, nombre: 'Tacna', tipo: 'Provincia', distritos: ['Tacna', 'Alto de la Alianza', 'Calana'] },
//         // Otros provincias de Tacna
//       ]
//     },
//     // Otros departamentos del Perú
//     {
//       id: 24,
//       nombre: 'Tumbes',
//       tipo: 'Departamento',
//       provincias: [
//         { id: 2401, nombre: 'Tumbes', tipo: 'Provincia', distritos: ['Tumbes', 'Corrales', 'La Cruz'] },
//         // Otros provincias de Tumbes
//       ]
//     },
//     // Otros departamentos del Perú
//     {
//       id: 25,
//       nombre: 'Ucayali',
//       tipo: 'Departamento',
//       provincias: [
//         { id: 2501, nombre: 'Coronel Portillo', tipo: 'Provincia', distritos: ['Pucallpa', 'Calleria', 'Campo Verde'] },
//         // Otros provincias de Ucayali
//       ]
//     },
//   ];
  
//   module.exports = ubicaciones;
