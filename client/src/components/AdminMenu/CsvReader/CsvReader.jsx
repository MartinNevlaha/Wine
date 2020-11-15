import React, { Component } from 'react';

import {CSVReader} from 'react-papaparse';

class CsvReader extends Component {
  
    handleOnError = (err, file, inputElem, reason) => {
      console.log(err)
    }
    csvLoadHandler = (data) => {
      let importedCsvData = [];
      for (let key in data) {
        if (data[key].data[0] !=='') {
          importedCsvData.push(data[key].data);
        }
      }
      this.props.csvLoad(importedCsvData)
    }
  
    render() {
      return (
        <CSVReader
          cssLabelClass="csv-reader-input"
          onDrop={this.csvLoadHandler}
          onError={this.handleOnError}
          progressBarColor='rgb(87, 20, 20)'
          removeButtonColor='rgb(87, 20, 20)'
          addRemoveButton
          onRemoveFile={(data) => this.props.csvLoad(data)}
        >
          <span>Sem vlož alebo klikni pre nahranie CSV súboru.</span>
        </CSVReader>
      )
    }
  }

  export default CsvReader;