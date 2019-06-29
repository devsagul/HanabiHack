// TODO: do not nest TIL state
import React from "react";
import PropTypes from "prop-types";

export default class TilForm extends React.Component {
  static propTypes = {
    til: PropTypes.object.isRequired,
    parentComponent: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = { til: Object.assign({}, props.til) };
  }

  onChangeHandler = (opts) => {
    let til = Object.assign({}, this.state.til)
    til[opts.property] = opts.value;
    this.setState({ til: til });
  }

  trixNotesId = () => {
    return `til_${this.state.til.id}_content`
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let thisComponent = this;
    this.onChangeHandler({ property: 'content', value: document.getElementById(this.trixNotesId()).value });
    setTimeout(function(){ thisComponent.props.parentComponent.handleSubmit(); }, 100);
  }

  render = () => {
    let thisComponent = this;

    return (
      <div id={ `til_${this.state.til.id}_form` } className='til'>
        <form onSubmit={ this.handleSubmit }>
          <p className='error-message bmargin1em'> { this.state.errorMessage } </p>
          { this.renderDeleteButtonIfPersisted() }

          <div>
            <input id={ this.trixNotesId() }
                   value={ this.state.til.content || '' }
                   ref="content"
                   type="hidden"/>
            <trix-editor input={ this.trixNotesId() }></trix-editor>
          </div>

          <div className="tmargin1em">
            <label className="label-switch left" htmlFor={ `til_${this.state.til.id}_published` }>
              <input id={ `til_${this.state.til.id}_published` }
                     type="checkbox"
                     checked={ this.state.til.published }
                     ref="published"
                     onChange={ function(e) { e.preventDefault(); } }
                     value={ this.state.til.published } />
              <div className="checkbox"
                   value="1"
                   onClick={ function(e) { thisComponent.onChangeHandler({ property: 'published', value: !thisComponent.state.til.published }) } }
                   data-is-checked={ this.state.til.published }
                   data-signifier-id="#nothing"></div>
            </label>

            <div className="right gray">
              { (function(){ if(thisComponent.state.til.published) { return 'published'; } else { return 'unpublished'; } })() }
            </div>

            <div className="clear"></div>
          </div>

          <button id={ `til_${this.state.til.id}_form_submit` }
                  className='btn btn-small btn-primary'
                  value="Save"
                  disabled={ this.state.isSubmitting }
                  ref="submit">
            Submit
          </button>

          <button className='btn btn-small btn-primary right'
                  onClick={ this.props.parentComponent.toggleForm } >Cancel</button>
        </form>
      </div>
    );
  }

  renderDeleteButtonIfPersisted = () => {
    if (this.state.til.id) {
      return (
        <div className='delete-button'>
          <button className='right bmargin1em'
             href='javascript:void(0)'
             onClick={ this.props.parentComponent.handleDelete }>delete</button>
          <div className='clear' />
        </div>
      );
    }
  }

};
