/** @format */

import React, { Component } from 'react';
import {
	MDBContainer,
	MDBTabPane,
	MDBTabContent,
	MDBNav,
	MDBNavItem,
	MDBNavLink,
} from 'mdbreact';

class TabsClassic2 extends Component {
	state = {
		activeItemClassicTabs2: '1',
	};

	toggleClassicTabs2 = (tab) => () => {
		if (this.state.activeItemClassicTabs2 !== tab) {
			this.setState({
				activeItemClassicTabs2: tab,
			});
		}
	};

	render() {
		return (
			<MDBContainer>
				<div className="classic-tabs">
					<MDBNav classicTabs color="cyan">
						<MDBNavItem>
							<MDBNavLink
								link
								to="/"
								active={this.state.activeItemClassicTabs2 === '1'}
								onClick={this.toggleClassicTabs2('1')}
							>
								Home
							</MDBNavLink>
						</MDBNavItem>
						<MDBNavItem>
							<MDBNavLink
								link
								to="/signin"
								active={this.state.activeItemClassicTabs2 === '2'}
								onClick={this.toggleClassicTabs2('2')}
							>
								Sign In
							</MDBNavLink>
						</MDBNavItem>
						<MDBNavItem>
							<MDBNavLink
								link
								to="/signup"
								active={this.state.activeItemClassicTabs2 === '3'}
								onClick={this.toggleClassicTabs2('3')}
							>
								Sign Up
							</MDBNavLink>
						</MDBNavItem>
						<MDBNavItem>
							<MDBNavLink
								link
								to="#"
								active={this.state.activeItemClassicTabs2 === '4'}
								onClick={this.toggleClassicTabs2('4')}
							>
								Be Awesome
							</MDBNavLink>
						</MDBNavItem>
					</MDBNav>
					<MDBTabContent
						className="card"
						activeItem={this.state.activeItemClassicTabs1}
					>
						<MDBTabPane tabId="1">
							<p>
								Sed ut perspiciatis unde omnis iste natus error sit voluptatem
								accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
								illo inventore veritatis et quasi architecto beatae vitae dicta sunt
								explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
								odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
								voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum
								quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam
								eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
								voluptatem.
							</p>
						</MDBTabPane>
						<MDBTabPane tabId="2">
							<p>
								Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
								suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis
								autem vel eum iure reprehenderit qui in ea voluptate velit esse quam
								nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
								voluptas nulla pariatur?
							</p>
						</MDBTabPane>
						<MDBTabPane tabId="3">
							<p>
								At vero eos et accusamus et iusto odio dignissimos ducimus qui
								blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
								et quas molestias excepturi sint occaecati cupiditate non provident,
								similique sunt in culpa qui officia deserunt mollitia animi, id est
								laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
								distinctio. Nam libero tempore, cum soluta nobis est eligendi optio
								cumque nihil impedit quo minus id quod maxime placeat facere possimus,
								omnis voluptas assumenda est, omnis dolor repellendus.
							</p>
						</MDBTabPane>
						<MDBTabPane tabId="4">
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
								tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
								veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
								commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
								velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
								occaecat cupidatat non proident, sunt in culpa qui officia deserunt
								mollit anim id est laborum.
							</p>
						</MDBTabPane>
					</MDBTabContent>
				</div>
			</MDBContainer>
		);
	}
}

export default TabsClassic2;
