import { useState, useEffect } from 'react';
import {
    Line, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Area, 
    AreaChart, Text, Sector
} from 'recharts';
// import { Papa } from 'papaparse';
import _ from 'lodash';
import Layout from '../components/layout/Layout';
import { expressEntryData as expressEntryDataCsv, internationalStudents } from '../utils/chartsData';

// Immigration Data
const immigrationData = [
    { year: '2000-01', immigrants: 252527 },
    { year: '2001-02', immigrants: 256405 },
    { year: '2002-03', immigrants: 199170 },
    { year: '2003-04', immigrants: 239101 },
    { year: '2004-05', immigrants: 244599 },
    { year: '2005-06', immigrants: 254381 },
    { year: '2006-07', immigrants: 238127 },
    { year: '2007-08', immigrants: 249632 },
    { year: '2008-09', immigrants: 245313 },
    { year: '2009-10', immigrants: 270635 },
    { year: '2010-11', immigrants: 259143 },
    { year: '2011-12', immigrants: 260043 },
    { year: '2012-13', immigrants: 263115 },
    { year: '2013-14', immigrants: 267936 },
    { year: '2014-15', immigrants: 240775 },
    { year: '2015-16', immigrants: 323188 },
    { year: '2016-17', immigrants: 272694 },
    { year: '2017-18', immigrants: 303369 },
    { year: '2018-19', immigrants: 313603 },
    { year: '2019-20', immigrants: 284153 },
    { year: '2020-21', immigrants: 226314 },
    { year: '2021-22', immigrants: 493236 },
    { year: '2022-23', immigrants: 468913 },
    { year: '2023-24', immigrants: 464265 }
];


// Study Permit Data
const studyPermitData = [
    { year: '2000', totalStudents: 122620 },
    { year: '2001', totalStudents: 145900 },
    { year: '2002', totalStudents: 158080 },
    { year: '2003', totalStudents: 164435 },
    { year: '2004', totalStudents: 168540 },
    { year: '2005', totalStudents: 170395 },
    { year: '2006', totalStudents: 172285 },
    { year: '2007', totalStudents: 179055 },
    { year: '2008', totalStudents: 184095 },
    { year: '2009', totalStudents: 203960 },
    { year: '2010', totalStudents: 225260 },
    { year: '2011', totalStudents: 248445 },
    { year: '2012', totalStudents: 274680 },
    { year: '2013', totalStudents: 301515 },
    { year: '2014', totalStudents: 330075 },
    { year: '2015', totalStudents: 352290 },
    { year: '2016', totalStudents: 410540 },
    { year: '2017', totalStudents: 490735 },
    { year: '2018', totalStudents: 566915 },
    { year: '2019', totalStudents: 637745 },
    { year: '2020', totalStudents: 527145 },
    { year: '2021', totalStudents: 616365 },
    { year: '2022', totalStudents: 803580 },
    { year: '2023', totalStudents: 1037165 },
    { year: '2024', totalStudents: 996375 }
];

// Provincial Immigration Data
const provincialImmigrationData = [
    { province: 'Newfoundland and Labrador', '2021-2022': 2841, '2022-2023': 5337, '2023-2024': 5353 },
    { province: 'Prince Edward Island', '2021-2022': 3439, '2022-2023': 3116, '2023-2024': 4149 },
    { province: 'Nova Scotia', '2021-2022': 13838, '2022-2023': 12305, '2023-2024': 13736 },
    { province: 'New Brunswick', '2021-2022': 8410, '2022-2023': 11021, '2023-2024': 14988 },
    { province: 'Quebec', '2021-2022': 62805, '2022-2023': 64475, '2023-2024': 55451 },
    { province: 'Ontario', '2021-2022': 227424, '2022-2023': 199332, '2023-2024': 197657 },
    { province: 'Manitoba', '2021-2022': 21343, '2022-2023': 25602, '2023-2024': 23603 },
    { province: 'Saskatchewan', '2021-2022': 16291, '2022-2023': 26130, '2023-2024': 24183 },
    { province: 'Alberta', '2021-2022': 52560, '2022-2023': 54311, '2023-2024': 60254 },
    { province: 'British Columbia', '2021-2022': 83222, '2022-2023': 66280, '2023-2024': 63574 },
    { province: 'Yukon', '2021-2022': 664, '2022-2023': 677, '2023-2024': 895 },
    { province: 'Nunavut', '2021-2022': 53, '2022-2023': 45, '2023-2024': 56 }
];


// COLORS
// const COLORS = [
//     '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8',
//     '#82ca9d', '#ffc658', '#8dd1e1', '#a4de6c', '#d0ed57',
//     '#83a6ed', '#8884d8', '#b178a6', '#ff9e8f', '#96281b'
// ];

const CanadaImmigrationDashboard = () => {
    const [expressEntryData, setExpressEntryData] = useState<{ Number: string; Date: string; Type: string; Invitations: string; "CRS Cut off": number }[]>([]);
    const [selectedYear, setSelectedYear] = useState('2024');
    const [selectedProgramType, setProgramType] = useState('Provincial Nominee Program');
    const [provincialYear, setProvincialYear] = useState("2023-2024");
    const [loading, setLoading] = useState(true);
    

    const COLORS = ['#003f5c', '#2f4b7c', '#665191', '#a05195', '#d45087', '#f95d6a', '#ff7c43', '#ffa600'];

    useEffect(() => {
        setLoading(true);
        setExpressEntryData(expressEntryDataCsv);
        console.log(expressEntryData);
        const availableTypes = [..._.uniq(
            expressEntryData
            .filter(item => {
                const year = '20' + item.Date.split('-')[2];
                return year === selectedYear;
                })
                .map(item => item.Type)
            )];
            
            // Reset program type if it's not in the current list
            if (!availableTypes.includes(selectedProgramType)) {
                setProgramType('All');
            }
            setLoading(false);
    }, [selectedYear, expressEntryData]);


    // Extract available years from data
    const yearsAvailable = _.uniq(
        expressEntryData.map(item => {
            const year = item.Date.split('-')[2];
            return year ? '20' + year : undefined;
        })
    ).filter(Boolean).sort();

    const filteredTypes = expressEntryData.filter(item => {
        const year = '20' + item.Date.split('-')[2];
        return year === selectedYear;
    });

    const programTypes = ['All', ..._.uniq(filteredTypes.map(item => item.Type))];

    // Filter based on year and type
    const filteredData = expressEntryData.filter(item => {
        const year = '20' + item.Date.split('-')[2];
        if (year !== selectedYear) return false;
        if (selectedProgramType !== 'All' && item.Type !== selectedProgramType) return false;
        return true;
    });

    // Sort by date
    const sortedData = _.sortBy(filteredData, item => {
        const [day, monthStr, year] = item.Date.split('-');
        const date = new Date(`${monthStr} ${day}, 20${year}`);
        return date.getTime();
    });

    const normalizedData = sortedData.map(d => ({
        ...d,
        'CRS Cut off': Number(d['CRS Cut off']),
    }));

    // Format date for X-axis labels
    const formatDate = (dateStr: string) => {
        const [day, month] = dateStr.split('-');
        return `${day} ${month}`;
    };


    // Prepare pie data
    const provincialImmigrationForYear = provincialImmigrationData
        .map((item) => ({
            province: item.province,
            value: item[provincialYear as keyof typeof item] || 0,
        }))
        .sort((a, b) => (b.value as number) - (a.value as number));

    const topProvinces = provincialImmigrationForYear.slice(0, 5);
    const otherProvinces = provincialImmigrationForYear.slice(5);
    const otherSum = otherProvinces.reduce((sum, item) => sum + (item.value as number), 0);

    const pieData = [...topProvinces, { province: 'Others', value: otherSum }];
    // Format large numbers
    const formatNumber = (num: number) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(0) + 'K';
        }
        return num;
    };

    return (
        <Layout >
            <div className="hidden md:flex flex-col w-full space-y-8 p-4 mt-20">
                <h1 className="text-3xl font-bold text-center text-secondary-950">
                    Canada Immigration Dashboard
                </h1>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <p className="text-xl">Loading data...</p>
                    </div>
                ) : (
                    <>
                        <div className="w-full bg-white rounded-lg shadow-lg p-6 mt-14">
                            <h2 className="text-2xl font-semibold mb-4">Express Entry Draws</h2>    
                            <div className='flex gap-4 mb-2'>
                                <select 
                                    className="border-2 border-secondary-300 rounded p-2"
                                    value={selectedYear} 
                                    onChange={(e) => setSelectedYear(e.target.value)}>
                                    {yearsAvailable.map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>

                                <select 
                                    className="border-2 border-secondary-300 rounded p-2"
                                    value={selectedProgramType} 
                                    onChange={(e) => setProgramType(e.target.value)}>
                                    {programTypes.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>
                                <ResponsiveContainer width="100%" height={450}>
                                    <ComposedChart 
                                        data={normalizedData}
                                        margin={{ top: 40, right: 40, left: 40, bottom: 20 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey="Date"
                                            tickFormatter={formatDate}
                                            interval="preserveStartEnd"
                                            angle={-45}
                                            textAnchor="end"
                                            height={60}
                                            label={{
                                                value: "Draw Date",
                                                position: "insideBottom",
                                                offset: -15,
                                                fontSize: 20,
                                                fontWeight: "bold",
                                            }}
                                        />
                                        <YAxis
                                            domain={["auto", "auto"]}
                                            label={<Text
                                                x={30}
                                                y={170}
                                                angle={-90}
                                                textAnchor="middle"
                                                fontSize={20}
                                                fontWeight="bold"
                                            >CRS Cut-off</Text>}
                                        />
                                        <defs>
                                            <linearGradient id="colorCRS" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                                            </linearGradient>
                                        </defs>
                                        <Tooltip
                                            content={({ active, payload }) => {
                                                if (active && payload?.length) {
                                                    const data = payload[0].payload;
                                                    return (
                                                        <div className="bg-white border border-gray-300 rounded p-3 shadow text-sm">
                                                            <p><strong>Date:</strong> {data.Date}</p>
                                                            <p><strong>Number:</strong> {data.Number}</p>
                                                            <p><strong>Type:</strong> {data.Type}</p>
                                                            <p><strong>CRS Cut-off:</strong> {data["CRS Cut off"]}</p>
                                                            <p><strong>Invitations:</strong> {data.Invitations}</p>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="CRS Cut off"
                                            stroke="none"
                                            fill="url(#colorCRS)"
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="CRS Cut off"
                                            name="CRS Cut-off"
                                            stroke="#8884d8"
                                            strokeWidth={2}
                                            dot={{ r: 3 }}
                                            activeDot={{ r: 6 }}
                                        />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </div>


                        {/* 2x2 Grid for other charts */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Immigration Trends */}
                                <div className="bg-white rounded-lg shadow-lg p-6">
                                    <h2 className="text-xl font-semibold mb-4">Number of Immigrants in Canada (2000–2024)</h2>
                                    <div className="h-96">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart 
                                                margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                                                data={immigrationData}>
                                                <XAxis
                                                    dataKey="year"
                                                    tick={<CustomTick />}
                                                    interval={0}
                                                />                                                <YAxis tickFormatter={(value) => new Intl.NumberFormat().format(value as number)} />
                                                <Tooltip formatter={(value) => new Intl.NumberFormat().format(value as number)} />
                                                <Bar dataKey="immigrants" fill="#8884d8" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>




                            {/* Study Permits */}
                            <div className="bg-white rounded-lg shadow-lg p-6">
                                <h2 className="text-xl font-semibold mb-4">Study Permit Holders (2000-2024)</h2>
                                <div className="h-80">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart
                                            data={studyPermitData}
                                            margin={{ top: 10, right: 30, left: 30, bottom: 25 }}
                                        >
                                            <defs>
                                                <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                                                </linearGradient>
                                            </defs>
                                            <XAxis
                                                dataKey="year"
                                                angle={-45}
                                                textAnchor="end"
                                                height={60}
                                                label={{ value: 'Year', position: 'insideBottom', offset: 0, fontSize: 20, fontWeight: 'bold' }}
                                                tick={{ fontSize: 12 }}
                                            />
                                            <YAxis
                                                tickFormatter={(value) => new Intl.NumberFormat().format(value)}
                                                tick={{ fontSize: 12 }}
                                                label={
                                                    <Text
                                                        x={20} // adjust this to move it horizontally
                                                        y={140} // adjust this to move it vertically
                                                        angle={-90}
                                                        textAnchor="middle"
                                                        fontSize={20}
                                                        fontWeight="bold"   
                                                    >
                                                        Number of People
                                                    </Text>
                                                }
                                            />
                                            <CartesianGrid strokeDasharray="3 3" />
                                                <Tooltip
                                                    formatter={(value) => {
                                                        const numericValue = typeof value === 'number' ? value : Number(value);
                                                        return new Intl.NumberFormat().format(numericValue);
                                                    }}
                                                />

                                            <Area
                                                type="monotone"
                                                dataKey="totalStudents"
                                                stroke="#8884d8"
                                                fillOpacity={1}
                                                fill="url(#colorStudents)"
                                                name="Total Students"
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* international students */}
                            <StudyPermitChart />


                            {/* Provincial Distribution */}
                            <div className="bg-white rounded-lg shadow-lg p-6">
                                <h2 className="text-xl font-semibold mb-4">Provincial Immigration Distribution</h2>

                                <div className="mb-4">
                                    <label className="mr-2 font-medium">Year:</label>
                                    <select
                                        value={provincialYear}
                                        onChange={(e) => setProvincialYear(e.target.value)}
                                        className="border rounded p-2"
                                    >
                                        <option value="2021-2022">2021-2022</option>
                                        <option value="2022-2023">2022-2023</option>
                                        <option value="2023-2024">2023-2024</option>
                                    </select>
                                </div>

                                <div className="h-80">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={pieData}
                                                dataKey="value"
                                                nameKey="province"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={100}
                                                label={({ province, value, percent }) =>
                                                    `${province}: ${formatNumber(value)} (${(percent * 100).toFixed(0)}%)`
                                                }
                                                labelLine={false}
                                            >
                                                {pieData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                                <Tooltip
                                                    formatter={(value) => {
                                                        const numericValue = typeof value === 'number' ? value : Number(value);
                                                        return new Intl.NumberFormat().format(numericValue);
                                                    }}
                                                />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <div className="flex flex-col w-full h-[70vh] justify-center items-center space-y-8 p-4 mt-20">
                <h1 className="text-3xl font-bold text-center text-secondary-950">
                    You will need bigger screen to view the charts (desktop views)
                </h1>
            </div>
        </Layout>
    );
};

export default CanadaImmigrationDashboard;







const COLORS = [
    '#8884d8', '#8dd1e1', '#ffc658', '#82ca9d', '#a4de6c',
    '#d0ed57', '#ff8042', '#d88884', '#84d888', '#84b6d8',
    '#c994e3', '#e384b9', '#a0a0a0', '#4f9da6'
];

const StudyPermitChart: React.FC = () => {
    const allYears = internationalStudents.map(d => d.year).filter(y => y !== 2024); // Filter out 2024

    const provinceKeys = [
        'Newfoundland', 'PEI', 'NovaScotia', 'NewBrunswick', 'Quebec',
        'Ontario', 'Manitoba', 'Saskatchewan', 'Alberta', 'BC',
        'NWT', 'Yukon', 'Nunavut', 'NotStated'
    ];

    const labelMap: Record<string, string> = {
        Newfoundland: 'Newfoundland and Labrador',
        PEI: 'Prince Edward Island',
        NovaScotia: 'Nova Scotia',
        NewBrunswick: 'New Brunswick',
        Quebec: 'Quebec',
        Ontario: 'Ontario',
        Manitoba: 'Manitoba',
        Saskatchewan: 'Saskatchewan',
        Alberta: 'Alberta',
        BC: 'British Columbia',
        NWT: 'Northwest Territories',
        Yukon: 'Yukon',
        Nunavut: 'Nunavut',
        NotStated: 'Not stated',
    };

    const [selectedYear, setSelectedYear] = useState<number>(2024); // Default

    const yearData = internationalStudents.find(d => d.year === selectedYear);

    const chartData = provinceKeys.map(key => ({
        name: labelMap[key],
        value: yearData?.[key as keyof typeof yearData] ?? 0
    }));

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">Study Permit Holders in {selectedYear}</h2>
            <select
                className="border p-2 rounded mb-4"
                value={selectedYear}
                onChange={e => setSelectedYear(parseInt(e.target.value))}
            >
                {[...allYears, 2024].map(year => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>

            <ResponsiveContainer width="100%" height={500}>
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="45%"
                        outerRadius={150}
                        labelLine={false}
                        // label={renderCustomizedLabel}
                    >
                        {chartData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>

                    <Tooltip />
                    <Legend
                        layout="vertical"
                        verticalAlign="middle"
                        align="right"
                        wrapperStyle={{ width: '30%' }} // controls legend box size
                    />
                </PieChart>
            </ResponsiveContainer>

        </div>
    );
};

const CustomTick = ({ x, y, payload }: any) => {
    return (
        <g transform={`translate(${x},${y})`}>
            <text
                x={-25}
                y={10}
                dy={0}
                textAnchor="middle"
                fontSize={12}
                transform="rotate(-45)" // Rotate labels here
            >
                {payload.value}
            </text>
        </g>
    );
};

const RADIAN = Math.PI / 180;

// Custom label with line (polyline) and better spacing
const renderCustomizedLabel = (props: any) => {
    const {
        cx,
        cy,
        midAngle,
        outerRadius,
        percent,
        index,
        name,
        value,
    } = props;

    const radius = outerRadius + 20;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    const lineX = cx + (outerRadius + 10) * Math.cos(-midAngle * RADIAN);
    const lineY = cy + (outerRadius + 10) * Math.sin(-midAngle * RADIAN);

    return (
        <g>
            <polyline
                points={`${lineX},${lineY} ${x},${y}`}
                stroke="#999"
                fill="none"
            />
            <text
                x={x}
                y={y}
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
                fontSize={12}
                fill="#333"
            >
                {`${name}: ${value.toLocaleString()}`}
            </text>
        </g>
    );
};




