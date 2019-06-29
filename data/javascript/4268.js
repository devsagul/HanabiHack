import React from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import { connect } from 'react-redux';
import Form from './Form.jsx';
import Table from './Table.jsx';
import * as TYPES from '../../../constants/input-types.js';
import { withCookies, Cookies } from 'react-cookie';
import css from '../../../components/AdminPanel/Tabs/table.css';
import css2 from '../adminpanel.css';

const mapStateToProps = (state, ownProps) => {
  return {
    table: state.tables[ownProps.tableName]
  };
};

class PanelWrapperContainer extends React.Component {
  /**
   * Handle the state of the current admin view
   * @constructor
   * @param {object} props
   * */
  constructor(props) {
    super(props);
    this.state = Object.assign({
      toggleAdd: false,
      toggleEdit: false,
      inputValidationMessage: null,
      itemId: '',
      successPrompt: false,
      safetyPrompt: false,
      safetyPromptValue: ''
    }, props.getInitialState());
    this.username = props.cookies.get('username');
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.getContent = this.getContent.bind(this);
    this.toggleAdd = this.toggleAdd.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.toggleSuccessPromptOn = this.toggleSuccessPromptOn.bind(this);
    this.handleDeleteButton = this.handleDeleteButton.bind(this);
    this.cancelDelete = this.cancelDelete.bind(this);
  }

  /**
   * Toggle add new row form
   * @param {object} event
   * */
  toggleAdd(event) {
    event.preventDefault();
    const toggleAdd = !this.state.toggleAdd;
    this.setState({
      toggleAdd,
      toggleEdit: false,
      itemId: '',
      inputValidationMessage: null,
      successPrompt: false,
      safetyPrompt: false,
      safetyPromptValue: ''
    });
  }

  /**
   * Toggle edit existing row form
   * @param {object} event
   * */
  toggleEdit(event) {
    event.preventDefault();
    let inputs = Object.assign({}, this.state.inputs);
    const toggleEdit = !this.state.toggleEdit;
    let itemId = '';
    if (toggleEdit) {
      const parent = event.target.parentNode.parentNode;
      const children = parent.childNodes;
      const startIndex = children[1].getAttribute('name') === 'delete' ? 2 : 1; // starting from 1 because 0 is the edit button
      for(let i = startIndex; i < children.length; i++) {
        const name = children[i].getAttribute('name');
        const value = children[i].innerText;
        inputs[name].selected = value;
        if (Array.isArray(inputs[name].value)) {
          inputs[name].value.forEach(element => element.selected = element.value === value);
        } else {
          inputs[name].value = value;
        }
      }
      itemId = parent.getAttribute('name');
    } else {
      inputs = this.props.getInitialState().inputs;
    }
    this.setState({
      toggleEdit,
      toggleAdd: false,
      inputs,
      itemId,
      inputValidationMessage: null,
      successPrompt: false,
      safetyPrompt: false,
      safetyPromptValue: ''
    });
  }

  /**
   * Handle state change for any of the inputs in the forms
   * @param {object} event
   * */
  handleInputChange(event) {
    event.preventDefault();
    const state = Object.assign({}, this.state);
    const { target } = event;
    const name = target.getAttribute('name');
    const value = target.value;
    state.inputs[name].selected = target.value;
    switch (target.getAttribute('type')) {
      case TYPES.TEXT:
      case TYPES.PASSWORD:
        state.inputs[name].value = target.value;
        break;
      case TYPES.NUMBER:
        state.inputs[name].value = parseFloat(target.value);
        break;
      case TYPES.DROPDOWN:
        state.inputs[name].value.forEach(element => element.selected = element.value === value);
        break;
      default:
        break;
    }
    this.setState(state);
  }

  /**
   * Gather all needed data from the state and send it to the backend to be added to the table
   * @param {object} event
   * */
  handleAdd(event) {
    event.preventDefault();
    const { inputs } = this.state;
    let data = {};
    for(let key in inputs) {
      if (inputs.hasOwnProperty(key)) {
        data[key] = inputs[key].selected;
      }
    }
    const inputValidation = areInputsValid(data, this.props.tableName);
    if (inputValidation.isValid) {
      this.setState({ inputValidationMessage: null });
      data.token = this.props.cookies.get('token');
      this.props.handleAddNew(data, this.toggleSuccessPromptOn);
      this.toggleAdd(event);
    } else {
      this.setState({ inputValidationMessage: inputValidation.message });
    }
  }

  /**
   * Gather all needed data from the state and send it to the backend to be edited in the table
   * @param {object} event
   * */
  handleEdit(event) {
    event.preventDefault();
    const { inputs } = this.state;
    let data = {};
    for(let key in inputs) {
      if (inputs.hasOwnProperty(key)) {
        data[key] = inputs[key].selected;
      }
    }
    if (Object.keys(data).indexOf('username') === -1) { // this means the table is users and uses usernames as ids
      data.id = event.target.parentNode.getAttribute('name');
    }
    const inputValidation = areInputsValid(data, this.props.tableName);
    if (inputValidation.isValid) {
      this.setState({ inputValidationMessage: null });
      data.token = this.props.cookies.get('token');
      this.props.handleEditRow(data, this.toggleSuccessPromptOn);
      this.toggleEdit(event);
    } else {
      this.setState({ inputValidationMessage: inputValidation.message });
    }
  }

  /**
   * Find the selected item to be deleted and add it to the state
   * @param {object} event
   * */
  handleDelete(event) {
    event.preventDefault();
    this.setState({
      toggleAdd: false,
      toggleEdit: false,
      itemId: '',
      successPrompt: false,
      safetyPrompt: true,
      safetyPromptValue: event.target.parentNode.parentNode.getAttribute('name')
    });
  }

  /**
   * Call backend to delete a row after user confirmation
   * @param {object} event
   * */
  handleDeleteButton(event) {
    event.preventDefault();
    const { props, state } = this;
    const username = props.cookies.get('username');
    const token = props.cookies.get('token');
    props.handleDeleteRow({
      usertodelete: state.safetyPromptValue,
      username,
      token
    }, this.toggleSuccessPromptOn);
    this.setState({ safetyPrompt: false });
  }

  /**
   * Cancel delete action after user confirmation
   * @param {object} event
   * */
  cancelDelete(event) {
    event.preventDefault();
    this.setState({ safetyPrompt: false, safetyPromptValue: '' });
  }

  /**
   * Clear all the text from the inputs in the open form
   * @param {object} event
   * */
  clearAll(event) {
    event.preventDefault();
    this.setState(Object.assign({
      inputValidationMessage: null,
      successPrompt: false,
      safetyPrompt: false
    }, this.props.getInitialState()));
  }

  /**
   * Show success prompt
   * */
  toggleSuccessPromptOn() {
    this.setState({ successPrompt: true });
  }

  /**
   * Render table and if requested, edit/add row form
   * */
  getContent() {
    const { props, state } = this;
    return (
      <div>
        {
          state.toggleAdd || state.toggleEdit
            ? <Form inputs={state.inputs}
              onChange={this.handleInputChange}
              onSubmit={state.toggleAdd ? this.handleAdd : this.handleEdit}
              clearAll={this.clearAll}
              itemId={state.itemId}
              isEdit={state.toggleEdit}
              isActiveUser={state.inputs.username && state.inputs.username.value === this.username} />
            : null
        }
        <Table table={props.table.data}
          addNew={this.toggleAdd}
          edit={this.toggleEdit}
          editingRow={state.itemId}
          isAddingNew={state.toggleAdd}
          deleteRow={props.handleDeleteRow ? this.handleDelete : null}
          activeUser={props.cookies.get('username')} />
      </div>
    );
  }

  /**
   * Render admin tab
   * */
  render() {
    const { props, state } = this;
    return <div className={css.topoftable}>
      <h1 className={css.titlename}>{props.header}</h1>
      <button className= {css.returnbtn} onClick={props.onReturn}>Return to main admin panel page</button>
      {state.safetyPrompt
        ? <div className={css2.safetyPromptWrapper}>
          <div className={css2.safetyPrompt}>
            <p>{`Delete user "${state.safetyPromptValue}"?`}</p>
            <button className={css2.confirmButton} onClick={this.handleDeleteButton}>Confirm</button>
            <button className={css2.cancelButton} onClick={this.cancelDelete}>Cancel</button>
          </div>
        </div>
        : null}
      {state.successPrompt ? <div className={css2.success}>Success!</div> : null}
      {state.inputValidationMessage ? <div className={css2.error}>{state.inputValidationMessage}</div> : null}
      {props.table.error ? <div className={css2.error}>{props.table.error}</div> : null}
      {this.getContent()}
    </div>;
  }
}

/**
 * Validate input based on given rules
 * @param {object} inputs - Inputs to be validated
 * @param {string} tableName - Name of the current admin table
 * */
function areInputsValid(inputs, tableName) {
  const response = {
    isValid: true,
    message: ''
  };
  const keys = Object.keys(inputs);
  keys.forEach(key => {
    if (typeof inputs[key] === 'undefined' || inputs[key] === '') {
      response.isValid = false;
      response.message = <p>Please make sure all fields have been filled in.</p>;
      return response;
    } else if (key.indexOf('start') > -1) {
      const end = keys.find(item => item.indexOf('end') > -1);
      if (end && (inputs[key] < 0 || inputs[end] < 0)) {
        response.isValid = false;
        response.message = <p>Values cannot be negative.</p>;
        return response;
      } else if (end && inputs[key] >= inputs[end]) {
        response.isValid = false;
        response.message = <p>End value cannot be smaller than or equal to start value.</p>;
        return response;
      }
    } else if (tableName === 'users') {
      if (key === 'password') {
        if (!inputs[key].match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*-_,.?])(?=.{8,})/)) {
          response.isValid = false;
          let message = [];
          if (!inputs[key].match(/(?=.{8,})/)) {
            message.push(<li key="length" className={css.validationItem}>Minimum length of 8 characters</li>);
          }
          if (!inputs[key].match(/(?=.*[a-z])/)) {
            message.push(<li key="lower" className={css.validationItem}>At least one lower case letter</li>);
          }
          if (!inputs[key].match(/(?=.*[A-Z])/)) {
            message.push(<li key="upper" className={css.validationItem}>At least one upper case letter</li>);
          }
          if (!inputs[key].match(/(?=.*[0-9])/)) {
            message.push(<li key="number" className={css.validationItem}>At least one number</li>);
          }
          if (!inputs[key].match(/(?=.*[!@#$%^&*\-_,.?])/)) {
            message.push(<li key="special" className={css.validationItem}>At least one special character (allowed special characters are: <strong>!@#$%^&*-_,.?</strong>)</li>);
          }
          response.message = [<p key="title" className={css.validationTitle}>Password field is missing the following items:</p>,
            <ul key="header">{message}</ul>];
        }
      }
    }
  });
  return response;
}

PanelWrapperContainer.defaultProps = {
  handleDeleteRow: null
};

PanelWrapperContainer.propTypes = {
  table: PropTypes.object.isRequired,
  onReturn: PropTypes.func.isRequired,
  getInitialState: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  tableName: PropTypes.string.isRequired,
  handleAddNew: PropTypes.func.isRequired,
  handleEditRow: PropTypes.func.isRequired,
  handleDeleteRow: PropTypes.func,
  cookies: instanceOf(Cookies).isRequired
};

const PanelWrapper = connect(
  mapStateToProps,
  null
)(PanelWrapperContainer);

export default withCookies(PanelWrapper);
