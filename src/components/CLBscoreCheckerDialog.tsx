import { Dialog } from './ui/Dialog';
import Button from './ui/Button';

interface CLBConversionTablesDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const tables = [
    {
        title: 'IELTS (General Training) - CLB (English)',
        headers: ['CLB Level', 'Listening', 'Reading', 'Speaking', 'Writing'],
        rows: [
            ['4', '4.5', '3.5', '4.0', '4.0'],
            ['5', '5.0', '4.0', '5.0', '5.0'],
            ['6', '5.5', '5.0', '5.5', '5.5'],
            ['7', '6.0', '6.0', '6.0', '6.0'],
            ['8', '7.5', '6.5', '6.5', '6.5'],
            ['9', '8.0', '7.0', '7.0', '7.0'],
            ['10', '8.5–9.0', '8.0–9.0', '7.5–9.0', '7.5–9.0'],
        ]
    },
    {
        title: 'CELPIP-General - CLB (English)',
        headers: ['CLB Level', 'Listening', 'Reading', 'Speaking', 'Writing'],
        rows: [
            ['4', '4', '4', '4', '4'],
            ['5', '5', '5', '5', '5'],
            ['6', '6', '6', '6', '6'],
            ['7', '7', '7', '7', '7'],
            ['8', '8', '8', '8', '8'],
            ['9', '9', '9', '9', '9'],
            ['10', '10', '10', '10', '10'],
        ]
    },
    {
        title: 'PTE Core - CLB (English)',
        headers: ['CLB Level', 'Listening', 'Reading', 'Speaking', 'Writing'],
        rows: [
            ['4', '28–38', '33–41', '42–50', '41–50'],
            ['5', '39–49', '42–50', '51–58', '51–59'],
            ['6', '50–59', '51–59', '59–67', '60–68'],
            ['7', '60–70', '60–68', '68–75', '69–78'],
            ['8', '71–81', '69–77', '76–83', '79–87'],
            ['9', '82–88', '78–87', '84–88', '88–89'],
            ['10', '89+', '88+', '89+', '90+'],
        ]
    },
    {
        title: 'TEF Canada - NCLC (French)',
        headers: ['NCLC Level', 'Listening', 'Reading', 'Speaking', 'Writing'],
        rows: [
            ['4', '306–351', '306–351', '328–386', '268–329'],
            ['5', '352–392', '352–392', '387–421', '330–378'],
            ['6', '393–433', '393–433', '422–455', '379–427'],
            ['7', '434–461', '434–461', '456–493', '428–471'],
            ['8', '462–502', '462–502', '494–517', '472–511'],
            ['9', '503–545', '503–545', '518–555', '512–557'],
            ['10', '546–699', '546–699', '556–699', '558–699'],
        ]
    },
    {
        title: 'TCF Canada - NCLC (French)',
        headers: ['NCLC Level', 'Listening', 'Reading', 'Speaking', 'Writing'],
        rows: [
            ['4', '331–368', '342–374', '4–5', '4–5'],
            ['5', '369–397', '375–405', '6', '6'],
            ['6', '398–457', '406–452', '7–9', '7–9'],
            ['7', '458–502', '453–498', '10–11', '10–11'],
            ['8', '503–522', '499–523', '12–13', '12–13'],
            ['9', '523–548', '524–548', '14–15', '14–15'],
            ['10', '549–699', '549–699', '16–20', '16–20'],
        ]
    }
];

export function CLBConversionTablesDialog({
    isOpen,
    onClose
}: CLBConversionTablesDialogProps) {
    return (
        <Dialog isOpen={isOpen} onClose={onClose} title="CLB/NCLC Conversion Tables" className='m-4' maxWidth="2xl">
            <div className="space-y-8 max-h-[70vh] pr-2">
                {tables.map((table, index) => (
                    <div key={index}>
                        <h3 className="font-semibold text-lg text-secondary-900 mb-2">{table.title}</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm border border-secondary-400 rounded-lg shadow-lg mb-4">
                                <thead className="bg-secondary-100 text-left">
                                    <tr>
                                        {table.headers.map((header, idx) => (
                                            <th key={idx} className="px-2 md:px-3 py-2 border-b border-secondary-300 whitespace-nowrap">{header}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {table.rows.map((row, ridx) => (
                                        <tr key={ridx} className="even:bg-secondary-50">
                                            {row.map((cell, cidx) => (
                                                <td key={cidx} className="px-2 md:px-3 py-2 border-b border-secondary-200 whitespace-nowrap">{cell}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
        </Dialog>
    );
}
