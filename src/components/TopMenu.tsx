import React from "react"
import { withTranslation, WithTranslation, Trans } from "react-i18next"
import { Button, Modal, Table, Dropdown, Form } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface TopMenuProps extends WithTranslation {
  loggedIn: boolean
}

class TopMenu extends React.Component<TopMenuProps> {
  state = {
    showHelp: false
  }

  handleToggleHelp = () => {
    this.setState({ showHelp: !this.state.showHelp })
  }

  handleLogoutClick = () => {
    window.location.href = `${window.location.href.split('#')[0]}?change_user=true`
  }

  handleDarkModeClick = () => {
    this.setStoredTheme(this.getPreferredTheme() === "dark" ? "light" : "dark")
    this.setTheme(this.getPreferredTheme())
  }

  handleLanguageSwitch = (language: string) => {
    this.props.i18n.changeLanguage(language)
  }

  getStoredTheme = () => localStorage.getItem('theme')
  setStoredTheme = (theme: string) => localStorage.setItem('theme', theme)

  getPreferredTheme = () => {
    const storedTheme = this.getStoredTheme()
    if (storedTheme) {
      return storedTheme
    }

    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  setTheme = (theme: string) => {
    document.documentElement.setAttribute('data-bs-theme', theme)
  }

  componentDidMount() {
    this.setTheme(this.getPreferredTheme())
  }

  render() {
    const helpButton = this.props.loggedIn ? (
      <>
        <Button id="infoButton" type="submit" variant="link" size="lg" onClick={this.handleToggleHelp} title={this.props.i18n.t("top_menu.help")}>
          <FontAwesomeIcon icon={['fas', 'circle-info']} />
        </Button>
        <Modal size="lg" show={this.state.showHelp} onHide={this.handleToggleHelp}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.i18n.t("help.title")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5><FontAwesomeIcon icon={['fas', 'search']} size="sm" className="opacity-25 me-2" />{this.props.i18n.t("help.search_syntax.title")}</h5>
            <Table size="sm" striped bordered>
              <thead>
                <tr>
                  <th>{this.props.i18n.t("help.search_syntax.query")}</th>
                  <th>{this.props.i18n.t("help.search_syntax.behavior")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>public:true</code></td>
                  <td>{this.props.i18n.t("help.search_syntax.public_true")}</td>
                </tr>
                <tr>
                  <td><code>public:false</code></td>
                  <td>{this.props.i18n.t("help.search_syntax.public_true")}</td>
                </tr>
                <tr>
                  <td><code>collaborative:true</code></td>
                  <td>{this.props.i18n.t("help.search_syntax.collaborative_true")}</td>
                </tr>
                <tr>
                  <td><code>collaborative:false</code></td>
                  <td>{this.props.i18n.t("help.search_syntax.collaborative_false")}</td>
                </tr>
                <tr>
                  <td><code>owner:me</code></td>
                  <td>{this.props.i18n.t("help.search_syntax.owner_me")}</td>
                </tr>
                <tr>
                  <td><code>owner:[owner]</code></td>
                  <td><Trans i18nKey="help.search_syntax.owner_owner" components={{ code: <code /> }} /></td>
                </tr>
              </tbody>
            </Table>

            {/* eslint-disable-next-line*/}
            <p><Trans i18nKey="help.search_syntax.more_detail" components={{ a: <a /> }} /></p>
          </Modal.Body>
        </Modal>
      </>
    ) : ''

    const logoutButton = this.props.loggedIn ? <Button id="logoutButton" type="submit" variant="link" size="lg" onClick={this.handleLogoutClick} title={this.props.i18n.t("top_menu.change_user")}>
      <FontAwesomeIcon icon={['fas', 'sign-out-alt']} />
    </Button> : ''

    return (
      <div id="topMenu">
        {helpButton}
        <Button id="darkModeButton" type="submit" variant="link" size="lg" onClick={this.handleDarkModeClick} title={this.props.i18n.t("top_menu.toggle_dark_mode")}>
          <FontAwesomeIcon icon={['fas', 'lightbulb']} />
        </Button>
        <Dropdown id="languageDropdown" title={this.props.i18n.t("top_menu.change_language")}>
          <Dropdown.Toggle variant="link" id="dropdown-basic">
            <FontAwesomeIcon icon={['fas', 'globe']} />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={(event) => this.handleLanguageSwitch("en")}>
              <Form.Check type="radio" name="language"><FontAwesomeIcon icon={['fas', 'check']} className={this.props.i18n.language === "en" ? 'me-1 selected' : 'me-1'} /> English</Form.Check>
            </Dropdown.Item>
            <Dropdown.Item onClick={(event) => this.handleLanguageSwitch("de")}>
              <Form.Check type="radio" name="language"><FontAwesomeIcon icon={['fas', 'check']} className={this.props.i18n.language === "de" ? 'me-1 selected' : 'me-1'} /> Deutsch</Form.Check>
            </Dropdown.Item>
            <Dropdown.Item onClick={(event) => this.handleLanguageSwitch("es")}>
              <Form.Check type="radio" name="language"><FontAwesomeIcon icon={['fas', 'check']} className={this.props.i18n.language === "es" ? 'me-1 selected' : 'me-1'} /> Español</Form.Check>
            </Dropdown.Item>
            <Dropdown.Item onClick={(event) => this.handleLanguageSwitch("fr")}>
              <Form.Check type="radio" name="language"><FontAwesomeIcon icon={['fas', 'check']} className={this.props.i18n.language === "fr" ? 'me-1 selected' : 'me-1'} /> Français</Form.Check>
            </Dropdown.Item>
            <Dropdown.Item onClick={(event) => this.handleLanguageSwitch("it")}>
              <Form.Check type="radio" name="language"><FontAwesomeIcon icon={['fas', 'check']} className={this.props.i18n.language === "it" ? 'me-1 selected' : 'me-1'} /> Italiano</Form.Check>
            </Dropdown.Item>
            <Dropdown.Item onClick={(event) => this.handleLanguageSwitch("nl")}>
              <Form.Check type="radio" name="language"><FontAwesomeIcon icon={['fas', 'check']} className={this.props.i18n.language === "nl" ? 'me-1 selected' : 'me-1'} /> Nederlands</Form.Check>
            </Dropdown.Item>
            <Dropdown.Item onClick={(event) => this.handleLanguageSwitch("pt")}>
              <Form.Check type="radio" name="language"><FontAwesomeIcon icon={['fas', 'check']} className={this.props.i18n.language === "pt" ? 'me-1 selected' : 'me-1'} /> Português</Form.Check>
            </Dropdown.Item>
            <Dropdown.Item onClick={(event) => this.handleLanguageSwitch("sv")}>
              <Form.Check type="radio" name="language"><FontAwesomeIcon icon={['fas', 'check']} className={this.props.i18n.language === "sv" ? 'me-1 selected' : 'me-1'} /> Svenska</Form.Check>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {logoutButton}
      </div>
    )
  }
}

export default withTranslation()(TopMenu)
