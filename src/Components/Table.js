import numeral from 'numeral'
import React from 'react'
import "../Table.css"

function Table({ tableData }) {
    return (
        <div className="myTable bg-gray-300">
            {tableData.map(({country, cases}) => (
                    <tr className="flex justify-between p-1">
                        <td className=" font-mono">{country}</td>
                        <td className="font-mono">
                            <strong>{numeral(cases).format("0,0")}</strong>
                        </td>
                </tr>
            ))} 
        </div>
    )
}

export default Table
