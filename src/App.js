import React from 'react';

import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData /*, getSummary*/ } from './api';

import coronaImage from './images/img01.png';

class App extends React.Component {
	state = {
		data: {},
		country: '',
		// summary: [],
	};

	async componentDidMount() {
		// const summary = await getSummary();
		// this.setState(summary);
		const fetchedData = await fetchData();
		this.setState({ data: fetchedData });
	}

	handleCountryChange = async country => {
		const fetchedData = await fetchData(country);
		this.setState({ data: fetchedData, country: country });
	};

	render() {
		const { data, country, summary } = this.state;
		return (
			<div className={styles.container}>
				<img className={styles.image} src={coronaImage} alt="Coronavirus" />
				<Cards data={data} />
				<CountryPicker handleCountryChange={this.handleCountryChange} summary={summary} />
				<Chart data={data} country={country} />
			</div>
		);
	}
}

export default App;
