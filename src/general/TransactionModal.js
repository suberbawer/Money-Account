import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row
} from "reactstrap";
import PropTypes from "prop-types";

const TransactionModal = props => {
  const { transac, opened, onClose } = props;
  const [modal, setModal] = useState(opened);
  const [transaction, setTransaction] = useState(transac);

  useEffect(() => {
    setModal(opened);
  }, [opened]);

  useEffect(() => {
    setTransaction(transaction);
  }, [transaction]);

  const toggle = () => {
    setModal(!modal);
    onClose();
  };

  const formatDate = strDate => {
    const date = new Date(strDate);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    hours = hours < 10 ? `0${hours}` : hours;

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const renderTransaction = () => {
    const tmp = Object.keys(transaction);

    return (
      <Row style={{ flexDirection: "column", padding: "2em" }}>
        {tmp.map(key => (
          <Row className="m-0" key={key}>
            <span>
              {`${key}: ${
                key === "effectiveDate"
                  ? formatDate(transaction[key])
                  : transaction[key]
              }`}
            </span>
          </Row>
        ))}
      </Row>
    );
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {`Transaction-${transaction.id}`}
        </ModalHeader>
        <ModalBody>{renderTransaction()}</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

TransactionModal.defaultProps = {
  opened: false,
  transac: {},
  onClose: () => {}
};

TransactionModal.propTypes = {
  opened: PropTypes.bool,
  transac: PropTypes.object, // eslint-disable-line
  onClose: PropTypes.func
};

export default TransactionModal;
