import React, { Component } from 'react'
import { Input } from 'react-materialize'
import SearchBar from './SearchBar'
import SliderRange from './Slider'
import DistanceSliderRange from './DistanceSlider'
import GoogleApi from '../helpers/GoogleApi'
import scriptCache from '../helpers/ScriptCache'
import { Icon } from 'react-icons-kit'
import { angleDown } from 'react-icons-kit/fa/angleDown'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { Form, FormGroup, Label, Input, Button, FormText } from 'reactstrap'

import { updateForm } from '../../actions/updateForm'

const { REACT_APP_API_KEY } = process.env


class FilterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  componentWillMount() {
    this.scriptCache = scriptCache({
      google: GoogleApi({
        apiKey: REACT_APP_API_KEY,
        libraries: ['places']
      })
    });
  }

  componentDidMount() {
    this.scriptCache.google.onLoad((err, tag) => {
      this.setState({ loaded: true })
    })
  }

  handleCheckBox = event => {
    return this.props.updateForm(event.target.name, !JSON.parse(!event.target.checked))
  };

  render() {
    const { sport, art, educational, nature, music, morning, afternoon, evening, cost } = this.props.formValues
    return (
        <form >
          {this.state.loaded &&
            <SearchBar />
          }
          <label><Icon icon={angleDown} /> CATEGORY
            <Input onClick={(event) => { this.handleCheckBox(event) }} name="sport" type="checkbox" checked={sport} label='Sport' />
            <Input onChange={(event) => { this.handleCheckBox(event) }} name="art" type="checkbox" checked={art} label='Arts & Craft' />
            <Input onChange={(event) => { this.handleCheckBox(event) }} name="educational" type="checkbox" checked={educational} label='Educational' />
            <Input onChange={(event) => { this.handleCheckBox(event) }} name="nature" type="checkbox" checked={nature} label='Nature' />
            <Input onChange={(event) => { this.handleCheckBox(event) }} name="music" type="checkbox" checked={music} label='Music' />
          </label>
          {/* <label> TIMES
            <Input onChange={(event) => { this.handleCheckBox(event) }} name="morning" type="checkbox" checked={morning} label='Morning (before 12PM)' />
            <Input onChange={(event) => { this.handleCheckBox(event) }} name="afternoon" type="checkbox" checked={afternoon} label='Afternoon (12PM - 4PM)' />
            <Input onChange={(event) => { this.handleCheckBox(event) }} name="evening" type="checkbox" checked={evening} label='Evening (after 4PM)' />
          </label> */}
          <label> FREE ACTVITIES ONLY
              <Input onChange={(event) => { this.handleCheckBox(event) }} name="cost" type="checkbox" checked={cost} label='All free' />
          </label>
          <label> AGE
              <SliderRange />
          </label>
          <label> DISTANCE
              <DistanceSliderRange />
          </label>
        </form>
        )
      }
    }
    
const mapStateToProps = ({formValues}) => ({formValues})
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({updateForm}, dispatch)
      }
      
      export default connect(mapStateToProps, mapDispatchToProps)(FilterForm)
