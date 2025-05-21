import { TableData } from '../../types';

interface TableComponentProps {
    tableData: TableData;
}

export default function TableComponent({ tableData }: TableComponentProps) {
    const { headers, rows, caption } = tableData;

    return (
        <div className="my-8 overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                <caption className="sr-only">{caption || 'Table'}</caption>
                <thead className="bg-gray-100">
                    <tr>
                        {headers.map((header, index) => (
                            <th
                                key={index}
                                className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            {row.map((cell, cellIndex) => (
                                <td
                                    key={cellIndex}
                                    className="px-6 py-4 whitespace-normal text-sm text-gray-700"
                                >
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {caption && (
                <p className="text-sm text-gray-500 text-center mt-2">{caption}</p>
            )}
        </div>
    );
}