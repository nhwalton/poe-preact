import { h, Component } from 'preact';
import { route } from 'preact-router';
import TopAppBar from 'preact-material-components/TopAppBar';
import Drawer from 'preact-material-components/Drawer';
import List from 'preact-material-components/List';
import Dialog from 'preact-material-components/Dialog';
import Switch from 'preact-material-components/Switch';
import 'preact-material-components/Switch/style.css';
import 'preact-material-components/Dialog/style.css';
import 'preact-material-components/Drawer/style.css';
import 'preact-material-components/List/style.css';
import 'preact-material-components/TopAppBar/style.css';
import style from './style';

export default class Header extends Component {
	closeDrawer() {
		this.drawer.MDComponent.open = false;
		this.state = {
			darkThemeEnabled: false
		};
	}

	openDrawer = () => (this.drawer.MDComponent.open = true);

	openSettings = () => this.dialog.MDComponent.show();

	drawerRef = drawer => (this.drawer = drawer);
	dialogRef = dialog => (this.dialog = dialog);

	linkTo = path => () => {
		route(path);
		this.closeDrawer();
	};

	goHome = this.linkTo('/');
	goToMyProfile = this.linkTo('/profile');
	goToPassives = this.linkTo('/passives');
	goToSyndicate = this.linkTo('/syndicate');

	toggleDarkTheme = () => {
		this.setState(
			{
				darkThemeEnabled: !this.state.darkThemeEnabled
			},
			() => {
				if (this.state.darkThemeEnabled) {
					document.body.classList.add('mdc-theme--dark');
				}
				else {
					document.body.classList.remove('mdc-theme--dark');
				}
			}
		);
	}

	render(props) {
		console.log("route",props.selectedRoute);
		return (
			<div class={`${style.header}`}>
				<TopAppBar className="topappbar">
					<TopAppBar.Row>
						<TopAppBar.Section align-start>
							<TopAppBar.Icon menu onClick={this.openDrawer}>
								menu
							</TopAppBar.Icon>
							<TopAppBar.Title>POE Hub</TopAppBar.Title>
						</TopAppBar.Section>
						{/* <TopAppBar.Section align-end shrink-to-fit onClick={this.openSettings}>
							<TopAppBar.Icon>settings</TopAppBar.Icon>
						</TopAppBar.Section> */}
					</TopAppBar.Row>
				</TopAppBar>
				<Drawer modal ref={this.drawerRef}>
					<Drawer.DrawerContent>
						<Drawer.DrawerItem selected={props.selectedRoute === '/'} onClick={this.goHome}>
							<img src="../../assets/Exalted_Orb.png" />
							Home
						</Drawer.DrawerItem>
						<Drawer.DrawerItem selected={props.selectedRoute === '/profile'} onClick={this.goToMyProfile}>
							<img src="../../assets/Chaos_Orb.png" />
							Profile
						</Drawer.DrawerItem>
						<Drawer.DrawerItem selected={props.selectedRoute === '/passives'} onClick={this.goToPassives}>
							<img src="../../assets/Mirror_of_Kalandra.png" />
							Passives
						</Drawer.DrawerItem>
						<Drawer.DrawerItem selected={props.selectedRoute === '/syndicate'} onClick={this.goToSyndicate}>
							{/* <List.ItemGraphic>account_circle</List.ItemGraphic> */}
							<img src="../../assets/Divine_Orb.png" />
							Syndicate
						</Drawer.DrawerItem>
					</Drawer.DrawerContent>
				</Drawer>
				<Dialog ref={this.dialogRef}>
					<Dialog.Header>Settings</Dialog.Header>
					<Dialog.Body>
						<div>
							Enable dark theme <Switch onClick={this.toggleDarkTheme} />
						</div>
					</Dialog.Body>
					<Dialog.Footer>
						<Dialog.FooterButton accept>OK</Dialog.FooterButton>
					</Dialog.Footer>
				</Dialog>
			</div>
		);
	}
}
