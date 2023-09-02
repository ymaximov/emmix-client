import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts'; // Import pdfFonts

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const generatePDF = (purchaseOrderData) => {
    const documentDefinition = {
        content: [
            { text: 'Purchase Order', style: 'header' },
            `PO No.: ${purchaseOrderData.id}`,
            `Created At: ${purchaseOrderData.createdAt}`,
            `Due Date: ${purchaseOrderData.due_date}`,
            `Total: ${purchaseOrderData.total_amount}`,
            // Add more purchase order details here
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
            },
        },
    };

    return new Promise((resolve) => {
        const pdfDoc = pdfMake.createPdf(documentDefinition);
        pdfDoc.getBlob((blob) => {
            resolve(blob);
        });
    });
};

export default generatePDF;
