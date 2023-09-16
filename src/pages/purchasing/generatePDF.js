import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts'; // Import pdfFonts

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const generatePDF = (purchaseOrderData) => {
    const referenceValue = purchaseOrderData.reference ? purchaseOrderData.reference : 'None';

    const items = purchaseOrderData.purchase_order_items.map((item) => [
        item.inv_item_id, // Item No.
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
                    { text: 'Purchase Order', style: 'header', fontSize: 21},
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
                        text: `${purchaseOrderData.tenant.company_name}`,
                        margin: [0, 9, 0, 1],
                    },
                    {
                        text: `Ship-To:`,  style: "header", fontSize: 13,
                        margin: [0, 9, 0, 1],
                    },
                ]
            },
            {
                alignment: 'justify',
                columns: [
                    {
                        text: `${purchaseOrderData.tenant.address_1}`,
                        margin: [0, 0, 0, 1],
                    },
                    {
                        text: `${purchaseOrderData.warehouse.address_1}`,
                        margin: [0, 0, 0, 1],
                    },
                ]
            },
            {
                alignment: 'justify',
                columns: [
                    {
                        text: `${purchaseOrderData.tenant.address_2}`,
                        margin: [0, 0, 0, 1],
                    },
                    {
                        text: `${purchaseOrderData.warehouse.address_2}`,
                        margin: [0, 0, 0, 1],
                    },
                ]
            },
            {
                alignment: 'justify',
                columns: [
                    {
                        text: `${purchaseOrderData.tenant.city} ${purchaseOrderData.tenant.state} ${purchaseOrderData.tenant.postal_code}`,
                        margin: [0, 0, 0, 1],
                    },
                    {
                        text: `${purchaseOrderData.warehouse.city} ${purchaseOrderData.warehouse.state} ${purchaseOrderData.warehouse.postal_code}`,
                        margin: [0, 0, 0, 1],
                    },
                ]
            },
            {
                alignment: 'justify',
                columns: [
                    {
                        text: `${purchaseOrderData.tenant.country}`,
                        margin: [0, 0, 0, 1],
                    },
                    {
                        text: `${purchaseOrderData.warehouse.country}`,
                        margin: [0, 0, 0, 1],
                    },
                ]
            },

            {
                alignment: 'justify',
                columns: [
                    {
                        text: `Vendor`, bold: true, fontSize: 13,
                        margin: [0, 14, 0, 1],
                    },
                    {
                        text: `Buyer`, bold: true, fontSize: 13,
                        margin: [0, 14, 0, 1],
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
                        text: `${purchaseOrderData.user.first_name} ${purchaseOrderData.user.last_name}`,
                        margin: [0, 1, 0, 0],
                    },
                ]
            },
            {
                alignment: 'justify',
                columns: [
                    {
                        text: `${purchaseOrderData.vendor.first_name} ${purchaseOrderData.vendor.last_name} `,
                    },
                    {
                        text: `${purchaseOrderData.user.email}`,
                        margin: [0, 1, 0, 0],
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
                        text: `${purchaseOrderData.user.phone}`,
                        margin: [0, 0],
                    },
                ]
            },
            {
                alignment: 'justify',
                columns: [
                    {
                        text: `${purchaseOrderData.vendor.contact_phone}`
                    },
                    {
                        text: ``,
                        margin: [0, 1, 0, 0],
                    },
                ]
            },
            {
                alignment: 'justify',
                columns: [
                    {
                        text: `Payment Terms: ${purchaseOrderData.vendor.payment_terms}`,
                        margin: [0, 9, 0, 0],
                        bold: true
                    },
                    {
                        text: `Reference: ${referenceValue}`,
                        margin: [0, 9, 0, 0],
                    },
                ]
            },

            // `Created At: ${purchaseOrderData.createdAt}`,
            // `Due Date: ${purchaseOrderData.due_date}`,
            // `Total: ${purchaseOrderData.total_amount}`,

            // Add more purchase order details here
            {
                alignment: 'justify',
                columns: [
                    {
                        text: `Subtotal: $${purchaseOrderData.subtotal}`,
                        margin: [0, 30, 0, 0],
                    },
                    {
                        text: ``
                    },
                ]
            },
            {
                alignment: 'justify',
                columns: [
                    {
                        text: `Sales Tax/VAT: $${purchaseOrderData.sales_tax}`,
                        margin: [0, 7, 0, 0],
                    },
                    {
                        text: ``
                    },
                ]
            },
            {
                alignment: 'justify',
                columns: [
                    {
                        text: `Grand Total: $${purchaseOrderData.total_amount}`,
                        margin: [0, 7, 0, 0],
                    },
                    {
                        text: ``
                    },
                ]
            },

            {
                style: 'tableExample',
                margin: [0,10,10,0],
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
