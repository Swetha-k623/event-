const excelJS = require("exceljs");
const User = require("../models/User");

exports.exportUsers = async (req, res) => {
    try {
        const users = await User.find();
        const workbook = new excelJS.Workbook();
        const worksheet = workbook.addWorksheet("Users");

        worksheet.columns = [
            { header: "Name", key: "name", width: 20 },
            { header: "Email", key: "email", width: 30 },
        ];

        users.forEach(user => worksheet.addRow(user));

        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", "attachment; filename=users.xlsx");

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        res.status(500).json({ message: "Export failed", error });
    }
};
