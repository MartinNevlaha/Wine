import React from 'react';

import Modal from '../../UI/Modal/Modal';
import Button from '../../UI/Button/Button';

const deleteDesision = (props) => (
    <Modal 
    show={props.show}
    closeModal={props.closeModal}>
        <p>Ste si istý ?</p>
        <div>
            <Button clicked={props.canceled}>Nie</Button>
            <Button clicked={props.submit}>Ano</Button>
        </div>
    </Modal>
);

export default deleteDesision;