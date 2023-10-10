import React from "react";

interface Data {
	hero_avatar: string;
	hero_name: string;
	hero_role: string;
	hero_specially: string;
}

interface State {
	hero: Data[] | null;
}

export default class App extends React.Component<{ value?: string }, State> {
	constructor(props: { value: "" }) {
		super(props);
		this.state = {
			hero: null,
		};
	}

	componentDidMount() {
		this.fetchData();
	}

	fetchData() {
		fetch("https://api.dazelpro.com/mobile-legends/hero")
			.then((Response) => {
				return Response.json();
			})
			.then((data) => {
				const dataArray = Array.isArray(data.hero) ? data.hero : [data.hero];
				this.setState({ hero: dataArray });
			})
			.catch((error) => {
				alert(`Error fetching: ${error}`);
			});
	}
	render() {
		const { hero } = this.state;
		return (
			<React.Fragment>
				<div>
					{hero &&
						hero.map((heroData, index) => (
							<div key={index}>
								<div className="container">
									<h1>{heroData.hero_name}</h1>
									<h3>{heroData.hero_role}</h3>
									<h3>{heroData.hero_specially}</h3>
								</div>
							</div>
						))}
				</div>
			</React.Fragment>
		);
	}
}
