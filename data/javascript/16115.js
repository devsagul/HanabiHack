require('./OrderCode.less');
var React = require('react');
var Dropdown = require('../basic/Dropdown');
module.exports = React.createClass({
	displayName: 'OrderCode',
	getDefaultProps: function (){
		return {
			eventType: 'click',
			editable: true
		}
	},
	getInitialState: function (){
		return {
			value: this.props.value||'',
			text: this.props.text||''
		}
	},
	getValue: function () {
		return this.state.value;
	},
	setValue: function (value, text) {
		this.setState({
			value: value,
			text: text||value
		}, function (){
			this.props.onChange && this.props.onChange(value, text, this);
		});
	},
	__textRender: function (){
		return this.state.text||this.props.placeholder;
	},
	__onListItemClick: function (value, rtlistitem, rtlist, item){
		this.setValue(value, item[rtlist.props.textKey]);
		zn.popover.close('Menu:item.click');
	},
	__onInputChange: function (event){
		this.state.value = event.target.value;
		this.forceUpdate();
		zn.popover.close('Menu:item.click');
	},
	__popoverRender: function (){
		return null;
	},
	render: function(){
		return (
			<Dropdown {...this.props} popoverRender={this.__popoverRender} popoverWidth="100%" className={zn.react.classname("zr-order-code", this.props.className)} >
				<div className="code-view">
					{this.props.editable ? <input value={this.state.value} onChange={this.__onInputChange} /> : <span className="text">{this.__textRender()}</span>}
					<i className="trigger fa fa-angle-down" />
				</div>
			</Dropdown>
		);
	}
});
