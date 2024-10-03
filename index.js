import express from "express";
import BuatExcel from "@solusikonsep/opendocs";

const app = express();

app.get('/download-excel', async (req, res) => {
    try {
        const result = await BuatExcel({
            data: [
                { Nama: "Alam Wibowo", Umur: 28, Kota: "Jakarta Pusat" },
                { Nama: "Sherly Smith", Umur: 34, Kota: "Los Angeles" }
            ],
            columns: [
                { header: 'Nama', key: 'Nama', width: 30 },
                { header: 'Umur', key: 'Umur', width: 10 },
                { header: 'Kota', key: 'Kota', width: 30 }
            ]
        });
        
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename="${result.filename}"`);
        res.send(result.buffer);
    } catch (error) {
        res.status(500).send('Error generating Excel file');
    }
});

app.listen(5000, () => console.log("Server running on port 3000"));