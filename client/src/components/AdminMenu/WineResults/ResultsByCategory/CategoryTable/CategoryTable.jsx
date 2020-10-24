import React from 'react';

const CategoryTable = props => {
    const tableHead = props.tableHead.map((th, index) => 
    <td key={th}>
        <span>{th}</span>
    </td>
);
let resultsByCat = props.results.map(result =>
    <tr key={result._id}>
        <td>{result.id}</td>
        <td>{result.name}</td>
        <td>
            <tr>
                <td>{result.clasification}</td>
                <td>{result.color}</td>
                <td>{result.character}</td>
            </tr>
        </td>
        <td>{result.producer}</td>
        <td>{result.vintage}</td>
        <td>{result.finalResult}</td>
        <td>{result.wineCategory}</td>
        <td>Kompletnost</td>
    </tr>)
    
    return (
        <table>
        <thead>
            <tr>
                {tableHead}
            </tr>
        </thead>
        <tbody>
            {resultsByCat}
        </tbody>
    </table>
    );
}

export default CategoryTable;