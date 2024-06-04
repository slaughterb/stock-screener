
import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './styles.css';

class SectorOverview extends Component {

	constructor(props) {
		super(props);

		this.state = {
			sectorInfo: [],
			error: null
		}

		this.querySectorOverview = this.querySectorOverview.bind(this);
	}

	querySectorOverview = () => {
		fetch('/api/stock/sector-overview', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then(res => res.json()).then((json) => {
			const data = json.sectorInfo[0];
			if (json.success) {
				this.setState({
					sectorInfo: data
				});
			}
			else {
				this.setState({
					error: json.message,
					sectorInfo: []
				})
			}
		}).catch((err) => {
			this.setState({
				error: err,
				sectorInfo: []
			});
		});
	}


	render() {
		return (
			<div className="sectorOverviewContainer">
				<h3>Recent Sector Performance</h3>
				<div className="sectorButtonContainer">
					<button onClick={this.querySectorOverview} className="sectorButton">Get Sector Performance Overview</button>
				</div>
				{this.state.sectorInfo.length !== 0 ? (
					<div className="sectorsTableContainer">
						<table className="sectorsTable">
							<thead>
								<tr>	
									<th>Sector</th>
									<th>Percentage Change</th>
								</tr>
							</thead>
							<tbody>
								{this.state.sectorInfo.map((sectorData, i) => (
									<tr key={uuidv4()}>
										<td>{sectorData.sector}</td>
										<td>{sectorData.changesPercentage}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				) : null}
			</div>
		);
	}
}

export default SectorOverview;