import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';
// const summaryUrl = 'https://nepalcorona.info/api/v1/data/world';
// const historyUrl = 'https://data.nepalcorona.info/api/v1/world/history';

// export const getSummary = async () => {
// 	try {
// 		const info = await axios.get(summaryUrl);
// 		const relevantInfo = [];

// 		info.data.forEach(element => {
// 			if (element.country) {
// 				relevantInfo.push({
// 					country: element.country,
// 					totalCases: element.totalCases,
// 					totalRecoveries: element.totalRecovered,
// 					totalDeaths: element.totalDeaths,
// 				});
// 			}
// 		});
// 		return relevantInfo;
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

export const fetchData = async country => {
	let changeableUrl = url;
	if (country) {
		changeableUrl = `${url}/countries/${country}`;
	}
	try {
		const {
			data: { confirmed, recovered, deaths, lastUpdate },
		} = await axios.get(changeableUrl);

		return { confirmed, recovered, deaths, lastUpdate };
	} catch (error) {
		console.log(error);
	}
};

export const fetchDailyData = async () => {
	try {
		const { data } = await axios.get(`${url}/daily`);

		const modifiedData = data.map(dailyData => ({
			confirmed: dailyData.confirmed.total,
			deaths: dailyData.deaths.total,
			date: dailyData.reportDate,
		}));
		return modifiedData;
	} catch (error) {
		console.log(error);
	}
};

export const fetchcountries = async () => {
	try {
		const {
			data: { countries },
		} = await axios.get(`${url}/countries`);

		return countries.map(country => country.name);
	} catch (error) {
		console.log(error);
	}
};
