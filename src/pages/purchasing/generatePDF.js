import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts'; // Import pdfFonts

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const generatePDF = (purchaseOrderData) => {
    const items = purchaseOrderData.purchase_order_items.map((item) => [
        item.id, // Item No.
        item.inventory_item.item_name, // Item Name (Replace with actual item name property)
        item.inventory_item.manuf_sku, // SKU (Replace with actual SKU property)
        item.quantity, // Quantity (Replace with actual quantity property)
        item.unit_price, // Price (Replace with actual price property)
        item.total_price, // Total Price (Replace with actual total_price property)
    ]);

    const documentDefinition = {
        content: [
            {
                alignment: 'justify',
                columns: [
                    { text: 'Purchase Order', style: 'header', fontSize: 19},
                    {
                        text: `Document No. ${purchaseOrderData.id}`, style: "subheader", fontSize: 13,
                        margin: [0, 5, 0, 4],
                    },

                ]
            },
            {
                alignment: 'justify',
                columns: [
                    {
                        text: `Creation Date: ${purchaseOrderData.createdAt}`,
                        margin: [0, 0, 10, 15],
                    },
                    {
                        text: `Due Date: ${purchaseOrderData.due_date}`,
                        margin: [0, 0, 10, 15],
                    },
                ]
            },
            {
                alignment: 'justify',
                columns: [
                    {
                        text: `Vendor`, bold: true, fontSize: 13,
                        margin: [0, 1],
                    },
                    {
                        text: `Buyer`, bold: true, fontSize: 13,
                        margin: [0, 1],
                    },
                ]
            },
            {
                alignment: 'justify',
                columns: [
                    {
                        text: `${purchaseOrderData.vendor.company_name}`,
                        margin: [0, 1],
                    },
                    {
                        text: `Buyer`, bold: true, fontSize: 13,
                        margin: [0, 1],
                    },
                ]
            },
            {
                alignment: 'justify',
                columns: [
                    {
                        text: `${purchaseOrderData.vendor.first_name} ${purchaseOrderData.vendor.last_name}`,
                    },
                    {
                        text: `Buyer`, bold: true, fontSize: 13,
                        margin: [0, 1],
                    },
                ]
            },
            {
                alignment: 'justify',
                columns: [
                    {
                        text: `${purchaseOrderData.vendor.email}`,
                    },
                    {
                        text: `Buyer`, bold: true, fontSize: 13,
                        margin: [0, 1],
                    },
                ]
            },





            {
                text: `${purchaseOrderData.vendor.city} ${purchaseOrderData.vendor.state} ${purchaseOrderData.vendor.postal_code}`,
            },

            {
                text: `${purchaseOrderData.vendor.phone_1}`,
            },

            // `Created At: ${purchaseOrderData.createdAt}`,
            // `Due Date: ${purchaseOrderData.due_date}`,
            // `Total: ${purchaseOrderData.total_amount}`,
            {
                text: 'This paragraph (consisting of a single line) directly sets top and bottom margin to 20',
                margin: [0, 20],
            },
            // Add more purchase order details here
            {
                style: 'tableExample',
                table: {
                    body: [
                        ['Item No.', 'Item Name', 'SKU', 'Quantity', 'Price', 'Total Price'],
                        ...items
                    ]
                }
            },
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
