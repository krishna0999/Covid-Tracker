import React from 'react'
import "../Table.css"

function Table({ tableData }) {
    return (
        <div className="table mt-4 bg-gray-300">
            {tableData.map(({country, cases}) => (
                <tr>
                    <td className="p-1 font-mono">{country}</td>
                    <td className="font-mono">
                        <strong>{cases}</strong>
                    </td>
                </tr>
            ))} 
        </div>
    )
}

export default Table
