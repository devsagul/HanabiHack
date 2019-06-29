import React from 'react';
import ColorPicker from 'react-colors-picker';
import AddTeamActions from '../actions/AddTeamActions';
import AddTeamStore from '../stores/AddTeamStore';
import AuthenticatedComponent from '../decorators/AuthenticatedComponent';
import {LOGIN_USER, LOGOUT_USER} from '../constants/ActionTypes';


export default AuthenticatedComponent(class AddTeam extends React.Component {


	constructor(props) {
		super(props);
		this.state = AddTeamStore.getState();
		this.onChange = this.onChange.bind(this);
		this._load = this._load.bind(this);
		this.changeHandler = this.changeHandler.bind(this);
		this.color = '#dd3928';
	}

	componentDidMount() {
		this._load();
		AddTeamStore.listen(this.onChange);

	}

	componentWillUnmount() {
		AddTeamStore.unlisten(this.onChange);
	}

	componentWillUnmount(){
		AddTeamStore.unlisten(this.onChange);
	}

	_load() {
		this.userlogged = this.props.user.username;		
	}

	onChange(state) {
		this.setState(state);
	}

	changeHandler (colors) {
	  console.log(colors.color);

	  this.color = colors.color;

	}

	handleSubmit(event) {
		event.preventDefault();
							
		var team = {
			team_name: this.state.team_name,
			team_type: this.state.team_type,
			color: this.color,
			goal: this.state.goal,
			about: this.state.about,
			address1: this.state.address1,
			address2: this.state.address2,
			team_city: this.state.team_city,
			team_state: this.state.team_state,
			zipcode: this.state.zipcode,
			country: this.state.country,
			username: this.state.username,
			leader: this.userlogged
		};

		// Form validation

		//Check each field is not empty;

		if (!team.team_name) {
			this.refs.team_name.focus();
			AddTeamActions.invalidTeamName();
		}

		if (team.team_name.length < 3 || team.team_name.length > 70) {
			this.refs.team_name.focus();
			AddTeamActions.invalidTeamNameLength();
		}

		if (!team.team_type) {
			this.refs.team_type.focus();
			AddTeamActions.invalidTeamType();
		}

		if (!team.color) {
			this.refs.color.focus();
			AddTeamActions.invalidColor();
		}

		if (!team.goal) {
			this.refs.goal.focus();
			AddTeamActions.invalidGoal();
		}

		if (!team.username) {
			this.refs.username.focus();
			AddTeamActions.invalidUsername();
		}
		
		if(team.username.match(/\s/g)){
			this.refs.username.focus();
			AddTeamActions.invalidUsernameSpace();
		}

		if (team.about.length < 5 || team.about.length > 500) {
			this.refs.about.focus();
			AddTeamActions.invalidAboutLength();
		}

		if (!team.about) {
			this.refs.about.focus();
			AddTeamActions.invalidAbout();
		}

		if (!team.address1) {
			this.refs.address1.focus();
			AddTeamActions.invalidAddress1();
		}

		if (!team.team_city) {
			this.refs.team_city.focus();
			AddTeamActions.invalidCity();
		}
		if (!team.team_state) {
			this.refs.team_state.focus();
			AddTeamActions.invalidState();
		}

		if (!team.zipcode) {
			this.refs.zipcode.focus();
			AddTeamActions.invalidZipcode();
		}

		if (!team.country) {
			this.refs.country.focus();
			AddTeamActions.invalidCountry();
		}





		// console.log("Error message state now is " + this.state.errorMessageState);
		// console.log("Validation state now is " + this.state.validationState.team_name);


		//TODO: Check if user already in a team or not. There should be a step before this to make sure that if user already has, display a message and show their team, or something else...?

		if (team.team_name ) {
			// Need better logic here. Only call AddTeam Action if all fields are validated
			
				AddTeamActions.addTeam(team);
		}
	}
	
	render() {



		return (

	<div className="pre_head_padding">
		<div className="map_background">
		</div>
		<div className="form_card">
			<div className=''>

				<div className="row">
					<div className='col-sm-12'>
						<h2>Create your Rescue Team</h2>
					</div>
				</div>

				<div className="row">
					<div className='col-sm-12'>
						<div className="banner-border-seperation"></div>
					</div>
				</div>
				<div className='row'>

					<div className='col-sm-12 settings_inputs'>
					<form onSubmit={this.handleSubmit.bind(this)}>	

						<div className={this.state.errorMessageState}> 
							{this.state.errorMessage}
						</div>

						<div className={'form-group ' + this.state.validationState.team_name}>
							<span className='help-block'> {this.state.helpBlock.team_name}</span>
							<input type='text' className='form-control' ref="team_name" placeholder="Team Name" autoFocus onChange={AddTeamActions.updateTeamName} />
						</div>

						<div className={'form-group ' + this.state.validationState.team_type}>
							<span className='help-block'> {this.state.helpBlock.team_type}</span>
							<select className="form-control" ref="team_type" placeholder="Team Type"  onChange={AddTeamActions.updateTeamType}>
								<option value="">Team Type</option>
								<option value="High School">High School</option>
								<option value="College/University">College/University</option>
								<option value="Community">Community</option>
								<option value="Business">Business</option>
								<option value="Religious Institution">Religious Institution</option>
							</select>
						</div>

						<div className={'form-group ' + this.state.validationState.color}>
							<span className='help-block'> {this.state.helpBlock.color}</span>


							<div className="color_input">
								Select color
								<div className="colorPicker_box">
									<ColorPicker color={'#dd3928'} alpha={100}  ref="color" placement="topRight" trigger={<span className='react-colorpicker-trigger colorBox-square'></span>}
									onChange={this.changeHandler}
						    	/>
						    	</div>
							</div>
							

							

						</div>

						<div className={this.state.validationState.goal}>
							<span className='help-block '>{this.state.helpBlock.goal}</span>
						</div>
						<div className={'goal_field form-group input-group ' + this.state.validationState.goal}>				
							
							<span className="input-group-addon dollar-addon">$</span>
							<input type='number' className='form-control' ref="goal" onChange={AddTeamActions.updateGoal}  placeholder="enter your team's fundraising goal"/>
						</div>
						<div className={'form-group ' + this.state.validationState.about}>
							<span className='help-block'> {this.state.helpBlock.about}</span>
							<textarea className='form-control' ref="about" onChange={AddTeamActions.updateAbout} placeholder="In 340 characters, write a brief description of why YOU are fundraising."></textarea>
						</div>

						<div className="input-padded-spacing">
							<div className={this.state.validationState.username}>
								<span className='help-block '>{this.state.helpBlock.username}</span>
							</div>
							<div className={'input-group form-group url_field ' + this.state.validationState.username}>	
									<span className="input-group-addon " id="basic-addon3">www.rescueteams.org/team/</span>
									<input type='text' className='form-control ' ref="username" onChange={AddTeamActions.updateUsername} placeholder="Custom Url" aria-describedby="basic-addon3"/>
								
							</div>
							<div>
								<span className='help-block under_text '>Custom Url must not contain spaces</span>
								
							</div>

					
						</div>			
						<div className="input-padded-spacing">
							<label className='control-label'>Team Address</label>	
							<div className={'form-group ' + this.state.validationState.address1}>
								<span className='help-block'> {this.state.helpBlock.address1}</span>
								<input type='text' className='form-control' ref="address1" placeholder="Street address" onChange={AddTeamActions.updateAddress1}/>
							</div>
							<div className={'form-group ' + this.state.validationState.address2}>
								<span className='help-block'> {this.state.helpBlock.address2}</span>
								<input type='text' className='form-control' ref="address2" placeholder="Address line 2" onChange={AddTeamActions.updateAddress2}/>
							</div>
							<div className={'form-group ' + this.state.validationState.team_city}>
								<span className='help-block'> {this.state.helpBlock.team_city}</span>
								<input type='text' className='form-control' ref="team_city" placeholder="City" onChange={AddTeamActions.updateCity}/>
							</div>
							<div className={'form-group ' + this.state.validationState.team_state}>
								<span className='help-block'> {this.state.helpBlock.team_state}</span>
								<input type='text' className='form-control' ref="team_state" placeholder="State/Province" onChange={AddTeamActions.updateState}/>
							</div>
							<div className={'form-group ' + this.state.validationState.zipcode}>
								<span className='help-block'> {this.state.helpBlock.zipcode}</span>
								<input type='number' className='form-control' ref="zipcode" placeholder="Postal Code" onChange={AddTeamActions.updateZipcode}/>
							</div>
							<div className={'form-group ' + this.state.validationState.country}>
								<span className='help-block'> {this.state.helpBlock.country}</span>
								<input type='text' className='form-control' ref="country" placeholder="Country" onChange={AddTeamActions.updateCountry}/>
							</div>
						
						</div>		
						
						<p className='text-left'><button type='submit' className='btn btn-large red-btn width_100 btn_color'>Create your new team! <span className="glyphicon glyphicon-chevron-right arrow-right" aria-hidden="true"></span></button></p>

					</form>
					</div>

				</div>
			</div>
		</div>
	</div>
		);
	}
});