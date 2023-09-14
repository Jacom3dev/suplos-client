import * as XLSX from 'xlsx';

const headers = [
    "ID oferta",
    "Creador oferta",
    "Objeto",
    "Actividad",
    "Descripción",
    "Moneda",
    "Presupuesto",
    "Fecha de inicio",
    "Hora de inicio",
    "Fecha de cierre",
    "Estado",
];


const status = {
    ACTIVE: "Activo",
    PUBLISHED: "Publicado",
    EVALUATION: "Evaluacíon"
}
export const exportToExcel = (data) => {
    const dataArray = [headers, ...data.map(item => [
        item.id,
        item.client_name,
        item.object,
        item.activity,
        item.description,
        item.currency,
        parseFloat(item.budget).toFixed(2),
        item.start_date,
        item.start_time,
        item.end_date,
        status[item.status]
    ])];


    const workbook = XLSX.utils.book_new();
    const sheet = XLSX.utils.aoa_to_sheet(dataArray);
    XLSX.utils.book_append_sheet(workbook, sheet, 'Hoja1');
    const arrayBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    const blob = new Blob([arrayBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'events.xlsx';

    a.click();

    window.URL.revokeObjectURL(url);
};