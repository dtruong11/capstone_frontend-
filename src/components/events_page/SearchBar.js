import React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { classnames } from '../helpers/autocomplete';
import '../../styles/eventPage.css'
import { Input } from 'react-materialize'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { updateForm } from '../../actions/updateForm'


class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      errorMessage: '',
      latitude: null,
      longitude: null,
      isGeocoding: false,
    };
  }

  autocomplete = ({ getInputProps, suggestions, getSuggestionItemProps }) => {

    const inputProps = getInputProps({
      placeholder: 'Search Places...',
      className: 'Demo__search-input',
    })
    
    console.log('HERE?', suggestions, inputProps);


    return (
      <div className="Demo__search-bar-container">
        <div className="Demo__search-input-container">
          <Input
            {...inputProps}
          />
          {this.state.address.length > 0 && <span onClick={this.handleCloseClick}>x</span>}
        </div>
        {this.renderSuggestions(suggestions, getSuggestionItemProps)}
      </div>
    );
  }

  renderSuggestions =  (suggestions, getSuggestionItemProps) => {
    if(suggestions.length > 0) {
      return (
        <div className="Demo__autocomplete-container">
          {suggestions.map(suggestion => {
            const className = classnames('Demo__suggestion-item', {
              'Demo__suggestion-item--active': suggestion.active,
            });

            return (
              /* eslint-disable react/jsx-key */
              <div
                {...getSuggestionItemProps(suggestion, { className })}
              >
                <strong>
                  {suggestion.formattedSuggestion.mainText}
                </strong>{' '}
                <small>
                  {suggestion.formattedSuggestion.secondaryText}
                </small>
              </div>
            );
            /* eslint-enable react/jsx-key */
          })}
          <div className="Demo__dropdown-footer">
            <div>
              {/* <img
                src={require('../images/powered_by_google_default.png')}
                className="Demo__dropdown-footer-image"
              /> */}
            </div>
          </div>
        </div>
      )
    }
  }

    

  handleChange = address => {
    this.setState({
      address,
      latitude: null,
      longitude: null,
      errorMessage: '',
    });
  };

  handleSelect = selected => {
    console.log('selected', selected)
    this.setState({ isGeocoding: true, address: selected });

    geocodeByAddress(selected)
      .then(res => getLatLng(res[0]))
      .then(({ lat, lng }) => {
        console.log('lat', lat, 'lng', lng)
        // Update form state in redux store
        this.props.updateForm('lat', lat)
        this.props.updateForm('long', lng)

        this.setState({
          latitude: lat,
          longitude: lng,
          isGeocoding: false,
        });
      })
      .catch(error => {
        this.setState({ isGeocoding: false });
      });
  };

  handleCloseClick = () => {
    this.setState({
      address: '',
      latitude: null,
      longitude: null,
    });
  };

  handleError = (status, clearSuggestions) => {
    // console.log('Error from Google Maps API', status); // eslint-disable-line no-console
    this.setState({ errorMessage: status }, () => {
      clearSuggestions();
    });
  };

  render() {
    const {
      address,
      errorMessage,
      // isGeocoding,
    } = this.state;

    // console.log('this.state.latitude', latitude, 'this.state.longitude', longitude)
    return (
      <div>
        <PlacesAutocomplete
          onChange={this.handleChange}
          value={address}
          onSelect={this.handleSelect}
          onError={this.handleError}
          shouldFetchSuggestions={address.length > 2}
          highlightFirstSuggestion={true}
        >
          {(this.autocomplete)}
        </PlacesAutocomplete>
        {errorMessage.length > 0 && (
          <div className="Demo__error-message">{this.state.errorMessage}</div>
        )}
      </div>
    );
  }
}
const mapStateToProps = ({ formValues }) => ({ formValues })

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ updateForm }, dispatch)
}



export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

