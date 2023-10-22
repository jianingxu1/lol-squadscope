export function SepararFechaYHora(fechas) {
  // Fecha y hora en formato ISO
  const fechaHoraISO = fechas;

  // Crear un objeto Date a partir de la fecha y hora ISO
  const fechaHora = new Date(fechaHoraISO);

  // Obtener la fecha por separado
  const fecha = fechaHora.toISOString().split('T')[0];

  // Obtener la hora por separado
  const hora = fechaHora.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  return { fecha, hora };
}

export default SepararFechaYHora;
export function esManana(fecha) {
  const manana = new Date();
  manana.setDate(manana.getDate() + 1);
  const fechaComparar = new Date(fecha);

  return (
    fechaComparar.getDate() === manana.getDate() &&
    fechaComparar.getMonth() === manana.getMonth() &&
    fechaComparar.getFullYear() === manana.getFullYear()
  );
}
export function isToday(fecha) {
  const hoy = new Date();
  const fechaComparar = new Date(fecha);

  return (
    fechaComparar.getDate() === hoy.getDate() &&
    fechaComparar.getMonth() === hoy.getMonth() &&
    fechaComparar.getFullYear() === hoy.getFullYear()
  );
}
