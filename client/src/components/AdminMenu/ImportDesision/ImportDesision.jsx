import React from 'react';

import Modal from '../../UI/Modal/Modal';
import Button from '../../UI/Button/Button';

const importDesision = (props) => (
    <Modal 
    show={props.show}
    closeModal={props.closeModal}>
        <p>Do databázy importujete {props.numberOfItems} pložiek.</p>
        <p>Predchádzajúca databáza bude vymazaná !</p>
        <p>Chcete pokračovať ?</p>
        <Button clicked={props.canceled}>Nie</Button>
        <Button clicked={props.submit}>Áno</Button>
    </Modal>
);

export default importDesision;